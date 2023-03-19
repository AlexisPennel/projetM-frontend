/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './MyPlan.module.css'
import api from '../api';
import PlanDay from '../components/PlanDay';
import Goback from '../components/Goback';
import html2pdf from 'html2pdf.js';
import Button from '../components/Button';

const MyPlan = () => {
    const [planData, setPlanData] = useState([{}])
    const [recipesData, setRecipesData] = useState([]);


    useEffect(() => {
        api.get("/api/plans")
            .then((response) => {
                setPlanData(response.data[0])
            })
    }, [])

    useEffect(() => {
        api.get("/api/recipes")
            .then((response) => {
                setRecipesData(response.data)
            })
    }, [])

    const generatePdf = () => {
        const element = document.getElementById('pdf-content');
        const options = {
            margin: 0.5,
            filename: 'MyPlan.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { dpi: 192, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().set(options).from(element).save();
    };

    return (
        <div className={styles.page__container}>
            <Goback link={'/dashboard'} />
            <div className={styles.content} id='pdf-content'>
                <h1>My plan</h1>
                <section className={styles.daySection}>
                    <PlanDay day={"Monday"} />
                    <PlanDay day={"Tuesday"} />
                    <PlanDay day={"Wednesday"} />
                    <PlanDay day={"Thursday"} />
                    <PlanDay day={"Friday"} />
                    <PlanDay day={"Saturday"} />
                    <PlanDay day={"Sunday"} />
                </section>
            </div>
            <div className={styles.btn__container}>
                <Button content={'Export to pdf'} fonction={generatePdf} />
            </div>
        </div>
    );
};

export default MyPlan;