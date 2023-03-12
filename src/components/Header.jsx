import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const userSvg = <FontAwesomeIcon icon={faUser} className={styles.userSvg} />

const Header = () => {
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isConnectedLs = JSON.parse(localStorage.getItem('isConnected'));
        if (isConnectedLs || !isConnectedLs) {
            setIsConnected(isConnectedLs);
        }
    }, []);

    const clickUser = () => {
        if (isConnected === false) {
            return window.scrollTo({
                top: 1000,
                behavior: 'smooth'
            });
        }

        if (isConnected === true) {
            return navigate('/dashboard')
        }
    };


    return (
        <header className={styles.container}>
            <NavLink to={'/'} className={styles.logo}>
                <img src="./images/Logo.png" alt="logo My Food Planner" />
            </NavLink>
            <div className={styles.userSvg__container} onClick={clickUser}>{userSvg}</div>
        </header>

    )
};

export default Header;