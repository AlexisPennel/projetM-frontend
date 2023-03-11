import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.container}>
            <img src="./images/Logo.png" alt="logo My Food Planner" />
        </header>

    )
};

export default Header;