import React, { useState } from 'react';
import styles from './LoginSignUp.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
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

        axios.post("http://localhost:3000/api/auth/signup", data)
            .then(() => {
                navigate('/dashboard')
            })
            .catch((error) => {
                setIsError(true);
                setError("Email or password incorrect. The password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character. ")
            })

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
            <p>{error}</p>
        </div>
    );
};

export default SignUp;