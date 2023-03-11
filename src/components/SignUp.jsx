import React, { useState } from 'react';
import styles from './LoginSignUp.module.css'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import checkData from '../lib/checkData';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkData(email, password)) {

            const data = {
                email: email,
                password: password
            }

            api.post('/api/auth/signup', data)
                .then(() => {
                    navigate('/dashboard')
                })
                .catch((error) => {
                    setIsError(true);
                    setError("Invalid email or password. Password must be 8 characters or more and include at least one uppercase letter, one number, and one special character.")
                })

        }

        setError('Invalid email or password. Password must be 8 characters or more and include at least one uppercase letter, one number, and one special character');
        setIsError(true);
    }

    return (
        <div className={styles.container}>
            <h1>Sign up</h1>
            <form action="submit" onSubmit={handleSubmit}>
                <label>
                    <input type="email" className={isError ? styles.inputError : null} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </label>
                <label>
                    <input type="password" className={isError ? styles.inputError : null} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </label>
                <input type="submit" value='submit' className={styles.submitBtn} />
            </form>
            <p className={styles.error}>{error}</p>
        </div>
    );
};

export default SignUp;