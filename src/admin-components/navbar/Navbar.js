import React, { Component } from 'react'
import "./Navbar.css"
class Navbar extends Component {

    deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    

    render() {
        return <nav id="admin-nav">
            <img className="admin-avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqi2eeymNAgNrdvwQcDOf-6i3j_KN8eHFqw&usqp=CAU" alt="avatar" />
            <i className="fas fa-sign-out-alt" style={{ cursor: "pointer" }} onClick={() => {
                this.deleteCookie('uid');
                this.deleteCookie('username');
                this.deleteCookie('admin');
                window.location.reload();
            }}></i>
        </nav>
    }
}

export default Navbar;