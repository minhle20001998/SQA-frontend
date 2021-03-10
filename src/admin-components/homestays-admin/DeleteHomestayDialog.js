import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteHomestayDialog extends Component {

    constructor(props) {
        super(props)
        this.handeDelete = this.handeDelete.bind(this);
    }

    handeDelete() {
        // const { addNewHomeStay } = this.props;
        // addNewHomeStay(this.state.form)
        console.log('Delete')
    }

    render() {
        const { open, handleToggleDialogDelete } = this.props;
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Delete Homestay</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Do you want to delete this homestay?
                        </DialogContentText>
                        <input name="catalog_name" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handeDelete}>Delete</button>
                        <button className="action-btn" id="close-btn" onClick={handleToggleDialogDelete} >Cancel</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default DeleteHomestayDialog;