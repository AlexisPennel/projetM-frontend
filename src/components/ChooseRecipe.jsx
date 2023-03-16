import React, { useState } from 'react';
import styles from './ChooseRecipe.module.css'



const ChooseRecipe = ({ recipes }) => {
    const [isSelected, setIsSelected] = useState(false);


    const chooseRecipe = (id, name) => {
        setIsSelected(false)
        const recipeSelected = {
            id: id,
            name: name
        };
        localStorage.setItem('recipeSelected', JSON.stringify(recipeSelected));
        console.log(localStorage)
        setIsSelected(!isSelected)
    }

    return (
        <div className={isSelected ? styles.active : styles.container} onClick={event => chooseRecipe(recipes._id, recipes.name)} >
            <div className={styles.title__container}>
                <h3>{recipes.name}</h3>
            </div>
            <div className={styles.ingredients__container}>
                {recipes.ingredients.map((ingredients, index) => (
                    <p key={index}>{ingredients}</p>
                ))}
            </div>
        </div>
    );

};

export default ChooseRecipe;