import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import api from '../api';
import RecipesCard from '../components/RecipesCard';
import AddRecipe from '../components/AddRecipe';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../components/Button';


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
                setRecipeError(true)
            });
    }, []);

    useEffect(() => {
        api.get("/api/plans")
            .then((response) => {
                setPlanData(response.data[0])
                localStorage.setItem('planId', response.data[0]._id)
                console.log(localStorage)
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
                setBreakfastName('No plan yet');
                setLunchName("No plan yet");
                setDinnerName('No plan yet');
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

    const deleteAndCreate = () => {
        if (window.confirm("Are you sure to delete your plan ?")) {
            const id = localStorage.getItem('planId');
            api.delete(`api/plans/${id}`)
                .then((response) => {
                    navigate('/plan/createplan')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            return console.log('cancel')
        }
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
                        <h2> My recipes</h2>
                    </header>
                    <div className={styles.recipesCards__container}>
                        {loading && <ThreeDots color="#7B888E" />}
                        {recipeError ? <p>Recipe not found, add new recipe</p> :
                            recipeData.map((recipes, index) => (
                                <RecipesCard recipes={recipes} key={index} />
                            ))
                        }
                    </div>
                    <div className={styles.btn__container}>
                        <Button content={'Add recipe +'} fonction={addRecipe} />
                    </div>
                    {addRecipeDisplay && <AddRecipe />}
                </section>
                <section className={styles.section__container}>
                    <header >
                        <h2>My plan</h2>
                    </header>
                    <p>Today's meals</p>
                    {loading ? <ThreeDots color="#7B888E" /> :
                        <div className={styles.plan__container}>
                            <div className={styles.planRecipe__container}>
                                <h3>Breakfast</h3>
                                {breakfastName ? <p>{breakfastName}</p> : <ThreeDots color="#7B888E" />}
                            </div>
                            <div className={styles.planRecipe__container}>
                                <h3>Lunch</h3>
                                {lunchName ? <p>{lunchName}</p> : <ThreeDots color="#7B888E" />}
                            </div>
                            <div className={styles.planRecipe__container}>
                                <h3>Dinner</h3>
                                {dinnerName ? <p>{dinnerName}</p> : <ThreeDots color="#7B888E" />}
                            </div>
                        </div>
                    }
                    {breakfastName === 'No plan yet' ?
                        <div className={styles.btn__container}>
                            <Button content={'Create a plan +'} fonction={createPlan} />
                        </div>
                        : <div className={styles.btn__wrapper}>
                            <div className={styles.btn__container}>
                                <Button content={'Delete and create'} fonction={deleteAndCreate} color={'light'} />
                            </div>
                            <div className={styles.btn__container}>
                                <Button content={'See my plan'} fonction={seeMyPlan} />
                            </div>
                        </div>

                    }

                </section>
                <section className={styles.section__container}>
                    <header className={styles.sectionTitle__container}>
                        <h2>My shopping list</h2>
                    </header>
                </section>
                <div className={styles.btn__container__logout}>

                    <Button content={'Logout'} fonction={handleLogout} color={'light'} />
                </div>
            </div >
        </div >
    );
};

export default Dashboard;
