import React, { useState } from 'react';
import ChooseRecipe from './ChooseRecipe';
import styles from './MealBox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import AddRecipe from '../components/AddRecipe'


const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowLeft} />

const MealBoxLunch = ({ data, day }) => {
    const [popUpDisplay, setPopUpDisplay] = useState(false);
    const [lunchSelected, setLunchSelected] = useState(false);
    const [recipedata, setRecipeData] = useState('');
    const [addRecipeDisplay, setAddRecipeDisplay] = useState(false)

    const showPopUp = () => {
        setPopUpDisplay(true);
        window.scrollTo(0, 0)
    }

    const validateSelect = () => {
        const mealSelected = localStorage.getItem('recipeSelected');
        localStorage.setItem(`${day}Lunch`, mealSelected);
        const Lunch = localStorage.getItem(`${day}Lunch`);
        const LunchId = JSON.parse(Lunch).id;
        setPopUpDisplay(false);
        setLunchSelected(true);
        setRecipeData(data.find(element => element._id === LunchId))
    }

    const addRecipe = () => {
        setAddRecipeDisplay(!addRecipeDisplay);
    };

    const Goback = () => {
        setPopUpDisplay(false);
    }

    return (
        <>
            <div className={styles.container}>
                {lunchSelected === false ?
                    <div className={styles.meal__container} onClick={showPopUp}>
                        <p>Click and select a lunch</p>
                    </div> :
                    <div className={styles.meal__containerActive} onClick={showPopUp}>
                        <h3>{recipedata.name}</h3>
                        <div className={styles.ingredients__container}>
                            {recipedata.ingredients.map((ingredient, index) => (
                                <p key={index}>{ingredient}</p>
                            ))}
                        </div>
                    </div>
                }
            </div>
            {popUpDisplay && <div className={styles.popUp__container}>
                <div className={styles.goBack__container} onClick={Goback}>
                    <div>{arrowLeft}</div>
                    <p>Go back</p>
                </div>
                <div className={styles.popUp__recipes__container}>
                    {data.map((recipes, index) => (
                        <ChooseRecipe key={index} recipes={recipes} />
                    ))};
                </div>
                {addRecipeDisplay && <AddRecipe />}
                <div className={styles.btn__wrapper}>
                    <div className={styles.btn__container}>
                        <Button content={'Add recipe'} fonction={addRecipe} color={'light'} />
                    </div>
                    <div className={styles.btn__container}>
                        <Button content={'Validate'} fonction={validateSelect} />
                    </div>
                </div>
            </div>}
        </>
    );
};

export default MealBoxLunch;