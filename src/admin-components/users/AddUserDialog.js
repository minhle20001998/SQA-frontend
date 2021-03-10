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
                address: "",
                email: "",
                name: "",
                password: "",
                phone: "",
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
        const { addNewUser } = this.props;
        addNewUser(this.state.form)
    }

    render() {
        const { open, handleToggleDialogAdd } = this.props;
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                        Name
                        </DialogContentText>
                        <input name="name" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                        Password
                        </DialogContentText>
                        <input name="password" type="password" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                        Email
                        </DialogContentText>
                        <input type="email" name="email" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Phone
                        </DialogContentText>
                        <input type="number" name="phone"  onChange={this.handleChangeInput}/>
                    </div>
                    
                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input type="text" name="address" onChange={this.handleChangeInput}  />
                    </div>
                    <br/>
                    {/* <div className="full-size">
                        <DialogContentText>
                            Description
                        </DialogContentText>
                        <textarea name="description" onChange={this.handleChangeInput} ></textarea>
                    </div> */}
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