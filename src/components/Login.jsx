import React, { useRef, useState } from 'react';
import styles from './LoginSignUp.module.css'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import checkData from '../lib/checkData';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const submitBtnRef = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();


        if (checkData(email, password)) {

            const data = {
                email: email.trim(),
                password: password.trim()
            }

            api.post("/api/auth/login", data)
                .then((res) => {
                    submitBtnRef.current.value = 'Loading ...'
                    localStorage.setItem('token', res.data.token)
                    let isConnected = true;
                    localStorage.setItem('isConnected', JSON.stringify(isConnected));
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, "200");
                })
                .catch((res) => {
                    setIsError(true);
                    setError("Invalid email or password. Password must be 8 characters or more and include at least one uppercase letter, one number, and one special character")
                })

        } else {

            setError('Invalid email or password. Password must be 8 characters or more and include at least one uppercase letter, one number, and one special character');
            setIsError(true);

        }

    }

    return (
        <div className={styles.container} id="loginSignUp">
            <h1>Login</h1>
            <form action="submit" onSubmit={handleSubmit}>
                <label>
                    <input type="email" className={isError ? styles.inputError : null} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </label>
                <label>
                    <input type="password" className={isError ? styles.inputError : null} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </label>
                <input type="submit" value='submit' className={styles.submitBtn} ref={submitBtnRef} />
            </form>
            <p className={styles.error}>{error}</p>
        </div>
    );
};

export default Login;