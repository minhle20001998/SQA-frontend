import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddHomestayDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: '',
                catalog_name: '',
                price: '',
                address: '',
                description: '',
                roomtype: [],
                image_link: [],
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
        const { addNewHomeStay } = this.props;
        addNewHomeStay(this.state.form)
    }

    render() {
        const { open, handleToggleDialogAdd } = this.props;
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Add New Homestay</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Catalog Name
                        </DialogContentText>
                        <input name="catalog_name" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Name
                        </DialogContentText>
                        <input type="text" name="name" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Price
                        </DialogContentText>
                        <input type="number" name="price"  onChange={this.handleChangeInput}/>
                    </div>
                    
                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input type="text" name="address" onChange={this.handleChangeInput}  />
                    </div>
                    <div className="full-size">
                        <DialogContentText>
                            Description
                        </DialogContentText>
                        <textarea name="description" onChange={this.handleChangeInput} ></textarea>
                    </div>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handeAdd}>Save</button>
                        <button className="action-btn" id="close-btn" onClick={handleToggleDialogAdd} >Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default AddHomestayDialog;