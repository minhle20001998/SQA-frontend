import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteUserDialog extends Component {

    constructor(props) {
        super(props)
        this.handeDelete = this.handeDelete.bind(this);
    }

    handeDelete() {
        const { deletePost, selectedItem } = this.props;
        const { _id } = selectedItem;
        deletePost({
            _id: _id
        });
    }

    render() {
        const { open, handleToggleDialogDelete } = this.props;
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Do you want to delete this post?
                        </DialogContentText>
                    </div>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handeDelete}>Delete</button>
                        <button className="action-btn" id="close-btn" onClick={() => handleToggleDialogDelete()} >Cancel</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default DeleteUserDialog;