import React from 'react';
import styles from './RecipesCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const editSvg = <FontAwesomeIcon icon={faPenToSquare} />

const RecipesCard = ({ recipes }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title__container}>
                <h3>{recipes.name}</h3>
                <div className={styles.editSvg}>{editSvg}</div>
            </div>
            <div className={styles.ingredients__container}>
                {recipes.ingredients.map((ingredients, index) => (
                    <p key={index}>{ingredients}</p>
                ))}
            </div>
        </div>
    );
};

export default RecipesCard;