import { red } from '@material-ui/core/colors';
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter, Link, Route, Redirect } from 'react-router-dom';

class UnAuthenRoute extends Component {
    componentDidMount() {
        console.log("unauthen")
    }

    render() {
        const { isLogin, path, children, exact } = this.props;
        console.log("is login: ", isLogin)
        if (isLogin) {
            console.log("goback")
            this.props.history.goBack();
            return null;
        } else {
            console.log("not goback")
            return <Route exact={exact} to={path}>
                {children}
            </Route>
        }
    }
}

export default withRouter(UnAuthenRoute);