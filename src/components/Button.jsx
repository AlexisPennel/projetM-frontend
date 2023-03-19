import React from 'react';
import styles from './Button.module.css'

const Button = ({ content, fonction, color, type }) => {

    return (
        <>
            {color === 'light' ? <button className={styles.container__light} onClick={fonction} type={type}>{content}</button> :
                <button className={styles.container} onClick={fonction} type={type}>{content}</button>
            }
        </>
    );
};

export default Button;