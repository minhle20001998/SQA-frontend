import axios from 'axios';
import React, { Component } from 'react';
import Navbar from '../Nav/Navbar';
import Slideshow from '../Slideshow/Slideshow';
import Footer from '../Footer/Footer'
import { BrowserRouter as Router, withRouter, Link } from 'react-router-dom';
import './Homepage.css';
import ScrollUpButton from "react-scroll-up-button";
import user_image from "../../images/user.png";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { moneyFormatter } from "../Functions/moneyFormatter";
import { Helmet } from "react-helmet";

const tourims = [
    { title: "SaPa", link: "https://mienbactour.com/view/at_sapa-diem-den-hap-dan-cua-mien-bac_4fe224bdaad3974a4f74174849c20a92.jpg" },
    { title: "Da Lat", link: "https://vcdn1-dulich.vnecdn.net/2019/05/23/12-1558593963.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=sEbfKs9N6CgwUja6gayIJA" },
    { title: "Ninh Binh", link: "https://sodulich.ninhbinh.gov.vn/SiteFolders/sodulich/2318/tin%20tuc%20su%20kien/2020/trang%20an1.jpg" },
    { title: "Khanh Hoa", link: "https://photo-cms-plo.zadn.vn/w800/Uploaded/2021/cdhnwyqjw/2020_11_05/khanh-hoa-sai-pham_uyxg.jpg" },

]

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homestays: null
            ,
        }

    }
    async componentDidMount() {
        console.log("homepage")
        const urlHomestay = "https://sqa-api.herokuapp.com/homestay";
        const resHomestay = await axios.get(urlHomestay);
        const dataHomestay = await resHomestay.data;
        const popular_homestays = [];
        const slide_images = [];
        for (let i = 0; i < 3; i++) {
            popular_homestays.push(dataHomestay[i]);
        }
        this.setState({
            homestays: popular_homestays,
        })
        //
        const urlReview = "https://sqa-api.herokuapp.com/broad"
        const resReview = await axios.get(urlReview);
        const dataReview = await resReview.data;
        const popular_trips = dataReview.slice(0, 3);
        this.setState({
            popularTrips: popular_trips
        })
    }

    render() {
        const { slideImages, homestays, popularTrips } = this.state;
        const { logo, history, isLogin } = this.props;
        //
        return <div className="homepage" >
            <Helmet>
                <title>Homestays</title>
            </Helmet>
            <ScrollToTop />
            <ScrollUpButton />
            <Navbar current="homepage" logo={logo} isLogin={isLogin} />
            <Slideshow />
            <header>
                <div className="inspiration-div">
                    <div className="icon" ></div>
                    <p className="heading">INSPIRATION</p>
                    <p className="content">
                        Many tourist attraction are shown here. Let’s see !
                        </p>
                </div>
                <div className="image-div">
                    <div className="icon"></div>
                    <p className="heading">IMAGE</p>
                    <p className="content">
                        List of image about homestay in everywhere !
                        </p>
                </div>
                <div className="experiences-div">
                    <div className="icon"></div>
                    <p className="heading">JOURNEY’S EXPERIENCES</p>
                    <p className="content">
                        Share journeys about places where you go with family, friend and partner !
                        </p>
                </div>
            </header>
            <section >
                <div className="flex-center">
                    <hr style={{ width: "80%" }} />
                </div>
                <div className="popular-homestays">
                    <p className="main-heading">Most popular homestay</p>
                    <div className="popular-homestays-body">
                        {homestays && homestays.map(homestay =>
                            <Link to={`/homestay/${homestay._id}`} key={homestay.name + "-link"}>
                                <div className="thumbnail" style={{ backgroundImage: `url(${homestay.image_link[0]})` }}></div>
                                <p className="homestay-price">{`$${moneyFormatter(homestay.price)}/person`}</p>
                                <p className="homestay-name">{homestay.name}</p>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="popular-trips">
                    <p className="main-heading">Journey's Experiences</p>
                    <div className="popular-trips-body">
                        {/* mapping */}
                        {homestays && homestays.length > 0 && popularTrips && popularTrips.map((trip, index) => {
                            return <div className="travel-card" key={Math.random() * popularTrips.length}>
                                {/* <div className="top-div">
                                    <div className="avatar" style={{ backgroundImage: `url(${user_image})` }}>
                                    </div>
                                    <div className="popular-trips-comment">
                                        <p >
                                            <q className="quotes">
                                                {trip.title}
                                            </q>
                                        </p>
                                    </div>
                                </div>
                                <div to="/" className="card box-shadow padding-for-beige"
                                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${trip.image_link})` }}
                                >
                                    <div className="card-info">
                                        <p className="card-title">"{trip.content}"</p>
                                        <Link to="/journey">Read more</Link>
                                    </div>
                                </div> */}
                                <div className="avatar" style={{ backgroundImage: `url(${user_image})` }}></div>
                                <p className="trip-title">{trip.title}</p>
                                <p className="trip-content">{trip.content}</p>
                                <i className="fa fa-quote-right"></i>
                            </div>
                        })}
                        <></>
                    </div>
                </div>
            </section>
            <div className="book-now-div">
                <p>Ready to plan your trip ?</p>
                <button>BOOK NOW</button>
            </div>
            <div className="horizontal-bar">
                <hr />
            </div>
            <div>
                <p className="sub-heading">Destination</p>
                <p className="main-heading" style={{ paddingTop: "0px" }}>Popular Tourisms Regions</p>
                <div className="popular-tourism">
                    {tourims.map(tour => {
                        return <div className="tourism-card" style={{
                            backgroundImage: `linear-gradient(
                            0deg
                            , #2a2a2a, transparent),url(${tour.link})`
                        }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <p className="tour-title">{tour.title}</p>
                                <Link to="/destination"><i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Footer logo={logo}></Footer>
        </div>
    }
}

export default withRouter(Homepage);