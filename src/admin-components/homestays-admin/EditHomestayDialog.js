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
                name: props.selectedItem && props.selectedItem.name || '',
                catalog_name: props.selectedItem && props.selectedItem.catalog_name || '',
                price: props.selectedItem && props.selectedItem.price || 0,
                address: props.selectedItem && props.selectedItem.address || '',
                description: props.selectedItem && props.selectedItem.description || '',
                // roomtype: props.selectedItem && props.selectedItem.description || [],
                image_link: props.selectedItem && props.selectedItem.image_link || [],
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
        const { editHomeStay } = this.props;
        const { price , ...rest } = this.state.form;
        editHomeStay({
            ...rest,
            price: parseFloat(price)
        })
    }

    render() {
        const { open, handleToggleDialogEdit, selectedItem } = this.props;
        const { form } = this.state;
        // console.log('selectedItem', selectedItem)
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Add New Homestay</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Catalog Name
                        </DialogContentText>
                        <input value={form.catalog_name} name="catalog_name" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Name
                        </DialogContentText>
                        <input value={form.name} type="text" name="name" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Price
                        </DialogContentText>
                        <input value={form.price} type="number" name="price"  onChange={this.handleChangeInput}/>
                    </div>
                    
                    <div>
                        <DialogContentText>
                            Address
                        </DialogContentText>
                        <input  value={form.address} type="text" name="address" onChange={this.handleChangeInput}  />
                    </div>
                    <div className="full-size">
                        <DialogContentText>
                            Description
                        </DialogContentText>
                        <textarea value={form.description} name="description" onChange={this.handleChangeInput} ></textarea>
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