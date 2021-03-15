import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'

import "./Slidebar.css"
const source = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqi2eeymNAgNrdvwQcDOf-6i3j_KN8eHFqw&usqp=CAU";

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            currentSelected: ""
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        const username = this.getCookie("username");
        this.setState({
            username: username,
            currentSelected: window.location.pathname
        })
    }

    render() {
        const { currentSelected, username } = this.state;
        return <div className="sidebar">
            <a className="logo-admin">
                <img src={source} alt="logo" />
                <span>HOMESTAYS</span>
            </a>
            <div className="avatar-admin big">
                <img src={source} alt="avatar" />
            </div>
            <div className="admin-info">
                <p className="admin-name">{username}</p>
                <p className="position" style={{ color: "#aeffc1" }}>Manager</p>
            </div>
            <div className="main-components ">
                <p className="header-text"> --main</p>
                <Link className={"home-components" + (currentSelected === "/admin" ? " selected" : "")} to="/admin">
                    <i className="fas fa-home"></i>
                    <p className="title">Home</p>
                </Link>
                <Link className={"bookings-components" + (currentSelected === "/admin/booking" ? " selected" : "")} to="/admin/booking">
                    <i className="fas fa-user-alt"></i>
                    <p className="title">Booking</p>
                </Link>
                <Link className={"homestays-components" + (currentSelected === "/admin/homestays" ? " selected" : "")} to="/admin/homestays">
                    <i className="fas fa-house-user"></i>
                    <p className="title">Homestays</p>
                </Link>
                <Link className={"homestays-components" + (currentSelected === "/admin/users" ? " selected" : "")} to="/admin/users">
                    <i className="fas fa-user-friends"></i>
                    <p className="title">Users</p>
                </Link>
                <Link className={"homestays-components" + (currentSelected === "/admin/posts" ? " selected" : "")} to="/admin/posts">
                    <i className="fas fa-user-friends"></i>
                    <p className="title">Posts</p>
                </Link>
            </div>
        </div>
    }
}

export default Sidebar;