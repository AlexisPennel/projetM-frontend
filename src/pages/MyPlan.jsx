/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './MyPlan.module.css'
import api from '../api';
import PlanDay from '../components/PlanDay';

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




    return (
        <div className={styles.page__container}>
            <div className={styles.content}>
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
        </div>
    );
};

export default MyPlan;