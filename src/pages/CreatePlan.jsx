import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import DaysBox from '../components/DaysBox';
import styles from './CreatePlan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from 'react-loader-spinner';

const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowLeft} />

const MyPlan = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingPost, setLoadingPost] = useState(false);
    const errorRef = useRef(null)

    useEffect(() => {
        api.get("/api/recipes")
            .then((recipes) => {
                setRecipes(recipes.data)
                setLoading(false)
            })
    }, [])


    const postData = (data) => {
        setError(false)
        api.post('/api/plans', data)
            .then(() => {
                setError(false);
                setLoadingPost(false)
            })
            .catch((error) => {
                setLoadingPost(false)
                setError('Select all meals before planning. Only one plan can be created');
                setTimeout(() => {
                    errorRef.current.scrollIntoView({ behavior: 'smooth' });
                }, "200")

            })
    }


    const generatePlan = () => {
        setLoadingPost(true)
        try {
            const data = {
                mondayBreakfast: JSON.parse(localStorage.getItem('MondayBreakfast')).id,
                mondayLunch: JSON.parse(localStorage.getItem('MondayLunch')).id,
                mondayDinner: JSON.parse(localStorage.getItem('MondayDinner')).id,
                tuesdayBreakfast: JSON.parse(localStorage.getItem('TuesdayBreakfast')).id,
                tuesdayLunch: JSON.parse(localStorage.getItem('TuesdayLunch')).id,
                tuesdayDinner: JSON.parse(localStorage.getItem('TuesdayDinner')).id,
                wednesdayBreakfast: JSON.parse(localStorage.getItem('WednesdayBreakfast')).id,
                wednesdayLunch: JSON.parse(localStorage.getItem('WednesdayLunch')).id,
                wednesdayDinner: JSON.parse(localStorage.getItem('WednesdayDinner')).id,
                thursdayBreakfast: JSON.parse(localStorage.getItem('ThursdayBreakfast')).id,
                thursdayLunch: JSON.parse(localStorage.getItem('ThursdayLunch')).id,
                thursdayDinner: JSON.parse(localStorage.getItem('ThursdayDinner')).id,
                fridayBreakfast: JSON.parse(localStorage.getItem('FridayBreakfast')).id,
                fridayLunch: JSON.parse(localStorage.getItem('FridayLunch')).id,
                fridayDinner: JSON.parse(localStorage.getItem('FridayDinner')).id,
                saturdayBreakfast: JSON.parse(localStorage.getItem('SaturdayBreakfast')).id,
                saturdayLunch: JSON.parse(localStorage.getItem('SaturdayLunch')).id,
                saturdayDinner: JSON.parse(localStorage.getItem('SaturdayDinner')).id,
                sundayBreakfast: JSON.parse(localStorage.getItem('SundayBreakfast')).id,
                sundayLunch: JSON.parse(localStorage.getItem('SundayLunch')).id,
                sundayDinner: JSON.parse(localStorage.getItem('SundayDinner')).id,
            }
            return postData(data)
        }
        catch (error) {
            return console.log(error)
        }
    };

    return (
        <div className={styles.container}>
            <Link to={'/dashboard'} className={styles.goBack__container}>
                <div>{arrowLeft}</div>
                <p>Go back</p>
            </Link>
            {loading ? <ThreeDots color="#56A12A" /> :
                <section>
                    <h1>Select all your meals and click on 'generate plan'</h1>
                    <DaysBox day={'Monday'} data={recipes} />
                    <DaysBox day={'Tuesday'} data={recipes} />
                    <DaysBox day={'Wednesday'} data={recipes} />
                    <DaysBox day={'Thursday'} data={recipes} />
                    <DaysBox day={'Friday'} data={recipes} />
                    <DaysBox day={'Saturday'} data={recipes} />
                    <DaysBox day={'Sunday'} data={recipes} />
                </section>
            }
            {error === '' ? null : <p ref={errorRef}>{error}</p>}
            {loadingPost && <ThreeDots color="#56A12A" />}
            <button className={styles.button} onClick={generatePlan}>Generate plan</button>
        </div >
    );
};

export default MyPlan;