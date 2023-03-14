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

const number1 = <FontAwesomeIcon icon={fa1} className={styles.numbers} />
const number2 = <FontAwesomeIcon icon={fa2} className={styles.numbers} />
const number3 = <FontAwesomeIcon icon={fa3} className={styles.numbers} />

const Dashboard = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [addRecipeDisplay, setAddRecipeDisplay] = useState(false);


    useEffect(() => {
        api.get("/api/recipes")
            .then((recipes) => {
                setRecipes(recipes.data)
            })
    }, [])

    const addRecipe = () => {
        setAddRecipeDisplay(!addRecipeDisplay);
    };

    const createPlan = () => {
        navigate('/plan')
    };


    const handleLogout = () => {
        const isConnected = false
        localStorage.setItem('isConnected', JSON.stringify(isConnected));
        setTimeout(() => {
            navigate('/')
        }, "200");
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
                        {recipes.map((recipes, index) => (
                            <RecipesCard recipes={recipes} key={index} />
                        ))}
                    </div>
                    <button className={styles.buttons} onClick={addRecipe}>Add recipe +</button>
                    {addRecipeDisplay && <AddRecipe />}
                </section>
                <section className={styles.section__container}>
                    <header >
                        <div className={styles.number__container}>{number2}</div>
                        <h2>My plan</h2>
                    </header>
                    <button className={styles.buttons} onClick={createPlan}>Create a plan +</button>
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