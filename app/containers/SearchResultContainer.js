/**
 * Created by ljunb on 16/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import SearchResult from '../pages/SearchResult';

class SearchResultContainer extends React.Component {
    render() {
        return (
            <SearchResult {...this.props} />
        )
    }
}

export default connect((state) => {
    const {SearchResult} = state;
    return {
        SearchResult
    }
})(SearchResultContainer);