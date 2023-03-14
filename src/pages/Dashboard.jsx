import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import api from '../api';
import RecipesCard from '../components/RecipesCard';
import AddRecipe from '../components/AddRecipe';

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
        setAddRecipeDisplay(true);
    };


    const handleLogout = () => {
        const isConnected = false
        localStorage.setItem('isConnected', JSON.stringify(isConnected));
        setTimeout(() => {
            navigate('/')
        }, "200");
    };


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Your Dashboard</h1>
                <div className={styles.recipes__container}>
                    <h2>Recipes</h2>
                    <div className={styles.recipesCards__container}>
                        {recipes.map((recipes, index) => (
                            <RecipesCard recipes={recipes} key={index} />
                        ))}
                    </div>
                    <button className={styles.button__addRecipe} onClick={addRecipe}>Add recipe +</button>
                    {addRecipeDisplay && <AddRecipe />}
                </div>
                <div>
                    <h2>My plan</h2>
                </div>
                <div>
                    <h2>My shopping list</h2>
                </div>
                <button className={styles.logout__btn} onClick={handleLogout}>Logout</button>
            </div >
        </div >
    );
};

export default Dashboard;