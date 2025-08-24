import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../redux/slices/authSlice';
import styles from './RegistrationPage.module.css';

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (data: any) => {
    dispatch(register(data) as any).then((result: any) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/login');
      }
    });
  };

  return (
    <div className={styles.container}>
      <AuthForm onSubmit={handleRegister} isRegister={true} />
    </div>
  );
};

export default RegistrationPage;