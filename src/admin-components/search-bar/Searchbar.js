import React, { Component } from 'react'
import './Searchbar.css'
class Searchbar extends Component {
    render() {
        const { placeholder, handleOnInput } = this.props;
        return <div className="search-bar">
            <input type="text" placeholder={placeholder} onInput={handleOnInput} />
        </div>
    }
}

export default Searchbar;