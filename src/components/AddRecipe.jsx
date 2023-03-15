import React, { useRef, useState } from 'react';
import styles from './AddRecipe.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import api from '../api';

const editSvg = <FontAwesomeIcon icon={faPenToSquare} />

const AddRecipe = ({ action, id }) => {
    const [ingredients, setIngredients] = useState([]);
    const [recipeName, setRecipeName] = useState('');
    const [saveValidation, setSaveValidation] = useState(false)
    const [saveError, setSaveError] = useState(false);
    const [formatError, setFormatError] = useState(false);
    const inputNameRef = useRef(null)
    const inputIngredientRef = useRef(null)

    const handleReset = () => {
        setIngredients([]);
        setRecipeName('')
    }

    const handleSave = () => {
        if (action === 'put') {
            if (recipeName !== '' && ingredients.length > 0) {
                const data = {
                    name: recipeName,
                    ingredients: ingredients
                }

                api.put(`/api/recipes/${id}`, data)
                    .then(() => {
                        setIngredients([]);
                        setRecipeName('');
                        setFormatError(false);
                        setSaveError(false);
                        setSaveValidation(true);
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        setSaveError(true);
                    })
                return
            }
            setFormatError(true);
        }


        if (recipeName !== '' && ingredients.length > 0) {
            const data = {
                name: recipeName,
                ingredients: ingredients
            }
            api.post('/api/recipes', data)
                .then(() => {
                    setIngredients([]);
                    setRecipeName('');
                    setFormatError(false);
                    setSaveError(false);
                    setSaveValidation(true);
                    window.location.reload(false);
                })
                .catch((error) => {
                    setSaveError(true);
                })
            return
        }

        setFormatError(true);
    }

    const pushName = (e) => {
        e.preventDefault();
        setRecipeName(inputNameRef.current.value)
    }

    const pushIngredient = (e) => {
        e.preventDefault()
        const newIngredient = inputIngredientRef.current.value;
        setIngredients(oldArray => [...oldArray, newIngredient]);
        inputIngredientRef.current.value = '';
    }

    return (
        <div className={styles.container}>
            <h2>Enter the informations and validate to see a preview </h2>
            <form action="submit" className={styles.form}>
                <div className={styles.formIngredients__container}>
                    <input type="text" placeholder='Recipe name' ref={inputNameRef} />
                    <button className={styles.validateIngredient} onClick={pushName} >Validate</button>
                </div>
                <div className={styles.formIngredients__container}>
                    <input type="text" placeholder='Ingredient and validate' ref={inputIngredientRef} />
                    <button className={styles.validateIngredient} onClick={pushIngredient} >Validate</button>
                </div>
                <div className={styles.recipe__container}>
                    <div className={styles.title__container}>
                        <h3>{recipeName}</h3>
                        <div className={styles.editSvg}>{editSvg}</div>
                    </div>
                    <div className={styles.ingredients__container}>
                        {ingredients.map((ingredients, index) => (
                            <p key={index}>{ingredients}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.btn__container}>
                    <div className={styles.resetBtn} onClick={handleReset}> Reset </div>
                    <div className={styles.submitBtn} onClick={handleSave}> Save recipe </div>
                </div>
                {saveValidation && <p>recipe saved</p>}
                {saveError && <p>An Error occured </p>}
                {formatError && <p>To save a recipe, add a name and at least 1 ingredient</p>}
            </form>
        </div>
    );
};

export default AddRecipe;