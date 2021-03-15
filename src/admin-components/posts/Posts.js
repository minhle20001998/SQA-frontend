import React, { Component } from 'react'
import { getPosts, putPosts, postPosts, deletePosts } from '../../utils/requestAPI'
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import AddPostsDialog from './AddPostsDialog'
import DeletePostsDialong from './DeletePostsDialog'
import Searchbar from '../search-bar/Searchbar';
import EditPostsDialog from './EditPostsDialog';
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            isOpenDialogAdd: false,
            isOpenDialogDelete: false,
            isOpenDialogEdit: false,
            editInfo: {
                title: "",
                content: "",
                image_link: "",
                address: "",
            },
            columns: [
                {
                    field: 'id',
                    headerName: 'ID',
                    width: 200,
                },
                {
                    field: 'created',
                    headerName: 'Created',
                    width: 200,
                },
                {
                    field: 'title',
                    headerName: 'Title',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                {
                    field: 'content',
                    headerName: 'Content',
                    description: '',
                    sortable: false,
                    width: 200,

                },
                {
                    field: 'image_link',
                    headerName: 'Image link',
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
                    field: "Edit",
                    width: 100,
                    sortable: false,
                    renderCell: (params) => {
                        const { row } = params;
                        return (
                            <Button variant="contained" color="primary" onClick={() => this.handleToggleDialogEdit(row)}>
                                Edit
                            </Button>
                        )
                    }

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
        // this.handleEditOnClick = this.handleEditOnClick.bind(this);
        // this.handleEditClose = this.handleEditClose.bind(this);
        // this.getIndex = this.getIndex.bind(this);
        this.getPostList = this.getPostList.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.handleToggleDialogAdd = this.handleToggleDialogAdd.bind(this);
        this.handleToggleDialogEdit = this.handleToggleDialogEdit.bind(this);
        this.editPost = this.editPost.bind(this);
        this.handleToggleDialogDelete = this.handleToggleDialogDelete.bind(this);
        this.deletePost = this.deletePost.bind(this);
        // this.handleOnInput = this.handleOnInput.bind(this);
    }

    async getPostList() {
        const postLists = await getPosts();
        this.setState({
            rows: postLists.data.map((item) => ({
                ...item,
                id: item._id
            })),
            data: postLists.data.map((item) => ({
                ...item,
                id: item._id
            })),
        })
    }

    handleToggleDialogAdd() {
        this.setState((currentState) => ({
            isOpenDialogAdd: !currentState.isOpenDialogAdd
        }));
    }

    handleToggleDialogDelete(row) {
        this.setState((currentState) => ({
            isOpenDialogDelete: !currentState.isOpenDialogDelete,
            selectedItem: row ? row : null
        }));
    }

    handleToggleDialogEdit(row) {
        this.setState((currentState) => ({
            isOpenDialogEdit: !currentState.isOpenDialogEdit,
            selectedItem: row ? row : null
        }))
    }

    componentDidMount() {
        this.getPostList();
    }

    async addNewPost(data) {
        const result = await postPosts(data);
        console.log(result);
        this.handleToggleDialogAdd();
        this.getPostList();
    }

    async editPost(data) {
        const result = await putPosts(data);
        this.handleToggleDialogEdit();
        this.getPostList();
    }

    async deletePost(data) {
        const result = await deletePosts(data);
        this.handleToggleDialogDelete();
        this.getPostList();
    }

    render() {
        const { columns, rows, isOpenDialogAdd, isOpenDialogEdit, selectedItem, isOpenDialogDelete } = this.state;
        return <div className="admin-booking" style={{ width: '100%' }}>
            {
                isOpenDialogAdd && <AddPostsDialog
                    open={isOpenDialogAdd}
                    addNewPost={this.addNewPost}
                    handleToggleDialogAdd={this.handleToggleDialogAdd}
                />
            }
            {
                isOpenDialogEdit && selectedItem && <EditPostsDialog
                    selectedItem={selectedItem}
                    handleToggleDialogEdit={this.handleToggleDialogEdit}
                    editPost={this.editPost}
                    open={isOpenDialogEdit}
                />
            }
            {
                isOpenDialogDelete && selectedItem && <DeletePostsDialong
                    selectedItem={selectedItem}
                    open={isOpenDialogDelete}
                    handleToggleDialogDelete={this.handleToggleDialogDelete}
                    deletePost={this.deletePost}
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



export default Posts;