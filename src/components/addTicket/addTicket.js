import React from 'react';
import styles from './addTicket.module.css';
import {useNavigate} from "react-router-dom";
import {NewTicket} from "../../service/serviceTicket";


const AddTicket = (props) => {

        const navigate = useNavigate()

        const navigateToHome = () => {
            navigate('/')
        }

        const FORM_ENDPOINT = "http://localhost:9000/add_ticket"

        const additionalData = {
            status: 'new',
        };

        const {handleSubmit, status, message} = NewTicket({
            additionalData,
        });

        if (status === "success") {
            return (
                <div>
                    <div className={styles.row}>
                        <span className={styles.value}>SUCCESS! WE REACH YOU SOON</span>
                    </div>
                    <div className={styles.row}>
                        <button className={styles.button} onClick={navigateToHome}>Home</button>
                    </div>
                </div>
            );
        }

        if (status === "error") {
            return (
                <>
                    <div className="text-2xl">Something bad happened!</div>
                    <div className="text-md">{message}</div>
                </>
            );
        }

        return (
            <div>
                <form
                    action={FORM_ENDPOINT}
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <div className={styles.row}>
                        <span className={styles.value}>ADD NEW TICKET</span>
                    </div>
                    <div className={styles.row}>
                        <label>Name:
                            <input name="name" type="text" className={styles.textbox} required/>
                        </label>
                    </div>
                    <div className={styles.row}>
                        <label>Email:
                            <input name="email" type="email" className={styles.textbox} required/>
                        </label>
                    </div>
                    <div className={styles.row}>
                        <label>Description:
                            <textarea name="description" className={styles.textbox} required/>
                        </label>
                    </div>
                    <div className={styles.row}>
                        <button className={styles.button} onClick={navigateToHome}>Home
                        </button>
                        <button type="submit" className={styles.button}>Create
                            {props.children}
                        </button>
                    </div>
                </form>
            </div>
        );

}



AddTicket.propTypes = {};

AddTicket.defaultProps = {};

export default AddTicket;
