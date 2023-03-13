import React, { useState } from 'react';
import styles from './AddRecipe.module.css';

const AddRecipe = () => {
    const [addIngredients, setAddIngredients] = useState([]);
    const [ingredientValue, setIngredientValue] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleAddIngredient = (e) => {
        e.preventDefault();
        const newIngredient = "newingredient";
        setAddIngredients(oldArray => [...oldArray, newIngredient]);
    };

    const pushIngredient = (e) => {
        e.preventDefault()
        const newIngredient = ingredientValue;
        setIngredients(oldArray => [...oldArray, newIngredient]);
    }

    return (
        <div className={styles.container}>
            <form action="submit" className={styles.form}>
                <input type="text" placeholder='Recipe name' />
                <div className={styles.ingredients__container}>
                    <input type="text" placeholder='Ingredient 1' onChange={(e) => setIngredientValue(e.target.value)} />
                    <button className={styles.validateIngredient} onClick={pushIngredient} >Validate</button>
                </div>
                {addIngredients.map((ingredient, index) => (
                    <div className={styles.ingredients__container} key={index}>
                        <input type="text" placeholder={'ingredient ' + (index + 2)} onChange={(e) => setIngredientValue(e.target.value)} />
                        <button className={styles.validateIngredient} onClick={pushIngredient} >Validate</button>
                    </div>
                ))}
                <button onClick={handleAddIngredient} type='button'>add ingredients +</button>
                <div className={styles.submitBtn}> Submit </div>
            </form>
        </div>
    );
};

export default AddRecipe;