import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import ProfileForm from '../components/ProfileForm';
import { updateProfile } from '../redux/slices/authSlice';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleUpdate = (data: any) => {
    dispatch(updateProfile(data) as any);
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <ProfileForm user={user} onSubmit={handleUpdate} />
    </div>
  );
};

export default ProfilePage;