import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const isConnected = false
        localStorage.setItem('isConnected', JSON.stringify(isConnected));
        setTimeout(() => {
            navigate('/')
        }, "200");
    };


    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>

                <h1>Your Dashboard</h1>
                <div className={styles.recipes__container}>
                    <h2>Recipes</h2>
                </div>
                <div>
                    <h2>My plan</h2>
                </div>
                <div>
                    <h2>My shopping list</h2>
                </div>
                <button className={styles.logout__btn} onClick={handleLogout}>Logout</button>
            </div >
        </div >
    );
};

export default Dashboard;