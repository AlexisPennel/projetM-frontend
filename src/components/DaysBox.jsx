import React from 'react';
import styles from './DaysBox.module.css'
import MealBoxBreakfast from './MealBoxBreakfast';
import MealBoxDinner from './MealBoxDinner';
import MealBoxLunch from './MealBoxLunch';

const DaysBox = ({ day, data }) => {
    return (
        <div className={styles.container}>
            <h2>{day}</h2>
            <MealBoxBreakfast data={data} day={day} />
            <MealBoxLunch data={data} day={day} />
            <MealBoxDinner data={data} day={day} />
        </div>
    );
};

export default DaysBox;