import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import styles from './Recipes.module.css'

const Recipes = () => {
    const [recipeData, setRecipeData] = useState('');
    const [recipeIngredient, setRecipeIngredients] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        api.get(`/api/recipes/${id}`)
            .then((recipe) => {
                setRecipeData(recipe.data);
                setRecipeIngredients(recipe.data.ingredients)
            })
            .catch((error) => {
                console.log('erreur');
            })
    }, [id])

    console.log(recipeData.ingredients)
    return (
        <div className={styles.container}>
            <div className={styles.recipe__container}>
                <div className={styles.recipeCard__container}>
                    <h1>{recipeData.name}</h1>
                    <div className={styles.ingredients__container}>
                        {recipeIngredient.map((ingredients, index) => (
                            <p key={index}>{ingredients}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.btn__container}>
                    <div className={styles.deleteBtn}> Delete </div>
                    <div className={styles.editBtn} > Edit </div>
                </div>
            </div>
        </div>
    );
};

export default Recipes;
