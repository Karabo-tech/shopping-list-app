import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData: User, { rejectWithValue }) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const response = await axios.post('http://localhost:3001/users', {
        ...userData,
        password: hashedPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      const user = response.data[0];
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      return rejectWithValue('Invalid credentials');
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: User, { rejectWithValue }) => {
    try {
      const hashedPassword = userData.password
        ? await bcrypt.hash(userData.password, 10)
        : undefined;
      const response = await axios.put(`http://localhost:3001/users/${userData.id}`, {
        ...userData,
        password: hashedPassword || userData.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Profile update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;