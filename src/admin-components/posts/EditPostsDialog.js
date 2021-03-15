import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditHomestayDialog extends Component {

    constructor(props) {
        super(props);
        console.log('props', props)
        this.state = {
            form: {
                id: props.selectedItem && props.selectedItem._id || '',
                title: props.selectedItem && props.selectedItem.title || '',
                content: props.selectedItem && props.selectedItem.content || '',
                image_link: props.selectedItem && props.selectedItem.image_link || 0,
                address: props.selectedItem && props.selectedItem.address || '',
            }
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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

    handleEdit() {
        const { editPost } = this.props;
        const { form } = this.state;
        editPost({
            id: form.id,
            title: form.title,
            content: form.content,
            image_link: form.image_link,
            address: form.address
        })
    }

    render() {
        const { open, handleToggleDialogEdit, selectedItem } = this.props;
        const { form } = this.state;

        console.log('selectedItem', selectedItem)
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Title
                        </DialogContentText>
                        <input defaultValue={selectedItem.title} name="title" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Content
                        </DialogContentText>
                        <input defaultValue={selectedItem.content} type="text" name="content" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Image Link
                        </DialogContentText>
                        <input defaultValue={selectedItem.image_link} type="text" name="image_link" onChange={this.handleChangeInput} />
                    </div>

                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input defaultValue={selectedItem.address} type="text" name="address" onChange={this.handleChangeInput} />
                    </div>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handleEdit}>Save</button>
                        <button className="action-btn" id="close-btn" onClick={() => handleToggleDialogEdit()} >Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default EditHomestayDialog;