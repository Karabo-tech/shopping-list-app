import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import styles from './Notification.module.css';

const Notification: React.FC = () => {
  const authError = useSelector((state: RootState) => state.auth.error);
  const listError = useSelector((state: RootState) => state.shoppingList.error);

  return (
    <>
      {authError && <div className={`${styles.notification} ${styles.error}`}>{authError}</div>}
      {listError && <div className={`${styles.notification} ${styles.error}`}>{listError}</div>}
    </>
  );
};

export default Notification;