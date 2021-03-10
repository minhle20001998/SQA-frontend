import axios from 'axios';
import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Homepage.css"
class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_booking: 0,
            total_homestays: 0,
            total_rating: 0,
            total_revenue: 0,
        }


    }

    componentDidMount() {
        //get total booking
        Promise.all([this.getTransaction(), this.getHomestays(), this.getReview()]).then((results) => {
            const total_booking = results[0].data.length;
            const total_homestays = results[1].data.length;
            const total_rating = results[2].data.length;
            const total_revenue = this.calculateRevenue(results[0].data);

            this.setState({
                total_booking: total_booking,
                total_homestays: total_homestays,
                total_rating: total_rating,
                total_revenue: total_revenue
            })

        })
    }



    calculateRevenue(transaction) {
        let revenue = 0;
        transaction.map((trans, index) => {
            revenue = revenue + parseInt(trans.payment);
        })
        return new Intl.NumberFormat().format(revenue);
    }

    getTransaction() {
        return axios.get('https://sqa-api.herokuapp.com/transaction');
    }

    getHomestays() {
        return axios.get('https://sqa-api.herokuapp.com/homestay');
    }

    getReview() {
        return axios.get('https://sqa-api.herokuapp.com/review');
    }

    render() {
        const { total_booking, total_homestays, total_rating, total_revenue } = this.state;
        return <div className="admin-homepage">
            <Sidebar />
            <div className="main-view">
                <Navbar />
                <header>
                    <h4 className="welcome-header">Hi, Welcome back!</h4>
                    <h4>HOMESTAYS Dashboard</h4>
                </header>
                <section id="statistic">
                    <div className="total-booking">
                        <div className="statistic-icon" style={{ background: '#6777ef' }}>
                            <i className="fas fa-paste"></i>
                        </div>
                        <p className="statistic-name">
                            Total Booking
                        </p>
                        <div className="statistic-data">
                            {total_booking}
                        </div>
                    </div>
                    <div className="total-booking">
                        <div className="statistic-icon" style={{ background: '#fd7e14' }}>
                            <i className="fas fa-paste"></i>
                        </div>
                        <p className="statistic-name">
                            Homestays
                        </p>
                        <div className="statistic-data">
                            {total_homestays}
                        </div>
                    </div>
                    <div className="total-booking">
                        <div className="statistic-icon" style={{ background: '#28a745' }}>
                            <i className="fas fa-paste"></i>
                        </div>
                        <p className="statistic-name">
                            Ratings
                        </p>
                        <div className="statistic-data">
                            {total_rating}
                        </div>
                    </div>
                    <div className="total-booking">
                        <div className="statistic-icon" style={{ background: '#17a2b8' }}>
                            <i className="fas fa-paste"></i>
                        </div>
                        <p className="statistic-name">
                            Total Revenue
                        </p>
                        <div className="statistic-data">
                            {total_revenue}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}

export default Homepage;