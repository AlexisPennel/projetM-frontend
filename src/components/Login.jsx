import React, { useState } from 'react';
import styles from './LoginSignUp.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        axios.post("https://myfoodplanner-api.onrender.com/api/auth/login", data)
            .then(() => {
                console.log("yes !");
                navigate('/dashboard')
            })
            .catch((res) => {
                setIsError(true);
                setError("Email or password incorrect. The password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character. ")
            })
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
                <input type="submit" value='submit' className={styles.submitBtn} />
            </form>
            <p>{error}</p>
        </div>
    );
};

export default Login;