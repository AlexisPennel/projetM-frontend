import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import AddRecipe from '../components/AddRecipe';
import styles from './Recipes.module.css'
import { ThreeDots } from 'react-loader-spinner';
import Goback from '../components/Goback';
import Button from '../components/Button';


const Recipes = () => {
    const [recipeData, setRecipeData] = useState(null);
    const [recipeIngredient, setRecipeIngredients] = useState(null);
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

    if (!recipeData || !recipeIngredient) {
        return <ThreeDots color="#56A12A" />
    }

    return (
        <div className={styles.container}>
            <Goback link={'/dashboard'} />
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
                    <div className={styles.btn__box}>
                        <Button color={'light'} content={'Delete'} fonction={handleDelete} />
                    </div>
                    <div className={styles.btn__box}>
                        <Button content={'Edit'} fonction={handleEdit} />
                    </div>
                </div>
                {edit && <AddRecipe action='put' id={id} />}
            </div>
        </div>
    );
};

export default Recipes;
