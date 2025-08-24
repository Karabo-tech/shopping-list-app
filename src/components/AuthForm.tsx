//import React, { FormEvent } from 'react';
import React, { type FormEvent } from 'react';
import type { User } from '../types';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  onSubmit: (data: User) => void;
  isRegister: boolean;
}

interface AuthFormState {
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}

class AuthForm extends React.Component<AuthFormProps, AuthFormState> {
  constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
      cellNumber: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<AuthFormState, keyof AuthFormState>);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password, name, surname, cellNumber } = this.state;
    this.props.onSubmit({ email, password, name, surname, cellNumber });
  };

  render() {
    const { isRegister } = this.props;
    const { email, password, name, surname, cellNumber } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            required
            aria-label="Password"
          />
        </div>
        {isRegister && (
          <>
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
          </>
        )}
        <button type="submit" className={styles.submit}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    );
  }
}

export default AuthForm;