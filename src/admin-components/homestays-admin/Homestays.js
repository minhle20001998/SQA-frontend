import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './Homestays.css'
import { getHomeStay, addHomeStay } from '../../utils/requestAPI/index';
import AddHomestayDialog from './AddHomestayDialog'



class Homestays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDialogAdd: false,
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
                { field: 'id', headerName: 'Homestay_ID', width: 120 },
                { field: 'catalog_name', headerName: 'Catalog name', width: 130 },
                { field: 'price', headerName: 'Price', width: 100 },
                {
                    field: 'name',
                    headerName: 'Name',
                    width: 150,
                },
                {
                    field: 'address',
                    headerName: 'Address',
                    width: 150,
                },
                {
                    field: 'description',
                    headerName: 'Description',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                // {
                //     field: "Edit",
                //     width: 60,
                //     sortable: false,
                //     renderCell: (params) => (
                //         <button className="table-buttons green-btn" id='edit' value={params.getValue('id')}
                //             onClick={this.handleEditOnClick}>
                //             Edit
                //         </button>
                //     )
                // },
                {
                    field: "Delete",
                    width: 80,
                    sortable: false,
                    renderCell: (params) => (
                        <button className="table-buttons red-btn" id='delete' value={params.getValue('id')}
                            onClick={this.handleToggleDialogDelete}
                        >
                            Delete
                        </button>
                    )
                },
            ],
            rows: [],
            currentData: null
        }
        this.handleToggleDialogAdd = this.handleToggleDialogAdd.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getHomeStaysList = this.getHomeStaysList.bind(this);
        this.addNewHomeStay = this.addNewHomeStay.bind(this);
        this.handleToggleDialogDelete = this.handleToggleDialogDelete.bind(this);
    }

    async getHomeStaysList() {
        const homeStayList = await getHomeStay();
        this.setState({
            rows: homeStayList.data.map((item) => ({ ...item, id: item._id }))
        })
    }

    async addNewHomeStay(data) {
        const result = await addHomeStay(data);
        this.handleToggleDialogAdd();
        this.getHomeStaysList();
    }

    componentDidMount() {
        this.getHomeStaysList();
    }

    getIndex(id) {
        const { rows } = this.state;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id == id) {
                return i;
            }
        }
    }

    handleToggleDialogAdd() {
        this.setState((currentState) => ({
            isOpenDialogAdd: !currentState.isOpenDialogAdd
        }));
    }

    handleToggleDialogDelete() {
        this.setState((currentState) => ({
            isOpenDialogDelete: !currentState.isOpenDialogDelete
        }));
    }

    handleEditClose() {
        this.setState({
            dialogOpen: false
        })
    }
    render() {
        const { dialogOpen, columns, rows, currentData, isOpenDialogAdd, handleToggleDialogDelete } = this.state;
        return <div className="admin-homestays" style={{ width: '100%' }}>
            {
                isOpenDialogAdd && <AddHomestayDialog
                    open={isOpenDialogAdd}
                    handleToggleDialogAdd={this.handleToggleDialogAdd}
                    addNewHomeStay={this.addNewHomeStay}
                    handleToggleDialogDelete={this.handleToggleDialogDelete}
                />
            }
            <Sidebar />
            <div className="main-view">
                <Navbar />
                <header>
                    <div>
                        <h4 className="welcome-header">Hi, Welcome back!</h4>
                        <h4>All Homestays</h4>
                    </div>
                    <div onClick={this.handleToggleDialogAdd}>
                        <i className="fas fa-plus-circle"></i>
                    </div>
                </header>
                <section id="homestays-statistic">
                    <DataGrid
                        className="datagrid"
                        sortingOrder={['desc', 'asc', null]}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                        disableColumnMenu={true}
                        disableColumnSelector={true}
                        disableSelectionOnClick={true}
                        style={{ border: '1px solid black' }}
                    />
                </section>
            </div>
        </div>
    }
}

export default Homestays;