import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import AddRecipe from '../components/AddRecipe';
import styles from './Recipes.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowLeft} />

const Recipes = () => {
    const [recipeData, setRecipeData] = useState('');
    const [recipeIngredient, setRecipeIngredients] = useState([]);
    const [edit, setEdit] = useState(false)
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/api/recipes/${id}`)
            .then((recipe) => {
                setRecipeData(recipe.data);
                setRecipeIngredients(recipe.data.ingredients)
            })
            .catch((error) => {
                console.log('erreur');
            })
    }, [id])

    const handleEdit = () => {
        setEdit(true);
    };

    const handleDelete = () => {
        api.delete(`/api/recipes/${id}`)
            .then(() => {
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={styles.container}>
            <Link to={'/dashboard'} className={styles.goBack__container}>
                <div>{arrowLeft}</div>
                <p>Go back</p>
            </Link>
            <div className={styles.recipe__container}>
                <div className={styles.recipeCard__container}>
                    <h1>{recipeData.name}</h1>
                    <div className={styles.ingredients__container}>
                        {recipeIngredient.map((ingredients, index) => (
                            <p key={index}>{ingredients}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.btn__container}>
                    <div className={styles.deleteBtn} onClick={handleDelete}> Delete </div>
                    <div className={styles.editBtn} onClick={handleEdit}> Edit </div>
                </div>
                {edit && <AddRecipe action='put' id={id} />}
            </div>
        </div>
    );
};

export default Recipes;
