import axios from 'axios';
import React, { Component } from 'react'
import './AdminLogin.css'
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom'

class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            status: ""
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }

    handleUserInput(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        })
    }

    async handleLoginSubmit(e) {
        const { username, password } = this.state;
        e.preventDefault();
        const userInfo = {
            username: username,
            password: password
        }
        const response = await axios.post('https://sqa-api.herokuapp.com/admin/login', userInfo);
        const data = await response.data;
        console.log(data)
        if (data === "false") {
            this.setState({
                status: "Wrong Password !"
            })
        }
        else if (data === "Not Found!") {
            this.setState({
                status: "Account does not exist !"
            })
        } else {
            this.createCookie("username", `${data.username}`, 100);
            this.createCookie("uid", `${data._id}`, 100);
            this.createCookie("admin", 'true', 100);
            this.props.setStateAdminLogin(true, () => {
                this.props.history.push('/admin');
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
        return <div className="admin-login">
            <form action="/action_page.php" method="post" onSubmit={this.handleLoginSubmit}>
                <div className="status">{status}</div>
                <div className="imgcontainer">
                    <img src={logo} alt="Avatar" className="avatar" />
                </div>

                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required onInput={this.handleUserInput} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onInput={this.handlePasswordInput} />

                    <button type="submit">Login</button>

                </div>
            </form>
        </div >
    }
}

export default withRouter(AdminLogin);