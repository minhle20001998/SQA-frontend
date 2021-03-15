import React, { Component } from 'react'
import axios from 'axios';
import Slideshow from '../Slideshow/Slideshow';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer'
import ScrollUpButton from "react-scroll-up-button";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import './Destination.css';
import { Helmet } from "react-helmet";
import AutoSuggest from '../AutoSuggest/AutoSuggest'
class Destination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: "",
            homestays: null,
            showList: null
        }
        this.setShowList = this.setShowList.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.searchCategory = this.searchCategory.bind(this);
        this.handleSearchByID = this.handleSearchByID.bind(this);
    }

    async componentDidMount() {
        const urlHomestays = "https://sqa-api.herokuapp.com/homestay";
        const result = await axios.get(urlHomestays);
        this.setState({
            homestays: result.data
        });
        // 

        this.setShowList(result.data)
    }

    setShowList(list) {
        const showList = [];

        for (let i = 0; i < 6; i++) {
            showList.push(list[i])
        }
        this.setState({
            showList: showList
        })
    }

    setLocation(location) {
        this.setState({
            location: location
        })
    }

    handleSearchByID(id) {
        const arr = []
        const found = this.state.homestays.find(element => element._id === id);
        arr.push(found);
        this.setState({
            showList: arr
        })
    }


    handleLocationChange(e) {
        let location = ""
        switch (e.target.innerText) {
            case ("HA NOI"):
                location = 'Hanoi';
                break;
            case ("DA LAT"):
                location = 'Da Lat';
                break;
            case ("DA NANG"):
                location = 'Da Nang';
                break;
            case ("HUE"):
                location = 'Hue';
                break;
            case ("SAPA"):
                location = 'Sa Pa';
                break;
            case ("KHANH HOA"):
                location = 'Khanh Hoa';
                break;
        }
        this.setLocation(location)
        this.searchCategory(location);
    }


    searchCategory(location) {
        const { homestays } = this.state;
        const showList = [];
        homestays.map((homestay) => {
            if (homestay.catalog_name === location) {
                showList.push(homestay)
            }
        })
        this.setState({
            showList: showList
        })
    }



    render() {
        const { homestays, showList, location } = this.state;
        const { logo, history, isLogin } = this.props;
        return <div className="destination">
            <Helmet>
                <title>Destination</title>
            </Helmet>
            <ScrollToTop />
            <ScrollUpButton />
            <Navbar current="destination" logo={logo} isLogin={isLogin} />
            <div className="slide-show">
                <div className="main-content">
                    <div className="meta-text">
                        <h2>Where do you want to go?</h2>
                    </div>
                    <div className="search row">
                        <AutoSuggest handleSearchByID={this.handleSearchByID} data={homestays} />
                        {/* <form className="search-form" name="" method="" action="">
                            <input type="text" className="searchText" placeholder="Select Place" />
                        </form> */}
                        <button><i className="fa fa-search icon-search" aria-hidden="true"></i></button>
                    </div>
                </div>
                <Slideshow >
                </Slideshow>
            </div>
            {showList ? <section className="detail-parts grid-system">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading">
                                <p>FAMOUS PLACES  <br /> Explore the next destination for your great journey</p>
                            </div>
                            <div className="col-lg-12">
                                <div className="name-place">
                                    <div className="row">
                                        <div className="col-lg-4" id="ha_noi">
                                            <p onClick={this.handleLocationChange}>HA NOI</p>
                                        </div>
                                        <div className="col-lg-4" id="hcm">
                                            <p onClick={this.handleLocationChange}>DA LAT</p>
                                        </div>
                                        <div className="col-lg-4" id="dn">
                                            <p onClick={this.handleLocationChange}>DA NANG</p>
                                        </div>
                                        <div className="col-lg-4" id="can-tho">
                                            <p onClick={this.handleLocationChange}>HUE</p>
                                        </div>
                                        <div className="col-lg-4" id="sapa">
                                            <p onClick={this.handleLocationChange}>SAPA</p>
                                        </div>
                                        <div className="col-lg-4" id="khanh-hoa">
                                            <p onClick={this.handleLocationChange}>KHANH HOA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <hr />
                            <div className="heading">
                                <p>FAMOUS LANDSCAPE  {location ? `AT ${location.toUpperCase()}` : ""}</p>
                            </div>
                            <div className="col-lg-12">
                                <div className="image-place">
                                    <div className="row">
                                        {showList.map((homestay, index) => {
                                            return <div className="col-lg-4 destinations-div" key={index}>
                                                <a href={`/homestay/${homestay._id}`}><img src={homestay.image_link[0]} /></a>
                                            </div>
                                        })}
                                    </div>
                                </div>
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

export default Destination;