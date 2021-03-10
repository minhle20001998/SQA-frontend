import axios from 'axios';
import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button";
import Navbar from '../Nav/Navbar';
import loginImage from '../Login/assets/images/login.jpg';
import Footer from '../Footer/Footer';
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom';
import ScrollToTop from "../ScrollToTop/ScrollToTop";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            phone: "",
            address: "",
            status: ""
        }
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePhoneInput = this.handlePhoneInput.bind(this);
        this.handleAddressInput = this.handleAddressInput.bind(this);
    }

    handleEmailInput(e) {
        console.log("email")
        this.setState({
            email: e.target.value
        })
    }

    handleNameInput(e) {
        console.log("name")

        this.setState({
            name: e.target.value
        })
    }

    handlePhoneInput(e) {
        this.setState({
            phone: e.target.value
        })
    }

    handleAddressInput(e) {
        this.setState({
            address: e.target.value
        })
    }

    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        })
    }



    async handleRegisterSubmit(e) {
        console.log("a")
        const { email, name, password, phone, address } = this.state;
        e.preventDefault();
        const userInfo = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: password
        }
        const response = await axios.post('https://sqa-api.herokuapp.com/user', userInfo);
        const data = await response.data;
        console.log(data)
        if (data !== "added!") {
            this.setState({
                status: "Wrong Input !"
            })
        } else if (data === "added!") {
            this.props.history.push('/login');
        }

    }

    render() {
        const { status } = this.state;
        const { logo } = this.props;
        return <div className="register">
            <ScrollToTop/>
            <ScrollUpButton />
            <Navbar logo={logo} />
            <main className="d-flex align-items-center py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-5">
                                <img src={loginImage} alt="login" className="login-card-img" />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <div className="brand-wrapper">
                                        <img src={logo} alt="logo" className="logo" />
                                    </div>
                                    <p className="login-card-description">Sign up your account</p>
                                    <p style={{ color: "red" }}>{status}</p>
                                    <form action="#!" onSubmit={this.handleRegisterSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" onInput={this.handleEmailInput} required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <input type="text" name="name" id="name" className="form-control" placeholder="Name" onInput={this.handleNameInput} required="required" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="password" className="sr-only">Password</label>
                                            <input type="password" name="password" id="password" className="form-control" placeholder="Password" autoComplete="on" onInput={this.handlePasswordInput} required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="sr-only">Phone</label>
                                            <input type="number" name="phone" id="phone" className="form-control" placeholder="Phone" onInput={this.handlePhoneInput} required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address" className="sr-only">Address</label>
                                            <input type="text" name="address" id="address" className="form-control" placeholder="Address" onInput={this.handleAddressInput} required="required" />
                                        </div>
                                        <input type="submit" name="login" id="login" className="btn btn-block login-btn mb-4" value="Register"  />
                                    </form>
                                    <p className="login-card-footer-text">Already have an account ? <a href="/login" className="text-reset"><ins>Login here</ins></a></p>
                                    <nav className="login-card-footer-nav">
                                        <a className="mr-5" href="#!">Terms of use.</a>
                                        <a href="#!">Privacy policy</a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer logo={logo} />
        </div>
    }
}

export default withRouter(Register);