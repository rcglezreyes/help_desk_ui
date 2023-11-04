import React from 'react';
import styles from './helpDesk.module.css';
import {useNavigate} from "react-router-dom";



function HelpDesk () {

    const navigate = useNavigate()

    const navigateToAddTicket = () => {
        navigate('/add_ticket')
    }

    const navigateToTickets = () => {
        navigate('/tickets')
    }

    return (
        <div>
            <div className={styles.row}>
                <span className={styles.value}>HELP DESK SYSTEM</span>
            </div>
            <div className={styles.row}>
                <button className={styles.button} onClick={navigateToAddTicket}
                >Add Ticket
                </button>
                <button
                    className={styles.asyncButton} onClick={navigateToTickets}
                >List Tickets
                </button>
            </div>
        </div>
    )
};

HelpDesk.propTypes = {};

HelpDesk.defaultProps = {};

export default HelpDesk;
