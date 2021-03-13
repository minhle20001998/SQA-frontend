import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { getUsers, addUser, editUser, deleteUser } from '../../utils/requestAPI/index';
import './Users.css';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { removeVietnameseTones } from "../../components/Functions/removeVietnamese";
import Searchbar from '../search-bar/Searchbar';


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      isOpenDialogAdd: false,
      isOpenDialogDelete: false,
      isOpenDialogEdit: false,
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
    this.getUsersList = this.getUsersList.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.handleToggleDialogAdd = this.handleToggleDialogAdd.bind(this);
    this.handleToggleDialogEdit = this.handleToggleDialogEdit.bind(this);
    this.editUser = this.editUser.bind(this);
    this.handleToggleDialogDelete = this.handleToggleDialogDelete.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
  }

  handleOnInput(e) {
    const { data } = this.state;
    const input = e.target.value;
    const filter = data.filter((user) => {
      if (removeVietnameseTones((user.name).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
        || removeVietnameseTones((user.address).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
        || removeVietnameseTones((user.email).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
        || removeVietnameseTones((user._id).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
        || removeVietnameseTones((user.phone).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()))
      ) {
        return user;
      }
    })
    this.setState({
      rows: filter
    })
  }

  async getUsersList() {
    const homeStayList = await getUsers();
    this.setState({
      rows: homeStayList.data.map((item) => ({
        ...item,
        id: item._id
      })),
      data: homeStayList.data.map((item) => ({
        ...item,
        id: item._id
      })),
    })
  }

  async addNewUser(data) {
    const result = await addUser(data);
    console.log(result);
    this.handleToggleDialogAdd();
    this.getUsersList();
  }

  async editUser(data) {
    const result = await editUser(data);
    this.handleToggleDialogEdit();
    this.getUsersList();
  }

  async deleteUser(data) {
    const result = await deleteUser(data);
    this.handleToggleDialogDelete();
    this.getUsersList();
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

  handleToggleDialogEdit(row) {
    this.setState((currentState) => ({
      isOpenDialogEdit: !currentState.isOpenDialogEdit,
      selectedItem: row ? row : null
    }))
  }

  handleToggleDialogDelete(row) {
    this.setState((currentState) => ({
      isOpenDialogDelete: !currentState.isOpenDialogDelete,
      selectedItem: row ? row : null
    }));
  }


  render() {
    const { columns, rows, isOpenDialogAdd, isOpenDialogEdit, selectedItem, isOpenDialogDelete } = this.state;
    return <div className="admin-booking" style={{ width: '100%' }}>
      {
        isOpenDialogAdd && <AddUserDialog
          open={isOpenDialogAdd}
          addNewUser={this.addNewUser}
          handleToggleDialogAdd={this.handleToggleDialogAdd}
        />
      }
      {/* {
        isOpenDialogEdit && selectedItem && <EditUserDialog
          selectedItem={selectedItem}
          handleToggleDialogEdit={this.handleToggleDialogEdit}
          editUser={this.editUser}
          open={isOpenDialogEdit}
        />
      } */}
      {
        isOpenDialogDelete && selectedItem && <DeleteUserDialog
          selectedItem={selectedItem}
          open={isOpenDialogDelete}
          handleToggleDialogDelete={this.handleToggleDialogDelete}
          deleteUser={this.deleteUser}
        />
      }
      <Sidebar />
      <div className="main-view">
        <Navbar />
        <header>
          <div>
            <h4 className="welcome-header">Hi, Welcome back!</h4>
            <h4>All Users</h4>
          </div>
          <Searchbar placeholder="Search user" handleOnInput={this.handleOnInput} />
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