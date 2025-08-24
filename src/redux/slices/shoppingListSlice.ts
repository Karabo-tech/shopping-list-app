import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ShoppingList } from '../../types';

interface ShoppingListState {
  lists: ShoppingList[];
  searchQuery: string;
  sortBy: string;
  error: string | null;
}

const initialState: ShoppingListState = {
  lists: [],
  searchQuery: '',
  sortBy: 'dateAdded',
  error: null,
};

export const fetchLists = createAsyncThunk(
  'shoppingList/fetchLists',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/shoppingLists?userId=${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch lists');
    }
  }
);

export const addList = createAsyncThunk(
  'shoppingList/addList',
  async (list: ShoppingList, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/shoppingLists', {
        ...list,
        dateAdded: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to add list');
    }
  }
);

export const updateList = createAsyncThunk(
  'shoppingList/updateList',
  async (list: ShoppingList, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3001/shoppingLists/${list.id}`, list);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update list');
    }
  }
);

export const deleteList = createAsyncThunk(
  'shoppingList/deleteList',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingLists/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete list');
    }
  }
);

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.error = null;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
        state.error = null;
      })
      .addCase(addList.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex((list) => list.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSortBy } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;