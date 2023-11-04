import React, {useState} from 'react';
import styles from './listTickets.module.css';
import {useNavigate} from "react-router-dom";

const Confirmation = () => {

    /*NAVIGATE*/

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToTickets = () => {
        navigate('/tickets')
    }

    /*HTML*/


        return (
            <div>
                <div className={styles.row}>
                    <span className={styles.value}>Would normally send email here with body: ...</span>
                </div>
                <div className={styles.row}>
                    <button className={styles.button} onClick={navigateToHome}>Home</button>
                    <button className={styles.button} onClick={navigateToTickets}>Tickets</button>
                </div>
            </div>
        );
    };

Confirmation.propTypes = {};

Confirmation.defaultProps = {};

export default Confirmation;
