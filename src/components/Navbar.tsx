import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <h1>Shopping List</h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : '')}>
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;