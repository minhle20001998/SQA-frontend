import React, { Component } from 'react'
import Homepage from './components/Homepage/Homepage'
import Login from './components/Login/Login'
import AdminHomepage from './admin-components/Homepage/Homepage'
import AdminBooking from './admin-components/booking/Booking'
import HomestayBooking from './components/HomestayBooking/HomestayBooking'
import Homestays from './admin-components/homestays-admin/Homestays'
import ProtectedRoute from './components/ProtectedRoute'
import UnAuthenRoute from './components/UnAuthenRoute'
import HomestayDetail from './components/HomestayDetail/HomestayDetail'
import Journey from './components/Journey/Journey'
import Destination from './components/Destination/Destination'
import Image from './components/Image/Image'
import logo from './images/logo.png'
import Register from './components/Register/Register'
import UserHistory from './components/UserHistory/UserHistory'
import ProtectedAdminRoute from './admin-components/ProtectedAdminRoute'
import AdminLogin from './admin-components/login/AdminLogin'
import './Homestay.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Users from './admin-components/users/Users';


class Homestay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginAdmin: false,
            isLogin: false,
            uid: "",
            completed: false
        }
        this.setStateLogin = this.setStateLogin.bind(this);
        this.setStateAdminLogin = this.setStateAdminLogin.bind(this);
    }

    setStateLogin(data, callback) {
        this.setState({
            isLogin: data
        }, callback)
    }

    setStateAdminLogin(data, callback) {
        this.setState({
            isLoginAdmin: data
        }, callback)
    }

    componentDidMount() {
        const userid = this.getCookie("uid");
        const username = this.getCookie("username");
        const admin = this.getCookie("admin");

        if (userid && admin !== "true") {
            this.setState({
                uid: userid,
                isLogin: true,
                completed: true,
            })
        } else if (!userid && admin !== "true") {
            console.log("login false")
            this.setState({
                isLogin: false,
                completed: true,
            })
        }

        if (userid && admin == "true") {
            this.setState({
                uid: userid,
                isLoginAdmin: true,
                completed: true,
            })
        } else if (!userid && admin == "true") {
            this.setState({
                isLoginAdmin: false,
                completed: true,
            })
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    render() {
        const { isLogin, isLoginAdmin, completed } = this.state;
        return <div className="homestay" >
            <Router>
                <Switch>
                    <Route isLogin={isLogin} exact path="/booking">
                        <HomestayBooking logo={logo} isLogin={isLogin} />
                    </Route>
                    <Route isLogin={isLogin} exact path="/">
                        <Homepage logo={logo} isLogin={isLogin} />
                    </Route>
                    <Route isLogin={isLogin} exact path="/homestay/:id">
                        {completed ? <HomestayDetail logo={logo} isLogin={isLogin} /> : <></>}
                    </Route>
                    <Route isLogin={isLogin} exact path="/destination">
                        <Destination logo={logo} isLogin={isLogin} />
                    </Route>
                    <Route isLogin={isLogin} exact path="/image">
                        <Image logo={logo} isLogin={isLogin} />
                    </Route>
                    <Route isLogin={isLogin} exact path="/journey">
                        <Journey logo={logo} isLogin={isLogin} />
                    </Route>
                    <UnAuthenRoute isLogin={isLogin} exact path="/login">
                        <Login logo={logo} setStateLogin={this.setStateLogin} />
                    </UnAuthenRoute>
                    <UnAuthenRoute isLogin={isLogin} exact path="/register">
                        <Register logo={logo} />
                    </UnAuthenRoute>
                    <ProtectedRoute isLogin={isLogin} exact path="/history">
                        <UserHistory logo={logo} isLogin={isLogin} />
                    </ProtectedRoute>
                </Switch>
            </Router>

            <Router>
                <Switch>
                    <UnAuthenRoute isLogin={isLoginAdmin} exact path="/admin/login">
                        <AdminLogin logo={logo} setStateAdminLogin={this.setStateAdminLogin} />
                    </UnAuthenRoute>
                    <ProtectedAdminRoute isLogin={isLoginAdmin} exact path="/admin">
                        <AdminHomepage />
                    </ProtectedAdminRoute>
                    <ProtectedAdminRoute isLogin={isLoginAdmin} exact path="/admin/booking">
                        {completed ?
                            <AdminBooking /> : <></>
                        }
                    </ProtectedAdminRoute>
                    <ProtectedAdminRoute isLogin={isLoginAdmin} exact path="/admin/homestays">
                        <Homestays />
                    </ProtectedAdminRoute>
                    <ProtectedAdminRoute isLogin={isLoginAdmin} exact path="/admin/users">
                        <Users />
                    </ProtectedAdminRoute>
                </Switch>
            </Router>
        </div>
    }
}

export default Homestay;
