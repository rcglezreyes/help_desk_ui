import {useEffect, useState} from "react";
import axios from "axios";
    function NewTicket({ additionalData }) {

        const [status, setStatus] = useState('');
        const [message, setMessage] = useState('');
        const handleSubmit = (e) => {
            e.preventDefault();
            setStatus('loading');
            setMessage('');

            const finalFormEndpoint = e.target.action;
            const method = e.target.method;
            const data = Array.from(e.target.elements)
                .filter((input) => input.name)
                .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

            if (additionalData) {
                Object.assign(data, additionalData);
            }

            fetch(finalFormEndpoint, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }
                    return response.status;
                })
                .then(() => {
                    setMessage("We'll be in touch soon.");
                    setStatus('success');
                })
                .catch((err) => {
                    setMessage(err.toString());
                    setStatus('error');
                });
        };

        return { handleSubmit, status, message };
    }

    function UpdateTicket(finalUpdateEndpoint, method, row, {additionalData}) {
        if (additionalData) {
            Object.assign(row, additionalData);
        }
            fetch(finalUpdateEndpoint, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(row),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }
                    return response.status;
                })
                .then(() => {
                    console.log("Hello")
                })
                .catch((err) => {
                    console.log(err.toString());
                });
    }

    function GetAllTickets(finalGetAllEndpoint) {

        const [list, setList] = useState(null);

        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await axios.get(finalGetAllEndpoint);
                    setList(response.data);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            }
            fetchData()
        }, []);
        return list;
    }

export {
        NewTicket,
    UpdateTicket,
    GetAllTickets
}