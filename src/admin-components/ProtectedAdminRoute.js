import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter, Link, Route, Redirect } from 'react-router-dom';

class ProtectedAdminRoute extends Component {
    render() {

        const { isLogin, path, children, exact } = this.props;
        console.log(isLogin)
        console.log("admin protected ", this.props)
        return <Route exact={exact} to={path}>
            {isLogin ? children : <Redirect push to="/admin/login" />}
        </Route>
    }
}

export default withRouter(ProtectedAdminRoute);