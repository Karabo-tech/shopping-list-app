import React, { type FormEvent } from 'react';
import type { User } from '../types';
import styles from './ProfileForm.module.css';

interface ProfileFormProps {
  user: User;
  onSubmit: (data: User) => void;
}

interface ProfileFormState {
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}

class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  constructor(props: ProfileFormProps) {
    super(props);
    this.state = {
      email: props.user.email,
      password: '',
      name: props.user.name,
      surname: props.user.surname,
      cellNumber: props.user.cellNumber,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<ProfileFormState, keyof ProfileFormState>);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password, name, surname, cellNumber } = this.state;
    this.props.onSubmit({
      id: this.props.user.id,
      email,
      password: password || this.props.user.password,
      name,
      surname,
      cellNumber,
    });
  };

  render() {
    const { email, password, name, surname, cellNumber } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <h2>Update Profile</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
            aria-label="Email address"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">New Password (optional)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            aria-label="New password"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
            aria-label="Name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={this.handleChange}
            required
            aria-label="Surname"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cellNumber">Cell Number</label>
          <input
            type="tel"
            id="cellNumber"
            name="cellNumber"
            value={cellNumber}
            onChange={this.handleChange}
            required
            aria-label="Cell number"
          />
        </div>
        <button type="submit" className={styles.submit}>
          Update Profile
        </button>
      </form>
    );
  }
}

export default ProfileForm;