import React, { Component } from 'react'
import axios from 'axios';
import Slideshow from '../Slideshow/Slideshow';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer';
import ScrollUpButton from "react-scroll-up-button";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import './Journey.css';
import user_image from "../../images/user.png";
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom'
import { Helmet } from "react-helmet";
class Journey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            broads: null,
            content: "",
            title: "",
            address: "",
            image_link: "",
        }
        this.handleContentInput = this.handleContentInput.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleImageLinkInput = this.handleImageLinkInput.bind(this);
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.getBroads = this.getBroads.bind(this);
        this.toLoginpage = this.toLoginpage.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
        this.getBroads();
    }

    async getBroads() {
        const broad_url = "https://sqa-api.herokuapp.com/broad";
        const broads = await axios.get(broad_url);
        this.setState({
            broads: broads.data
        })
    }

    handleContentInput(e) {
        const content = e.target.value;
        this.setState({
            content: content
        })
    }

    handleTitleInput(e) {
        const title = e.target.value;
        this.setState({
            title: title
        })
    }

    handleImageLinkInput(e) {
        const image_link = e.target.value;
        this.setState({
            image_link: image_link
        })
    }

    handleAddressInput(e) {
        const address = e.target.value;
        this.setState({
            address: address
        })
    }

    toLoginpage() {
        const { isLogin } = this.props;
        if (!isLogin) {
            this.props.history.push('/login');
        }
    }

    async handlePost() {
        const { isLogin } = this.props;
        const { content, title, image_link, address } = this.state;
        if (content.replace(/ /g, '') !== "" && title.replace(/ /g, '') !== ""
            && image_link.replace(/ /g, '') !== "" && address.replace(/ /g, '') !== ""
            && isLogin) {
            const broad_url = "https://sqa-api.herokuapp.com/broad";
            const request = {
                title: title,
                content: content,
                image_link: image_link,
                address: address,
            }
            const response = await axios.post(broad_url, request);
            if (response.data === "added!") {
                this.getBroads();
                this.clearInput();
            }

        }
        else if (!isLogin) {
            this.toLoginpage();
        }
        else {
            window.alert('Please fill all blank areas !');
        }
    }

    clearInput() {
        const allInput = document.querySelectorAll(".experience-input");
        allInput.forEach((input) => {
            input.value = ""
        })
    }


    render() {
        const { broads } = this.state;
        const { logo, history, isLogin } = this.props;
        return <div className="journey">
            <Helmet>
                <title>Journey</title>
            </Helmet>
            <ScrollToTop />
            <ScrollUpButton />
            <Navbar current="homepage" logo={logo} isLogin={isLogin} current="journey experiences" />
            {broads ?
                <main>
                    <section id="broad-news">
                        {broads.map((broad, index) => {
                            return <div className="broad" key={index}>
                                <div>
                                    <img className="user-avatar" src={user_image} alt="user-avatar" />
                                    <p className="user-name">{`Traveller #${index}`}</p>
                                </div>
                                <div className="broad-body">
                                    <p className="title">{broad.title}</p>
                                    <p className="address"># {broad.address}</p>
                                    <p className="content">{broad.content}</p>
                                    <img className="tag-image" src={broad.image_link} alt="tag-image" />
                                </div>
                            </div>
                        })}
                    </section>
                    <aside className="head-div">
                        <header onClick={this.toLoginpage}>
                            <div id="title">
                                <p id="heading-p">Create a post</p>
                            </div>
                            <div id="post-body">
                                <div className="post-input">
                                    <button className="post-button" onClick={this.handlePost}>Post</button>
                                    <i className="fas fa-user"></i>
                                    <textarea className="experience-input" placeholder="What's on your mind ?" onInput={this.handleContentInput} />
                                </div>
                                <div className="title-input board-input">
                                    <i className="fas fa-arrow-right"></i>
                                    <input className="experience-input" type="text" placeholder="Set your title" onInput={this.handleTitleInput} />
                                </div>
                                <div className="image-input board-input">
                                    <i className="far fa-image"></i>
                                    <input className="experience-input" type="text" placeholder="Put your image link here" onInput={this.handleImageLinkInput} />
                                </div>
                                <div className="address-input board-input">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <input className="experience-input" type="text" placeholder="Where are you ?" onInput={this.handleAddressInput} />
                                </div>
                            </div>
                        </header>
                    </aside>
                </main>
                : <></>}
            <Footer logo={logo}></Footer>
        </div>
    }
}

export default withRouter(Journey);