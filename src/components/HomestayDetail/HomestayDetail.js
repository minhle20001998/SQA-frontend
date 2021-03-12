import axios from 'axios';
import React, { Component } from 'react'
import Navbar from '../Nav/Navbar'
import ScrollToTop from "../ScrollToTop/ScrollToTop"
import ScrollUpButton from "react-scroll-up-button";
import Slideshow from '../Slideshow/Slideshow';
import './HomestayDetail.css';
import { BrowserRouter as Router, withRouter, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import Footer from '../Footer/Footer'
import user_image from "../../images/user.png";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { moneyFormatter } from "../Functions/moneyFormatter"
import { Helmet } from "react-helmet";
class HomestayDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            homestay: null,
            reviews: null,
            user: null,
            error: "",
            value: 1

        }
        this.slideRef = React.createRef();
        this.getReview = this.getReview.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.handlePostReview = this.handlePostReview.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditOnClick = this.handleEditOnClick.bind(this);
        this.handleTransaction = this.handleTransaction.bind(this);
    }

    async componentDidMount() {
        const homestay_id = this.props.match.params.id;
        const urlHomestay = "https://sqa-api.herokuapp.com/homestay/getOne";
        const getHomestay = await axios.post(urlHomestay, {
            _id: homestay_id.toString()
        });
        const homestay = getHomestay.data;
        this.setState({
            homestay: homestay
        })

        this.getReview(homestay_id);
        this.getUserData();
    }

    async getReview(homestay_id) {
        const urlReview = "https://sqa-api.herokuapp.com/review/homestay";
        const getReviews = await axios.post(urlReview, {
            homestay_id: homestay_id
        })
        const reviews = getReviews.data;
        this.setState({
            reviews: reviews
        })
    }

    async getUserData() {
        const userUrl = "https://sqa-api.herokuapp.com/user/getOne";
        const userID = this.getCookie("uid");
        const getUserInfo = await axios.post(userUrl, {
            _id: userID
        })
        this.setState({
            user: getUserInfo.data
        })

    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async handlePostReview(e) {
        const { user } = this.state;
        const content = document.querySelector("#message").value;
        const homestay_id = this.props.match.params.id;
        const urlReview = "https://sqa-api.herokuapp.com/review";
        const request = {
            homestay_id: homestay_id,
            name: user.name,
            email: user.email,
            content: content,
        }
        const reviewResult = await axios.post(urlReview, request);
        if (reviewResult.data === "added!") {
            this.getReview(homestay_id)
        }
    }

    changeSlide(index) {
        this.slideRef.current.goTo(index)
    }

    timeConverter(time) {
        const date = new Date(time);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("en-US", options);
    }

    handleEditOnClick(e) {
        this.setState({
            dialogOpen: true,
        });

    }

    handleEditClose() {
        this.setState({
            dialogOpen: false
        })
    }

    async handleTransaction() {
        const { user, homestay } = this.state;
        const transaction_url = "https://sqa-api.herokuapp.com/transaction"
        const amount = parseInt(document.querySelector('#amount').value);
        if (amount && amount > 0) {
            const request = {
                user_id: user._id,
                homestay_id: homestay._id,
                amount: amount
            }
            const result = await axios.post(transaction_url, request);
            this.handleEditClose();
            window.alert(`GIAO DICH THANH CONG, TAI KHOAN CUA BAN DA BI TRU ${amount * parseInt(homestay.price)} VND`)
        } else {
            this.setState({
                err: "Please enter homestay amount"
            })
        }
    }

    render() {
        const { isLogin, logo } = this.props;
        const { homestay, reviews, dialogOpen, err, value } = this.state;
        return <div className="homestay_detail">
            <Helmet>
                <title>Detail</title>
            </Helmet>
            {(homestay && reviews) ? <Dialog open={dialogOpen} onClose={this.handleEditClose} id="bill" >
                <DialogTitle id="form-dialog-title">Edit Homestays</DialogTitle>
                <p style={{ color: "red", textAlign: "center" }}>{err}</p>
                <DialogContent id="bill-form">
                    <div>
                        <DialogContentText>
                            Homestay Name
                        </DialogContentText>
                        <p>{homestay.name ? homestay.name : ""}</p>
                    </div>
                    <div>
                        <DialogContentText>
                            Catalog Name
                        </DialogContentText>
                        <p>{homestay.catalog_name ? homestay.catalog_name : ""}</p>
                    </div>
                    <div>
                        <DialogContentText>
                            Price
                        </DialogContentText>
                        <p id="price" >{homestay.price ? moneyFormatter(parseInt(homestay.price) * parseInt(value)) : ""}</p>
                    </div>
                    <div>
                        <DialogContentText>
                            Amount
                        </DialogContentText>
                        <input min="1" type="number" defaultValue={1} id="amount" required="required" onInput={(e) => { this.setState({ value: e.target.value }) }} />
                    </div>
                    <DialogActions>
                        <button type="submit" className="action-btn" id="save-btn" onClick={this.handleTransaction}>Confirm</button>
                        <button className="action-btn" id="close-btn" onClick={this.handleEditClose}>Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog> : <></>}
            <ScrollToTop />
            <ScrollUpButton />
            <Navbar isLogin={isLogin} logo={logo} />
            <Slideshow />
            {(homestay && reviews) ?
                <section className="detail-parts grid-system">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="slider">
                                    <Slide ref={this.slideRef}>
                                        {homestay.image_link.map((image, index) =>
                                            <div className="mySlides" key={index}>
                                                <div className="numbertext"> {index} / 4</div>
                                                <img src={image} style={{ width: 100 + "%" }} draggable="false" />
                                            </div>
                                        )}
                                    </Slide>

                                    {/* <!-- Image text --> */}
                                    <div className="caption-container">
                                        <p id="caption">{homestay.name}</p>
                                    </div>

                                    {/* <!-- Thumbnail images --> */}
                                    <div className="row small-img">
                                        {homestay.image_link.map((image, index) => {
                                            if (index < 4) {
                                                return <div className="column" key={index}>
                                                    <img className="demo cursor" src={image} style={{ width: 100 + "%" }} onClick={() => { this.changeSlide(index) }} alt="slide1" />
                                                </div>
                                            }
                                        }
                                        )}
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="col-lg-12">
                                        <div className="sidebar-heading">
                                            <h4><i className="fa fa-comments"></i>  Comments</h4>
                                        </div>
                                        {isLogin ? <div className="sidebar-item submit-comment">
                                            <div className="content">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <fieldset>
                                                            <textarea name="comment" rows="6" id="message" placeholder="Enter your comment" required="" style={{ width: 100 + "%", height: 70 + "px" }}></textarea>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <fieldset>
                                                            <button type="button" id="form-submit" className="submit-btn main-button" onClick={this.handlePostReview}>Post</button>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> :
                                            <div className="remind-login">
                                                <h2 style={{ textAlign: "center" }}> <a href="/login">You must login first</a> </h2>
                                            </div>
                                        }

                                    </div>
                                    <div className="col-lg-12">
                                        <div className="comment-item">

                                            {reviews.map((review, index) => {
                                                return <div className="row" id="form-comment" key={index}>
                                                    <div className="author-thumb">
                                                        <img src={user_image} alt="" />
                                                    </div>
                                                    <div className="right-content">
                                                        <h5>{review.name}</h5>
                                                        <p id="timestamp">{this.timeConverter(review.created)}</p>
                                                        <p>{review.content}</p>
                                                    </div>
                                                </div>
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="information">
                                    <div className="row">
                                        <i className="fa fa-server"></i>
                                        <p className="homestay-name">{homestay.name}</p>
                                    </div>
                                    <div className="row">
                                        <i className="fas fa-hand-holding-usd"></i>
                                        <p>{moneyFormatter(homestay.price)} VND</p>
                                    </div>

                                    <div className="row">
                                        <i className="fas fa-location-arrow"></i>
                                        <p>{homestay.address}</p>
                                    </div>
                                    <div className="row">
                                        <i className="far fa-compass"></i>
                                        <p>{homestay.description}</p>
                                    </div>
                                    <div className="row">
                                        <i className="fas fa-info-circle"></i>
                                        <p>{homestay.roomtype}</p>
                                    </div>
                                    <div className="row bottom-row">
                                        <div className="col-lg-7" style={{ marginLeft: -10 + "px" }}>
                                            <button className=" style-btn" onClick={this.handleEditOnClick}>
                                                <i className="fa fa-cart-plus"></i>
                                            </button>
                                        </div>
                                        <div className="payment col-lg-5">
                                            <i className="fa fa-cc-mastercard"></i>
                                            <i className="fa fa-cc-visa"></i>
                                            <i className="fa fa-paypal"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="advertisment">
                                    <h4>Advertisment</h4>
                                    <img src="public/images/7up.jpg" width="100%" height="450px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : <></>}
            <Footer logo={logo}></Footer>
        </div>
    }
}

export default withRouter(HomestayDetail);