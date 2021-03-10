import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Footer.css';


class Footer extends Component {

    render() {
        const { logo } = this.props;
        return <footer>
            <Router>
                <div className="footer-bar">
                    <div className="homestay-logo">
                        <img src={logo} alt="logo" className="logo" />
                    </div>
                    <p className="address">#ADDRESS </p>
                    <div className="community">
                        <a href="https://www.youtube.com/">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="https://www.facebook.com/">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="copyright">
                    <p>2021 Copyright information goes here.</p>
                    <p>Designed by SQA team</p>
                </div>
            </Router>
        </ footer>
    }
}

export default Footer;