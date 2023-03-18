import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import api from '../api';
import RecipesCard from '../components/RecipesCard';
import AddRecipe from '../components/AddRecipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1 } from '@fortawesome/free-solid-svg-icons'
import { fa2 } from '@fortawesome/free-solid-svg-icons'
import { fa3 } from '@fortawesome/free-solid-svg-icons'
import { ThreeDots } from 'react-loader-spinner';
const number1 = <FontAwesomeIcon icon={fa1} className={styles.numbers} />
const number2 = <FontAwesomeIcon icon={fa2} className={styles.numbers} />
const number3 = <FontAwesomeIcon icon={fa3} className={styles.numbers} />

const Dashboard = () => {
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState([]);
    const [recipeError, setRecipeError] = useState(false);
    const [addRecipeDisplay, setAddRecipeDisplay] = useState(false);
    const [loading, setLoading] = useState(true);

    // variables plats du jour 
    // eslint-disable-next-line no-unused-vars
    const [planData, setPlanData] = useState([{}]);
    const [breakfast, setBreakfast] = useState('');
    const [breakfastName, setBreakfastName] = useState('');
    const [lunch, setLunch] = useState('');
    const [lunchName, setLunchName] = useState('');
    const [dinner, setDinner] = useState('');
    const [dinnerName, setDinnerName] = useState('');

    // Recup jour de la semaine   
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    useEffect(() => {
        api.get("/api/recipes")
            .then((response) => {
                setRecipeError(false)
                setLoading(false)
                console.log(response.data)
                setRecipeData(response.data)
                return
            })
            .catch(error => {
                console.log(error);
            });
        setRecipeError(true)
    }, []);

    useEffect(() => {
        api.get("/api/plans")
            .then((response) => {
                setPlanData(response.data[0])

                if (currentDay === 1) {
                    setBreakfast(response.data[0].mondayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].mondayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].mondayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                if (currentDay === 2) {
                    setBreakfast(response.data[0].tuesdayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].tuesdayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].tuesdayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                if (currentDay === 3) {
                    setBreakfast(response.data[0].wednesdayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].wednesdayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].wednesdayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                if (currentDay === 4) {
                    setBreakfast(response.data[0].thursdayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].thursdayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].thursdayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                if (currentDay === 5) {
                    setBreakfast(response.data[0].fridayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].fridayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].fridayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                if (currentDay === 6) {
                    setBreakfast(response.data[0].saturdayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].saturdayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].saturdayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                if (currentDay === 0) {
                    setBreakfast(response.data[0].sundayBreakfast)
                    setBreakfastName(recipeData.find(element => element._id === breakfast).name)
                    setLunch(response.data[0].sundayLunch)
                    setLunchName(recipeData.find(element => element._id === lunch).name)
                    setDinner(response.data[0].sundayDinner)
                    setDinnerName(recipeData.find(element => element._id === dinner).name)
                }

                setLoading(false)
            })
            .catch(error => {
                return
            });
    }, [breakfast, breakfastName, lunchName, dinnerName, currentDay, dinner, lunch, recipeData]);



    const addRecipe = () => {
        setAddRecipeDisplay(!addRecipeDisplay);
    };

    const seeMyPlan = () => {
        navigate('/plan')
    };

    const createPlan = () => {
        navigate('/plan/createplan')
    };

    const handleLogout = () => {
        localStorage.removeItem('tokenMFP');
        setTimeout(() => {
            navigate('/')
        }, "500");
    };

    return (
        <div className={styles.page__container}>
            <div className={styles.content}>
                <h1>Dashboard</h1>
                <section className={styles.section__container}>
                    <header className={styles.sectionTitle__container}>
                        <div className={styles.number__container}>{number1}</div>
                        <h2> My recipes</h2>
                    </header>
                    <div className={styles.recipesCards__container}>
                        {loading && <ThreeDots color="#56A12A" />}
                        {recipeError ? <p>Recipe not found, add new recipe</p> :
                            recipeData.map((recipes, index) => (
                                <RecipesCard recipes={recipes} key={index} />
                            ))
                        }
                    </div>
                    <button className={styles.buttons} onClick={addRecipe}>Add recipe +</button>
                    {addRecipeDisplay && <AddRecipe />}
                </section>
                <section className={styles.section__container}>
                    <header >
                        <div className={styles.number__container}>{number2}</div>
                        <h2>My plan</h2>
                    </header>
                    <p>Today's meals</p>
                    {loading ? <ThreeDots color="#56A12A" /> :
                        <div className={styles.plan__container}>
                            <div className={styles.planRecipe__container}>
                                <h3>Breakfast</h3>
                                {breakfastName ? <p>{breakfastName}</p> : <ThreeDots color="#56A12A" />}
                            </div>
                            <div className={styles.planRecipe__container}>
                                <h3>Lunch</h3>
                                {lunchName ? <p>{lunchName}</p> : <ThreeDots color="#56A12A" />}
                            </div>
                            <div className={styles.planRecipe__container}>
                                <h3>Dinner</h3>
                                {dinnerName ? <p>{dinnerName}</p> : <ThreeDots color="#56A12A" />}
                            </div>
                        </div>
                    }
                    {breakfastName ? <button className={styles.buttons} onClick={seeMyPlan}>See my plan</button> :
                        <button className={styles.buttons} onClick={createPlan}>Create a plan +</button>
                    }
                </section>
                <section className={styles.section__container}>
                    <header className={styles.sectionTitle__container}>
                        <div className={styles.number__container}>{number3}</div>
                        <h2>My shopping list</h2>
                    </header>
                </section>
                <button className={styles.logout__btn} onClick={handleLogout}>Logout</button>
            </div >
        </div >
    );
};

export default Dashboard;
