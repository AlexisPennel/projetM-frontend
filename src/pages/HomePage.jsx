import Login from "../components/Login";
import SignUp from "../components/SignUp";
import styles from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1 } from '@fortawesome/free-solid-svg-icons'
import { fa2 } from '@fortawesome/free-solid-svg-icons'
import { fa3 } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const number1 = <FontAwesomeIcon icon={fa1} className={styles.numbers} />
const number2 = <FontAwesomeIcon icon={fa2} className={styles.numbers} />
const number3 = <FontAwesomeIcon icon={fa3} className={styles.numbers} />

const HomePage = () => {
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displaySignUp, setDisplaySignUp] = useState(false);

    const handleLogin = () => {
        setDisplaySignUp(false);
        setDisplayLogin(true);
        setTimeout(() => {
            window.scrollTo({
                top: 1000,
                behavior: 'smooth'
            });
        }, "10")

    };

    const handleSignUp = () => {
        setDisplayLogin(false);
        setDisplaySignUp(true);
        setTimeout(() => {
            window.scrollTo({
                top: 1000,
                behavior: 'smooth'
            });
        }, "10")
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.presentation__container}>
                    <h1>Looking for a simple and efficient way to plan your weekly meals?</h1>
                    <div className={styles.container__step}>
                        <div className={styles.number__container}>{number1}</div>
                        <p>Add your favorite recipes</p>
                    </div>
                    <div className={styles.container__step}>
                        <div className={styles.number__container}>{number2}</div>
                        <p>Select meals for each day of the week</p>
                    </div>
                    <div className={styles.container__step}>
                        <div className={styles.number__container}>{number3}</div>
                        <p>Generate a shopping list in no time</p>
                    </div>
                    <p> With just a few clicks, you can plan your meals for the week and ensure that you have all the ingredients you need<br />So why wait? Start using our meal planning tool today !</p>
                    <div className={styles.button__container}>
                        <button className={styles.button__login} onClick={handleLogin}>Login</button>
                        <button className={styles.button__signUp} onClick={handleSignUp}>SignUp</button>
                    </div>
                </div>
                {displayLogin && <Login />}
                {displaySignUp && <SignUp />}
            </div>

        </>
    )
};

export default HomePage;