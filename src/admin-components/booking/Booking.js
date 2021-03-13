import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Button from '@material-ui/core/Button';
import { getBooking, deleteBooking } from '../../utils/requestAPI/index';
import './Booking.css';
import DeleteBookingDialog from './DeleteBookingDialog';
import { removeVietnameseTones } from "../../components/Functions/removeVietnamese";
import Searchbar from '../search-bar/Searchbar';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            isOpenDialogDelete: false,
            editInfo: {
                id: "",
                catalogName: "",
                price: "",
                name: "",
                address: "",
                description: ""
            },
            columns: [
                {
                    field: 'id',
                    headerName: 'ID',
                    width: 200,
                },
                {
                    field: 'homestay_id',
                    headerName: 'homestay_id',
                    width: 200,
                },
                {
                    field: 'homestay_name',
                    headerName: 'homestay_name',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                {
                    field: 'user_id',
                    headerName: 'user_id',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                {
                    field: 'payment',
                    headerName: 'payment',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                {
                    field: 'amount',
                    headerName: 'amount',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                {
                    field: "Delete",
                    width: 100,
                    sortable: false,
                    renderCell: (params) => {
                        const { row } = params;
                        return (
                            <Button variant="contained" color="secondary" onClick={() => this.handleToggleDialogDelete(row)}>
                                Delete
                            </Button>
                        )
                    }

                },
            ],
            data: [],
            rows: [],
            currentData: null
        }
        this.handleEditOnClick = this.handleEditOnClick.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getBookingList = this.getBookingList.bind(this);
        this.handleToggleDialogDelete = this.handleToggleDialogDelete.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
        this.handleOnInput = this.handleOnInput.bind(this);
    }

    handleOnInput(e) {
        const { data } = this.state;
        const input = e.target.value;
        const filter = data.filter((booking) => {
            if (removeVietnameseTones((booking.homestay_name).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
                || removeVietnameseTones((booking.homestay_id).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
                || removeVietnameseTones((booking.id).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
                || removeVietnameseTones((booking.user_id).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
            ) {
                return booking;
            }
        })
        this.setState({
            rows: filter
        })
    }

    async getBookingList() {
        const homeStayList = await getBooking();
        this.setState({
            rows: homeStayList.data.map((item) => ({
                ...item,
                id: item._id
            })),
            data: homeStayList.data.map((item) => ({ ...item, id: item._id })),
        })

    }

    async deleteBooking(data) {
        const result = await deleteBooking(data);
        this.handleToggleDialogDelete();
        this.getBookingList();
    }

    componentDidMount() {
        this.getBookingList();
    }

    getIndex(id) {
        const { rows } = this.state;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id == id) {
                return i;
            }
        }
    }

    handleEditOnClick(e) {
        console.log(e.target.value)
        this.setState({
            dialogOpen: true,
            currentData: this.getIndex(e.target.value)
        });

    }

    handleEditClose() {
        this.setState({
            dialogOpen: false
        })
    }

    handleToggleDialogDelete(row) {
        this.setState((currentState) => ({
            isOpenDialogDelete: !currentState.isOpenDialogDelete,
            selectedItem: row ? row : null
        }));
    }

    render() {
        const { dialogOpen, columns, rows, currentData, isOpenDialogDelete, selectedItem } = this.state;
        return <div className="admin-booking" style={{ width: '100%' }}>
            {
                isOpenDialogDelete && selectedItem && <DeleteBookingDialog
                    open={isOpenDialogDelete}
                    handleToggleDialogDelete={this.handleToggleDialogDelete}
                    selectedItem={selectedItem}
                    deleteBooking={this.deleteBooking}
                />
            }
            <Sidebar />
            <div className="main-view">
                <Navbar />
                <header>
                    <div>
                        <h4 className="welcome-header">Hi, Welcome back!</h4>
                        <h4>All Booking</h4>
                    </div>
                    <Searchbar placeholder="Search booking" handleOnInput={this.handleOnInput} />
                    <div style={{ width: "37px" }}>
                    </div>
                </header>
                <section id="booking-statistic">
                    <DataGrid className="datagrid" sortingOrder={['desc', 'asc', null]}
                        rows={rows} columns={columns} pageSize={10}
                        autoHeight disableColumnMenu={true}
                        disableColumnSelector={true}
                        disableSelectionOnClick={true}
                        style={{ border: '1px solid black' }} />
                </section>
            </div>
        </div>
    }
}

export default Booking;