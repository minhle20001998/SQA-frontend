import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditUserDialog extends Component {
    constructor(props) {
        super(props);
        console.log('props', props)
        this.state = {
            form: {
                name: props.selectedItem && props.selectedItem.name || '',
                email: props.selectedItem && props.selectedItem.email || '',
                address: props.selectedItem && props.selectedItem.address || '',
                password: props.selectedItem && props.selectedItem.password || '',
                phone: props.selectedItem && props.selectedItem.phone || '',
                id: props.selectedItem && props.selectedItem.id || "",
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
        const { editUser } = this.props;
        const { price , ...rest } = this.state.form;
        editUser({
            ...this.state.form,
        })
    }

    render() {
        const { open, handleToggleDialogEdit, selectedItem } = this.props;
        const { form } = this.state;

        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Email
                        </DialogContentText>
                        <input value={form.email} name="email" type="email" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Name
                        </DialogContentText>
                        <input value={form.name} type="text" name="name" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Password
                        </DialogContentText>
                        <input type='password' value={form.password} name="password" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Phone
                        </DialogContentText>
                        <input value={form.phone} type="number" name="phone"  onChange={this.handleChangeInput}/>
                    </div>
                    
                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input  value={form.address} type="text" name="address" onChange={this.handleChangeInput}  />
                    </div>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handleEdit}>Edit</button>
                        <button className="action-btn" id="close-btn" onClick={() => handleToggleDialogEdit()} >Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default EditUserDialog;