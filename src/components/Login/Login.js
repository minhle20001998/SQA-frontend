import axios from 'axios';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom'
import ScrollUpButton from "react-scroll-up-button";
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer';
// import logo from './assets/images/logo.svg';
import loginImage from './assets/images/login.jpg';
import './assets/css/login.css';
import ScrollToTop from "../ScrollToTop/ScrollToTop";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            status: ""
        }
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }

    handleEmailInput(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        })
    }

    deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    async handleLoginSubmit(e) {
        const { email, password } = this.state;
        e.preventDefault();
        const userInfo = {
            email: email,
            password: password
        }
        const response = await axios.post('https://sqa-api.herokuapp.com/user/login', userInfo);
        const data = await response.data;
        console.log(data)
        if (data === "false") {
            this.setState({
                status: "Wrong Password !"
            })
        } else if (data === "Not Found!") {
            this.setState({
                status: "Account does not exist !"
            })
        } else {
            this.createCookie("username", `${data.name}`, 100);
            this.createCookie("uid", `${data._id}`, 100);

            this.deleteCookie("admin");

            this.props.setStateLogin(true, () => {
                this.props.history.push('/');
            });
        }
    }

    createCookie(name, value, minutes) {
        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    render() {
        const { status } = this.state;
        const { logo } = this.props;
        return <div className="login">
            <ScrollToTop />
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
                                    <p className="login-card-description">Sign into your account</p>
                                    <p style={{ color: "red" }}>{status}</p>
                                    <form action="#!" onSubmit={this.handleLoginSubmit} >
                                        <div className="form-group">
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" onInput={this.handleEmailInput} />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="password" className="sr-only">Password</label>
                                            <input type="password" name="password" id="password" className="form-control" placeholder="***********" autoComplete="on" onInput={this.handlePasswordInput} />
                                        </div>
                                        <input type="submit" name="login" id="login" className="btn btn-block login-btn mb-4" value="Login" />
                                    </form>
                                    <a href="#!" className="forgot-password-link">Forgot password?</a>
                                    <p className="login-card-footer-text">Don't have an account? <a href="/register" className="text-reset"><ins>Register here</ins></a></p>
                                    <nav className="login-card-footer-nav">
                                        <a href="#!">Terms of use.</a>
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

export default withRouter(Login);