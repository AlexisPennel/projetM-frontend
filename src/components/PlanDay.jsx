import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from './PlanDay.module.css';


const PlanDay = ({ day }) => {
    const [planData, setPlanData] = useState(null)
    const [recipesData, setRecipesData] = useState(null);
    const [breakfastData, setBreakfastData] = useState(null);
    const [lunchData, setLunchData] = useState(null);
    const [dinnerData, setDinnerData] = useState(null);

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
        if (planData && recipesData) {
            if (day === "Monday") {
                setBreakfastData(recipesData.find(element => element._id === planData.mondayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.mondayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.mondayDinner))
                return
            }

            if (day === "Tuesday") {
                setBreakfastData(recipesData.find(element => element._id === planData.tuesdayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.tuesdayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.tuesdayDinner))
            }

            if (day === "Wednesday") {
                setBreakfastData(recipesData.find(element => element._id === planData.wednesdayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.wednesdayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.wednesdayDinner))
            }

            if (day === "Thursday") {
                setBreakfastData(recipesData.find(element => element._id === planData.thursdayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.thursdayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.thursdayDinner))
            }

            if (day === "Friday") {
                setBreakfastData(recipesData.find(element => element._id === planData.fridayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.fridayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.fridayDinner))
            }

            if (day === "Saturday") {
                setBreakfastData(recipesData.find(element => element._id === planData.saturdayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.saturdayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.saturdayDinner))
            }

            if (day === "Sunday") {
                setBreakfastData(recipesData.find(element => element._id === planData.sundayBreakfast))
                setLunchData(recipesData.find(element => element._id === planData.sundayLunch))
                setDinnerData(recipesData.find(element => element._id === planData.sundayDinner))
            }
        }
    }, [planData])






    if (!planData || !recipesData) {
        return <p>Loading....</p>
    }
    // api.get("/api/recipes")
    //     .then((response) => {
    //         setRecipesData(response.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })

    // api.get("/api/plans")
    //     .then((response) => {
    //         setPlanData(response.data[0])
    //         if (day === "Monday") {
    //             const breakfastFind = recipesData.find(element => element._id === planData.mondayBreakfast)
    //             setBreakfastData(breakfastFind)
    //             setLunchData(recipesData.find(element => element._id === planData.mondayLunch))
    //             setDinnerData(recipesData.find(element => element._id === planData.mondayDinner))
    //         };
    //     })


    // useEffect(() => {
    //     if (recipesData === null && planData === null) {
    //         console.log('no')
    //     } else {
    //         getdata()
    //     }
    // }, [planData])
    // getdata()
    // if (day === 'Monday') {
    //     setBreakfastData(recipesData.find(element => element._id === planData.mondayBreakfast))
    // }







    // useEffect(() => {
    //     if (day === "Monday") {
    //         setBreakfastData(recipesData.find(element => element._id === planData.mondayBreakfast))
    //         setLunchData(recipesData.find(element => element._id === planData.mondayLunch))
    //         // setDinnerData(recipesData.find(element => element._id === planData.mondayDinner))
    //         return
    //     }

    //     // if (day === "Tuesday") {
    //     //     setBreakfastData(recipesData.find(element => element._id === planData.tuesdayBreakfast))
    //     //     setLunchData(recipesData.find(element => element._id === planData.tuesdayLunch))
    //     //     setDinnerData(recipesData.find(element => element._id === planData.tuesdayDinner))
    //     // }

    //     // if (day === "Wednesday") {
    //     //     setBreakfastData(recipesData.find(element => element._id === planData.wednesdayBreakfast))
    //     //     setLunchData(recipesData.find(element => element._id === planData.wednesdayLunch))
    //     //     setDinnerData(recipesData.find(element => element._id === planData.wednesdayDinner))
    //     // }

    //     // if (day === "Thursday") {
    //     //     setBreakfastData(recipesData.find(element => element._id === planData.thursdayBreakfast))
    //     //     setLunchData(recipesData.find(element => element._id === planData.thursdayLunch))
    //     //     setDinnerData(recipesData.find(element => element._id === planData.thursdayDinner))
    //     // }

    //     // if (day === "Friday") {
    //     //     setBreakfastData(recipesData.find(element => element._id === planData.fridayBreakfast))
    //     //     setLunchData(recipesData.find(element => element._id === planData.fridayLunch))
    //     //     setDinnerData(recipesData.find(element => element._id === planData.fridayDinner))
    //     // }

    //     // if (day === "Saturday") {
    //     //     setBreakfastData(recipesData.find(element => element._id === planData.saturdayBreakfast))
    //     //     setLunchData(recipesData.find(element => element._id === planData.saturdayLunch))
    //     //     setDinnerData(recipesData.find(element => element._id === planData.saturdayDinner))
    //     // }

    //     // if (day === "Sunday") {
    //     //     setBreakfastData(recipesData.find(element => element._id === planData.sundayBreakfast))
    //     //     setLunchData(recipesData.find(element => element._id === planData.sundayLunch))
    //     //     setDinnerData(recipesData.find(element => element._id === planData.sundayDinner))
    //     // }


    // }, [])
    // console.log(breakfastData)
    // console.log(lunchData)

    return (
        <div className={styles.container}>
            <h2>{day}</h2>
            <div className={styles.recipes__container}>
                <div className={styles.recipes}>
                    <h3>Breakfast</h3>
                    {breakfastData === null ? <p>Loading ...</p> : <h4>{breakfastData.name}</h4>}
                    {breakfastData &&
                        <div className={styles.recipes__ingredients}>
                            {breakfastData.ingredients.map((ingredients, index) => (
                                <p key={index}>{ingredients}</p>
                            ))}
                        </div>}
                </div>
                <div className={styles.recipes}>
                    <h3>Lunch</h3>
                    {lunchData === null ? <p>Loading ...</p> : <h4>{lunchData.name}</h4>}
                    {lunchData &&
                        <div className={styles.recipes__ingredients}>
                            {lunchData.ingredients.map((ingredients, index) => (
                                <p key={index}>{ingredients}</p>
                            ))}
                        </div>}
                </div>
                <div className={styles.recipes}>
                    <h3>Dinner</h3>
                    {dinnerData && <h4>{dinnerData.name}</h4>}
                    {dinnerData && <div className={styles.recipes__ingredients}>
                        {dinnerData.ingredients.map((ingredients, index) => (
                            <p key={index}>{ingredients}</p>
                        ))}
                    </div>}

                </div>

            </div>
        </div>
    );
};

export default PlanDay;