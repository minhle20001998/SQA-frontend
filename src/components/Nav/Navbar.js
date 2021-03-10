import React, { Component } from 'react'
import './Navbar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const links = [{ name: "destination", link: "/destination" },
{ name: "homestay booking", link: "/booking" },
{ name: "image", link: "/image" },
{ name: "journey experiences", link: "/journey" }
]


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
        this.getUserName = this.getUserName.bind(this);
    }

    componentDidMount() {
        this.getUserName();
    }

    getUserName() {
        const { isLogin } = this.props;
        if (isLogin) {
            const userName = this.getCookie("username");
            this.setState({
                username: userName
            })
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    render() {
        const { username } = this.state;
        const { isLogin, logo, current } = this.props;
        return <div className="nav-bar">
            <nav className="client-navbar">
                <Link className="homestay-logo" to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <div className="links">
                    <ul>
                        {links.map(link =>
                            <li key={link.name + "-li"}>
                                <Link className={(link.name === current) ? "underline" : ""} id={(link.name).replace(" ", "-") + "-link"} to={link.link}>{link.name}</Link>
                            </li>)
                        }
                    </ul>
                </div>
                {isLogin ? <div className="user-area">
                    <Link to="/history"><i className="fas fa-history"></i></Link>
                    <abbr title={username} onClick={() => {
                        this.deleteCookie('uid');
                        this.deleteCookie('username');
                        window.location.reload();
                    }}><i className="fas fa-sign-out-alt"></i></abbr>
                </div> : <div className="user-area">
                    <Link to="/login">Login</Link>
                    <span>|</span>
                    <Link to="/register">Register</Link>
                </div>}
            </nav>
        </div>
    }
}

export default Navbar;