import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { getUsers, addUser } from '../../utils/requestAPI/index';
import './Users.css';
import AddUserDialog from './AddUserDialog';



class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialogAdd: false,
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
          field: 'name',
          headerName: 'Name',
          width: 200,
        },
        {
          field: 'email',
          headerName: 'Email',
          description: '',
          sortable: false,
          width: 200,

        },
        {
          field: 'address',
          headerName: 'Address',
          description: '',
          sortable: false,
          width: 200,

        },
        {
          field: 'phone',
          headerName: 'Phone',
          description: '',
          sortable: false,
          width: 200,

        },
        {
          field: 'created',
          headerName: 'Created',
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
      rows: [],
      currentData: null
    }
    this.handleEditOnClick = this.handleEditOnClick.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.getUsersList = this.getUsersList.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.handleToggleDialogAdd = this.handleToggleDialogAdd.bind(this);
  }

  async getUsersList() {
    const homeStayList = await getUsers();
    this.setState({
      rows: homeStayList.data.map((item) => ({
        ...item,
        id: item._id
      }))
    })
  }

  componentDidMount() {
    this.getUsersList();
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

  handleToggleDialogAdd() {
    this.setState((currentState) => ({
      isOpenDialogAdd: !currentState.isOpenDialogAdd
    }));
  }

  async addNewUser(data) {
    const result = await addUser(data);
    console.log(result);
    this.handleToggleDialogAdd();
    this.getUsersList();
  }

  render() {
    const { columns, rows, isOpenDialogAdd } = this.state;
    return <div className="admin-booking" style={{ width: '100%' }}>
      {
        isOpenDialogAdd && <AddUserDialog open={isOpenDialogAdd} addNewUser={this.addNewUser} />
      }
      <Sidebar />
      <div className="main-view">
        <Navbar />
        <header>
          <div>
            <h4 className="welcome-header">Hi, Welcome back!</h4>
            <h4>All Users</h4>
          </div>
          <div onClick={this.handleToggleDialogAdd}>
            <i className="fas fa-plus-circle"></i>
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

export default Users;