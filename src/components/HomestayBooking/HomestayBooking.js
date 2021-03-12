import axios from 'axios';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from "../Nav/Navbar"
import Footer from "../Footer/Footer"
import Slideshow from "../Slideshow/Slideshow"
import "./HomestayBooking.css"
import ScrollUpButton from "react-scroll-up-button";
import ScrollToTop from "../ScrollToTop/ScrollToTop"
import { moneyFormatter } from "../Functions/moneyFormatter"
import { Helmet } from "react-helmet";
import { removeVietnameseTones } from "../Functions/removeVietnamese"
class HomestayBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homestays: [],
            show: [],
            priceLower: "",
            priceHigher: "",
            steps: 6
        };
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePriceLowerInput = this.handlePriceLowerInput.bind(this);
        this.handlePriceHigherInput = this.handlePriceHigherInput.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.searchPrice = this.searchPrice.bind(this);
        this.search = this.search.bind(this);
    }

    search(field, input) {
        const { homestays, priceLower, priceHigher } = this.state;
        if (field === "address") {
            const filter = homestays.filter((homestay) => {
                return removeVietnameseTones((homestay.address).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()));
            })
            this.setState({
                show: filter
            })
        }
        if (field === "name") {
            const filter = homestays.filter((homestay) => {
                return removeVietnameseTones((homestay.name).toLowerCase()).match(removeVietnameseTones(input.toLowerCase()));
            })
            this.setState({
                show: filter
            })
        }
    }

    searchPrice() {
        const { homestays, priceLower, priceHigher } = this.state;
        const filter = homestays.filter((homestay) => {
            if ((priceLower) !== "" && (priceHigher) !== "") {
                if (parseInt(homestay.price) < parseInt(priceLower) && parseInt(homestay.price) > parseInt(priceHigher)) {
                    return homestay
                }
            } else if ((priceLower) === "" && (priceHigher) !== "") {
                if (parseInt(homestay.price) > parseInt(priceHigher)) {
                    return homestay
                }
            } else if ((priceLower) !== "" && (priceHigher) === "") {
                if (parseInt(homestay.price) < parseInt(priceLower)) {
                    return homestay
                }
            } else {
                return homestay
            }
        })
        this.setState({
            show: filter
        })
    }

    handleAddressInput(e) {
        const address = e.target.value;
        this.search("address", address);
    }


    handleNameInput(e) {
        const name = e.target.value;
        this.search("name", name);
    }

    handlePriceLowerInput(e) {
        const priceLower = e.target.value;
        this.setState({
            priceLower: priceLower
        }, this.searchPrice)
    }

    handlePriceHigherInput(e) {
        const priceHigher = e.target.value;
        this.setState({
            priceHigher: priceHigher
        }, this.searchPrice)

    }

    handleLoadMore(e) {
        const { homestays, steps } = this.state;
        const init_steps = 6;
        const top = document.querySelector('#homestay-booking-header');
        if (steps + 6 < homestays.length) {
            this.setState({
                steps: steps + 6
            })
            e.target.textContent = "Load More";
        } else {
            this.setState({
                steps: homestays.length
            })
            e.target.textContent = "View Less";
        }
        if (steps == homestays.length) {
            top.scrollIntoView();
            this.setState({
                steps: init_steps
            })
            e.target.textContent = "Load More";
        }
    }



    async componentDidMount() {
        const urlHomestay = "https://sqa-api.herokuapp.com/homestay";
        const resHomestay = await axios.get(urlHomestay);
        const dataHomestay = await resHomestay.data;
        console.log(dataHomestay);
        this.setState({
            homestays: dataHomestay,
            show: dataHomestay
        });

    }

    render() {
        const { slideImages, homestays, steps, show } = this.state;
        const { isLogin, logo } = this.props;
        return <div className="homestay-booking">
            <Helmet>
                <title>Booking</title>
            </Helmet>
            <ScrollToTop />
            <ScrollUpButton />
            <Navbar current="homestay booking" logo={logo} isLogin={isLogin} />
            <Slideshow />
            <header id="homestay-booking-header">
                <p >
                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                    I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
                </p>
            </header>
            {/*  */}
            <section id="homestay-booking-section">
                <div className="side-bar">
                    {/* search name */}
                    <label htmlFor="name">search by name</label>
                    <input type="text" name="name" id="name" onInput={this.handleNameInput} />
                    {/* search bar */}
                    <label htmlFor="search-bar">search by address</label>
                    <input type="text" id="search-bar" name="search-bar" onInput={this.handleAddressInput} />
                    {/* price lower */}
                    <label htmlFor="search-bar">search by price (lower) </label>
                    <input type="number" id="search-bar" name="search-bar" onInput={this.handlePriceLowerInput} />
                    {/* price lower */}
                    <label htmlFor="search-bar">search by price (higher) </label>
                    <input type="number" id="search-bar" name="search-bar" onInput={this.handlePriceHigherInput} />
                    <div className="search-button-div">
                        <button className="search-button">search</button>
                    </div>
                </div>
                <div className="right-side">
                    <div className="homestays">
                        {show && show.length > 0 && show.map((homestay, index) => {
                            if (index < steps) {
                                return <Link to={`homestay/${homestay._id}`} key={index}>
                                    <div className="thumbnail" style={{ backgroundImage: `url(${homestay.image_link[0]})` }}></div>
                                    <p className="homestay-name">{homestay.name}</p>
                                    <p className="homestay-address">{homestay.address}</p>
                                    <p className="homestay-price">{moneyFormatter(homestay.price) + " VND"}</p>
                                </Link>
                            }
                        }
                        )}
                    </div>
                    <div className="load-more-div">
                        <button className="load-more-button" onClick={this.handleLoadMore}>Load more</button>
                    </div>
                </div>
            </section>
            <Footer logo={logo} />
        </div>
    }
}

export default HomestayBooking;