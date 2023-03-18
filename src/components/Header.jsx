import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png'


const userSvg = <FontAwesomeIcon icon={faUser} className={styles.userSvg} />

const Header = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('tokenMFP');

    const clickUser = () => {
        if (token === null) {
            return window.scrollTo({
                top: 1000,
                behavior: 'smooth'
            });
        }

        if (token) {
            return navigate('/dashboard')
        }
    };



    return (
        <header className={styles.container}>
            <NavLink to={'/'} className={styles.logo}>
                <img src={logo} alt="logo My Food Planner" />
            </NavLink>
            <div className={styles.userSvg__container} onClick={clickUser}>{userSvg}</div>
        </header>

    )
};

export default Header;