import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../redux/slices/authSlice';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data: { email: string; password: string }) => {
    dispatch(login(data) as any).then((result: any) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };

  return (
    <div className={styles.container}>
      <AuthForm onSubmit={handleLogin} isRegister={false} />
    </div>
  );
};

export default LoginPage;