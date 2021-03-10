import React, { Component } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slideshow.css'
import slide1 from '../../images/slideImages/slide1.jpg';
import slide2 from '../../images/slideImages/slide2.jpg';
import slide3 from '../../images/slideImages/slide3.jpg';
import slide4 from '../../images/slideImages/slide4.jpg';
import slide5 from '../../images/slideImages/slide5.jpeg';
import slide6 from '../../images/slideImages/slide6.jpg';
import slide7 from '../../images/slideImages/slide7.jpg';
class Slideshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideImages: [slide1, slide2, slide3, slide4, slide5, slide6, slide7]
        }
    }
    render() {
        const { slideImages } = this.state;
        const { children } = this.props;
        return (
            <div className="slide-container" >
                <Slide>
                    {slideImages.map((image, index) =>
                        <div className="each-slide" key={index}>
                            <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${image})` }}>
                                {children}
                            </div>
                        </div>
                    )}
                </Slide>
            </div>
        )
    }
}

export default Slideshow;