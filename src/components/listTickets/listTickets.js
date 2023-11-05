import React, {useState} from 'react';
import styles from './listTickets.module.css';
import {useNavigate} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {GetAllTickets, UpdateTicket} from "../../service/serviceTicket";
import Select from 'react-select'
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function createData(
    uuid: string,
    name: string,
    email: string,
    description: string,
    status: string,
    response: string,
) {
    return { uuid, name, email, description, status, response };
}

/*WORKING WITH SELECT*/

const options = [
    { value: 'new', label: 'new' },
    { value: 'in progress', label: 'in progress' },
    { value: 'resolved', label: 'resolved' }
]

const additionalData = {
    isUpdateResponse: false,
};

const ListTickets = () => {

    /*NAVIGATE*/

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    /*FETCH DATA FROM TABLE*/

    const LIST_ENDPOINT = process.env.REACT_APP_LIST_ENDPOINT;

    const handleGetAll = GetAllTickets(LIST_ENDPOINT);

    const rows = [];

    if (handleGetAll) {

        handleGetAll.map((element) => (
            rows.push(
                createData(
                    element.uuid,
                    element.name,
                    element.email,
                    element.description,
                    element.status,
                    element.response
                )
            )
        ));
    }

    /*HTML*/

    return (
        <div>
            <div className={styles.row}>
                <span className={styles.value}>TICKETS</span>
            </div>
            <div align ='center'>
                <TableContainer component={Paper} style={{width: '80%'}} >
                    <Table sx={{ minWidth: 300 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell align="right"><b>Status</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br/>
            <div className={styles.row}>
                <button className={styles.button} onClick={navigateToHome}>Home</button>
            </div>
        </div>
)};

/*ROWS COLLAPSE*/
function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const UPDATE_ENDPOINT = process.env.REACT_APP_UPDATE_ENDPOINT;
    const navigate = useNavigate()

    const navigateToConfirmation = () => {
        navigate('/confirmation')
    }

    /*CHANGE SELECT*/
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        row.status = selectedOption.value
        UpdateTicket(UPDATE_ENDPOINT, 'POST', row, {additionalData});

    };

    /*UPDATE RESPONSE*/
    const handleUpdate = () => {
        additionalData.isUpdateResponse = true;
        row.response = document.getElementById('newResponse').value;
        const res = UpdateTicket(UPDATE_ENDPOINT, 'POST', row, {additionalData});
        if (res === 200) {
            navigateToConfirmation()
        }
    }

    /*HTML ROW COLLAPSE*/
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                    <Select
                        options={options}
                        defaultValue = {
                            options.filter(option =>
                                option.value === row.status)
                        }
                        onChange={handleChange}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Response
                            </Typography>
                            <textarea
                                defaultValue={row.response}
                                className={styles.textbox}
                                name='newResponse'
                                id='newResponse'
                            />
                            <br/>
                            <button type="submit" className={styles.button} onClick={handleUpdate}>Send</button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

ListTickets.propTypes = {};

ListTickets.defaultProps = {};

export default ListTickets;
