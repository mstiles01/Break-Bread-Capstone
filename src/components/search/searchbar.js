
import React, { Component } from 'react';
import SearchForm from './SearchForm';

class Search extends Component {

    render() {
        return (
            <React.Fragment>
                <SearchForm {...this.props} />
            </React.Fragment>
        )
    }
}

export default Search;