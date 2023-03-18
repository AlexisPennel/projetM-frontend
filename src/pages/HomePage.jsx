import Login from "../components/Login";
import SignUp from "../components/SignUp";
import styles from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1 } from '@fortawesome/free-solid-svg-icons'
import { fa2 } from '@fortawesome/free-solid-svg-icons'
import { fa3 } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const number1 = <FontAwesomeIcon icon={fa1} className={styles.numbers} />
const number2 = <FontAwesomeIcon icon={fa2} className={styles.numbers} />
const number3 = <FontAwesomeIcon icon={fa3} className={styles.numbers} />

const HomePage = () => {
    const [displayLogin, setDisplayLogin] = useState(true);
    const [displaySignUp, setDisplaySignUp] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('tokenMFP');


    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [navigate, token])


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
                    <h1>Need an easy way to plan meals weekly?</h1>
                    <div className={styles.container__step}>
                        <div className={styles.number__container}>{number1}</div>
                        <p>Add your favorite recipes</p>
                    </div>
                    <div className={styles.container__step}>
                        <div className={styles.number__container}>{number2}</div>
                        <p>Plan meals for the week</p>
                    </div>
                    <div className={styles.container__step}>
                        <div className={styles.number__container}>{number3}</div>
                        <p>Generate a shopping list in no time</p>
                    </div>
                    <p> Easily plan your weekly meals and get all the ingredients.<br />Start meal planning now !</p>
                    <div className={styles.button__container}>
                        <Button color={'light'} fonction={handleLogin} content={'Login'} />
                        <Button fonction={handleSignUp} content={'Sign up'} />
                    </div>
                </div>
                {displayLogin && <Login />}
                {displaySignUp && <SignUp />}
            </div>

        </>
    )
};

export default HomePage;