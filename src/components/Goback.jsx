import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Goback.module.css';

const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowLeft} />

const Goback = ({ link }) => {
    return (

        <Link to={link} className={styles.container}>
            <div>{arrowLeft}</div>
            <p>Go back</p>
        </Link>
    );
};

export default Goback;