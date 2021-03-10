import React, { Component } from 'react'
import axios from 'axios';
import Slideshow from '../Slideshow/Slideshow';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer';
import ScrollUpButton from "react-scroll-up-button";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import './Image.css';
import { Helmet } from "react-helmet";

function importAll(r) {
    return r.keys().map(r);
}
const dalats = importAll(require.context('./assets/Dalat', false, /\.(png|jpe?g|svg)$/));
const danangs = importAll(require.context('./assets/Danang', false, /\.(png|jpe?g|svg)$/));
const hanois = importAll(require.context('./assets/Hanoi', false, /\.(png|jpe?g|svg)$/));

class Image extends Component {
    render() {
        dalats.map((image) => {
            console.log(image.default)
        });
        const { logo, history, isLogin } = this.props;

        return <div className="image">
            <Helmet>
                <title>Image</title>
            </Helmet>
            <ScrollToTop />
            <ScrollUpButton />
            <Navbar current="homepage" logo={logo} isLogin={isLogin} current="image" />
            <Slideshow />
            <section id="images-section">
                <div className="heading">
                    <p className="title">TRAVEL THROUGH LENS</p>
                    <p>Share endless moments - A journey of thousands of miles always starts with small steps.</p>
                    <div className="location-navigation">
                        <a href="#dalat">DA LAT</a>
                        <a href="#danang">DA NANG</a>
                        <a href="#hanoi">HA NOI</a>
                    </div>
                </div>
                <div className="all-images">
                    <p id="dalat" className="main-heading">DA LAT</p>
                    {dalats.map((image) => {
                        return <img src={image.default} alt="images" />
                    })}
                    <p id="danang" className="main-heading">DA NANG</p>
                    {danangs.map((image) => {
                        return <img src={image.default} alt="images" />
                    })}
                    <p id="hanoi" className="main-heading">HANOI</p>
                    {hanois.map((image) => {
                        return <img src={image.default} alt="images" />
                    })}

                </div>
            </section>
            <Footer logo={logo}></Footer>
        </div>
    }
}

export default Image;