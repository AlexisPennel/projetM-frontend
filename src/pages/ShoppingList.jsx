/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from './ShoppingList.module.css'
import { ThreeDots } from 'react-loader-spinner';
import Button from '../components/Button';
import html2pdf from 'html2pdf.js';

const ShoppingList = () => {

    const [planData, setPlanData] = useState(null);
    const [recipesData, setRecipesData] = useState(null);
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [uniqueIngredients, setUniqueIngredients] = useState();


    useEffect(() => {
        const apiCall1 = api.get("/api/recipes");
        const apiCall2 = api.get("/api/plans");

        Promise.all([apiCall1, apiCall2])
            .then(responses => {
                setRecipesData(responses[0].data);
                setPlanData(responses[1].data[0]);

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        console.log('render')
        if (planData && recipesData) {
            console.log(planData)
            console.log(recipesData)
            const mondayB = recipesData.find(element => element._id === planData.mondayBreakfast).ingredients;
            const mondayL = recipesData.find(element => element._id === planData.mondayLunch).ingredients
            const mondayD = recipesData.find(element => element._id === planData.mondayDinner).ingredients
            const tuesdayB = recipesData.find(element => element._id === planData.tuesdayBreakfast).ingredients
            const tuesdayL = recipesData.find(element => element._id === planData.tuesdayLunch).ingredients
            const tuesdayD = recipesData.find(element => element._id === planData.tuesdayDinner).ingredients
            const wednesdayB = recipesData.find(element => element._id === planData.wednesdayBreakfast).ingredients
            const wednesdayL = recipesData.find(element => element._id === planData.wednesdayLunch).ingredients
            const wednesdayD = recipesData.find(element => element._id === planData.wednesdayDinner).ingredients
            const thursdayB = recipesData.find(element => element._id === planData.thursdayBreakfast).ingredients
            const thursdayL = recipesData.find(element => element._id === planData.thursdayLunch).ingredients
            const thursdayD = recipesData.find(element => element._id === planData.thursdayDinner).ingredients
            const fridayB = recipesData.find(element => element._id === planData.fridayBreakfast).ingredients
            const fridayL = recipesData.find(element => element._id === planData.fridayLunch).ingredients
            const fridayD = recipesData.find(element => element._id === planData.fridayDinner).ingredients
            const saturdayB = recipesData.find(element => element._id === planData.saturdayBreakfast).ingredients
            const saturdayL = recipesData.find(element => element._id === planData.saturdayLunch).ingredients
            const saturdayD = recipesData.find(element => element._id === planData.saturdayDinner).ingredients
            const sundayB = recipesData.find(element => element._id === planData.sundayBreakfast).ingredients
            const sundayL = recipesData.find(element => element._id === planData.sundayLunch).ingredients
            const sundayD = recipesData.find(element => element._id === planData.sundayDinner).ingredients

            let firstArray = ingredientsArray.concat(mondayB, mondayL, mondayD, tuesdayB, tuesdayL, tuesdayD, wednesdayB, wednesdayL, wednesdayD, thursdayB, thursdayL, thursdayD, fridayB, fridayL, fridayD, saturdayB, saturdayL, saturdayD, sundayB, sundayL, sundayD)
            console.log(firstArray);
            setIngredientsArray(firstArray.filter((item, index) => firstArray.indexOf(item) === index))
        }
    }, [planData])

    const generatePdf = () => {
        const element = document.getElementById('pdf-content');
        const options = {
            margin: 0.5,
            filename: 'MyShoppingList.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { dpi: 192, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().set(options).from(element).save();
    };

    if (!planData || !recipesData) {
        return <ThreeDots color="#56A12A" />
    }

    return (
        <div className={styles.content}>
            <h1>My Shopping List</h1>
            <div className={styles.list__container} id='pdf-content'>
                {ingredientsArray.map((ingredient, index) => (
                    <div className={styles.ingredients__container}>
                        <input type="checkbox" name="checkbox" />
                        <p key={index}>{ingredient}</p>
                    </div>
                ))}
            </div>
            <div className={styles.btn__container}>
                <Button fonction={generatePdf} content={'Export to PDF'} />
            </div>
        </div >
    );
};

export default ShoppingList;