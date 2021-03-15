import React, { Component } from 'react'
import Autosuggest from "react-autosuggest";
import './AutoSuggest.css'
class AutoSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            value: "",
            suggestions: []
        }
        this.onChange = this.onChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const { data } = this.props;
        return inputLength === 0
            ? []
            : data.filter(
                (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
            );
    };

    renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

    getSuggestionValue = (suggestion) => suggestion.name;

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const { data } = this.props;
        const inputProps = {
            placeholder: "Search location",
            value,
            onChange: this.onChange
        };
        return <div className="auto-suggest">

            {data && <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
                    const div = document.querySelector('.footer-bar');
                    this.props.handleSearchByID(suggestion._id);
                    setTimeout(function () {
                        div.scrollIntoView();
                    }, 50);

                }}
            />}
        </div>

    }
}

export default AutoSuggest;