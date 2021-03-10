import axios from 'axios';
import React, { Component } from 'react'
import Navbar from '../Nav/Navbar'
import Footer from '../Footer/Footer'
import './UserHistory.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columns = [
    { field: "homestay_name", headerName: "Homestay Name", },
    { field: "created", headerName: "Created", },
    { field: "amount", headerName: "Amount", },
    { field: "payment", headerName: "Payment" },
]


class UserHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            rows: null
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async componentDidMount() {
        console.log("history ")
        const uid = this.getCookie('uid');
        const userInfo = {
            user_id: uid,
        }
        const response = await axios.post('https://sqa-api.herokuapp.com/transaction/history', userInfo);
        const data = await response.data;
        console.log(data)
        const rows = [
        ]
        data.map((transaction, index) => {
            rows.push(this.createData(index, transaction.homestay_name, this.timeConverter(transaction.created), transaction.amount, transaction.payment))
        })
        this.setState({
            data: data,
            rows: rows
        })
    }

    timeConverter(time) {
        const date = new Date(time);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("en-US", options);
    }

    createData(id, homestay_name, created, amount, payment) {
        return { id, homestay_name, created, amount, payment };
    }

    render() {
        const message = "No data"
        const { isLogin, logo } = this.props;
        const { data, rows } = this.state;
        return <div className="user-history">
            <Navbar logo={logo} isLogin={isLogin} />
            <header>
                <p>Your Transaction History</p>
            </header>
            <div className="data-table">
                <TableContainer className="user-table" >
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className="table-head">
                                <TableCell align="left">Homestay Name</TableCell>
                                <TableCell align="left">Created</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Payment</TableCell>
                            </TableRow>
                        </TableHead>
                        {rows && rows.length != 0 ?

                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.homestay_name}
                                        </TableCell>
                                        <TableCell align="left">{row.created}</TableCell>
                                        <TableCell align="left">{row.amount}</TableCell>
                                        <TableCell align="left">{row.payment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            : <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {message}
                                    </TableCell>
                                    <TableCell align="left">
                                        {message}
                                    </TableCell>
                                    <TableCell align="left">
                                        {message}
                                    </TableCell>
                                    <TableCell align="left">
                                        {message}
                                    </TableCell>
                                </TableRow>
                            </TableBody>}

                    </Table>
                </TableContainer>
            </div>
            <Footer logo={logo} isLogin={isLogin} />
        </div>
    }
}

export default UserHistory;