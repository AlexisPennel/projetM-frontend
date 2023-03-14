import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import DaysBox from '../components/DaysBox';
import styles from './MyPlan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowLeft} />

const MyPlan = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        api.get("/api/recipes")
            .then((recipes) => {
                setRecipes(recipes.data)
            })
    }, [])


    return (
        <div className={styles.container}>
            <Link to={'/dashboard'} className={styles.goBack__container}>
                <div>{arrowLeft}</div>
                <p>Go back</p>
            </Link>
            <section>
                <h1>Click and select your meal</h1>
                <DaysBox day={'Monday'} data={recipes} />
                <DaysBox day={'Tuesday'} data={recipes} />
                <DaysBox day={'Wednesday'} data={recipes} />
                <DaysBox day={'Thursday'} data={recipes} />
                <DaysBox day={'Friday'} data={recipes} />
                <DaysBox day={'Saturday'} data={recipes} />
                <DaysBox day={'Sunday'} data={recipes} />
            </section>
        </div>
    );
};

export default MyPlan;