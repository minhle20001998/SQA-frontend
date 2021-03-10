import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { getBooking } from '../../utils/requestAPI/index';
import './Booking.css'



class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
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
                    width: 80,
                    sortable: false,
                    renderCell: (params) => (
                        <button className="table-buttons red-btn" id='delete' value={params.getValue('id')}
                            onClick={this.handleEditOnClick}
                        >
                            Delete
                        </button>
                    )
                },


            ],
            rows: [
                // { id: 1, catalogName: 'Snow', price: 4000, name: 'Jon', address: 'Hanoi', description: "description goes here" },
                // { id: 2, catalogName: 'Lannister', price: 4000, name: 'Cersei', address: 'Hanoi', description: "description goes here" },
                // { id: 3, catalogName: 'Lannister', price: 4000, name: 'Jaime', address: 'Hanoi', description: "description goes here" },
                // { id: 4, catalogName: 'Stark', price: 4000, name: 'Arya', address: 'Hanoi', description: "description goes here" },
                // { id: 5, catalogName: 'Targaryen', price: 4000, name: 'Daenerys', address: 'Hanoi', description: "description goes here" },
                // { id: 6, catalogName: 'Melisandre', price: 4000, name: 'Daenerys', address: 'Hanoi', description: "description goes here" },
                // { id: 7, catalogName: 'Clifford', price: 4000, name: 'Ferrara', address: 'Hanoi', description: "description goes here" },
                // { id: 8, catalogName: 'Frances', price: 4000, name: 'Rossini', address: 'Hanoi', description: "description goes here" },
                // { id: 9, catalogName: 'Roxie', price: 4000, name: 'Harvey', address: 'Hanoi', description: "description goes here" },
            ],
            currentData: null
        }
        this.handleEditOnClick = this.handleEditOnClick.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getBookingList = this.getBookingList.bind(this);
    }

    async getBookingList() {
        const homeStayList = await getBooking();
        this.setState({
            rows: homeStayList.data.map((item) => ({
                ...item,
                id: item._id
            }))
        })
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
    render() {
        const { dialogOpen, columns, rows, currentData } = this.state;
        return <div className="admin-booking" style={{ width: '100%' }}>
            <Dialog open={dialogOpen} onClose={this.handleEditClose} >
                <DialogTitle id="form-dialog-title">Edit Booking</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Homestay_ID
                    </DialogContentText>
                        <input type="text" defaultValue={rows[currentData] ? rows[currentData].id : ""} />
                    </div>
                    <div>
                        <DialogContentText>
                            Catalog Name
                        </DialogContentText>
                        <input type="text" />
                    </div>
                    <div>
                        <DialogContentText>
                            Price
                        </DialogContentText>
                        <input type="number" defaultValue={rows[currentData] ? rows[currentData].price : ""} />
                    </div>
                    <div>
                        <DialogContentText>
                            Name
                        </DialogContentText>
                        <input type="text" defaultValue={rows[currentData] ? rows[currentData].name : ""} />
                    </div>
                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input type="text" defaultValue={rows[currentData] ? rows[currentData].address : ""} />
                    </div>
                    <div className="full-size">
                        <DialogContentText>
                            Description
                        </DialogContentText>
                        <textarea defaultValue={rows[currentData] ? rows[currentData].description : ""}></textarea>
                    </div>
                    <DialogActions>
                        <button className="action-btn" id="save-btn">Save</button>
                        <button className="action-btn" id="close-btn" onClick={this.handleEditClose}>Close</button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
            <Sidebar />
            <div className="main-view">
                <Navbar />
                <header>
                    <div>
                        <h4 className="welcome-header">Hi, Welcome back!</h4>
                        <h4>All Booking</h4>
                    </div>
                    {/* <div>
                        <i className="fas fa-plus-circle"></i>
                    </div> */}
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