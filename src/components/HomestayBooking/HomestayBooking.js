import axios from 'axios';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from "../Nav/Navbar"
import Footer from "../Footer/Footer"
import Slideshow from "../Slideshow/Slideshow"
import "./HomestayBooking.css"
import ScrollUpButton from "react-scroll-up-button";
import ScrollToTop from "../ScrollToTop/ScrollToTop"
import moneyFormatter from "../Functions/moneyFormatter"

class HomestayBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homestays: [
            ],
            searchQuery: {
                address: "",
                checkIn: "",
                checkOut: "",
                quantityOfPeople: "",
                quantityOfChildren: "",
                dormRoom: ""
            },
            steps: 6
        };
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleCheckInInput = this.handleCheckInInput.bind(this);
        this.handleCheckOutInput = this.handleCheckOutInput.bind(this);
        this.handleQuantityPeople = this.handleQuantityPeople.bind(this);
        this.handleQuantityChildren = this.handleQuantityChildren.bind(this);
        this.handleDormRoom = this.handleDormRoom.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    handleAddressInput(e) {
        const address = e.target.value;
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                address
            }
        });
    }

    handleCheckInInput(e) {
        const checkIn = e.target.value;
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                checkIn
            }
        });
    }

    handleCheckOutInput(e) {
        const checkOut = e.target.value;
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                checkOut
            }
        });
    }

    handleQuantityPeople(e) {
        const quantityOfPeople = e.target.value;
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                quantityOfPeople
            }
        });
    }

    handleQuantityChildren(e) {
        const quantityOfChildren = e.target.value;
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                quantityOfChildren
            }
        });
    }

    handleDormRoom(e) {
        const dormRoom = e.target.value;
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                dormRoom
            }
        })
    }

    handleLoadMore() {
        const { homestays, steps } = this.state;
        if (steps + 6 < homestays.length) {
            this.setState({
                steps: steps + 6
            })
        } else {
            this.setState({
                steps: homestays.length
            })
        }
    }



    async componentDidMount() {
        const urlHomestay = "https://sqa-api.herokuapp.com/homestay";
        const resHomestay = await axios.get(urlHomestay);
        const dataHomestay = await resHomestay.data;
        this.setState({
            homestays: dataHomestay,

        });

    }

    render() {
        const { slideImages, homestays, steps } = this.state;
        const { isLogin, logo } = this.props;
        return <div className="homestay-booking">
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
                    {/* search bar */}
                    <label htmlFor="search-bar">search address</label>
                    <input type="text" id="search-bar" name="search-bar" onInput={this.handleAddressInput} />
                    {/* check-in */}
                    <label htmlFor="check-in">check-in</label>
                    <input type="date" name="check-in" id="check-in" onInput={this.handleCheckInInput} />
                    {/* check-out */}
                    <label htmlFor="check-out">check-out</label>
                    <input type="date" id="check-out" name="check-out" onInput={this.handleCheckOutInput} />
                    {/* options */}
                    <div className="options-div">
                        <div className="people-quantity">
                            <label htmlFor="people-quantity-number">quantity of people</label>
                            <input type="number" id="people-quantity-number" min="0" inputMode="numeric" pattern="[0-9]*"
                                onInput={this.handleQuantityPeople} />
                        </div>
                        <div className="children-quantity">
                            <label htmlFor="children-quantity-number">quantity of children</label>
                            <input type="number" id="children-quantity-number" min="0" inputMode="numeric" pattern="[0-9]*"
                                onInput={this.handleQuantityChildren} />
                        </div>
                        <div className="dorm-room">
                            <label htmlFor="dorm-room-number">dorm room</label>
                            <input type="number" id="dorm-room-number" min="0" inputMode="numeric" pattern="[0-9]*"
                                onInput={this.handleDormRoom} />
                        </div>
                    </div>
                    <div className="search-button-div">
                        <button className="search-button">search</button>
                    </div>
                </div>
                <div className="right-side">
                    <div className="homestays">
                        {homestays && homestays.length > 0 && homestays.map((homestay, index) => {
                            if (index < steps) {

                                return <Link to={`homestay/${homestay._id}`} key={homestay.name + "-link"}>
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