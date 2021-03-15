import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class AddUserDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                title: "",
                content: "",
                address: "",
                image_link: "",
            }
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handeAdd = this.handeAdd.bind(this);
    }


    handleChangeInput(e) {
        const { name, value } = e.target;
        this.setState((currentState) => ({
            form: {
                ...currentState.form,
                [name]: value
            }
        }))
    }

    handeAdd() {
        const { addNewPost } = this.props;
        addNewPost(this.state.form)
    }

    render() {
        const { open, handleToggleDialogAdd } = this.props;
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Title
                        </DialogContentText>
                        <input name="title" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Content
                        </DialogContentText>
                        <input name="content" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Image Link
                        </DialogContentText>
                        <input type="text" name="image_link" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input type="text" name="address" onChange={this.handleChangeInput} />
                    </div>
                    <br />
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handeAdd}>Save</button>
                        <button className="action-btn" id="close-btn" onClick={handleToggleDialogAdd} >Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default AddUserDialog;