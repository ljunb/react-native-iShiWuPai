/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import FeedDelicacyList from '../../pages/feed/FeedDelicacyList';

class FeedDelicacyListContainer extends React.Component {
    render() {
        return (
            <FeedDelicacyList {...this.props} />
        )
    }
}

export default connect((state) => {
    const {feedDelicacy} = state;
    return {feedDelicacy}
})(FeedDelicacyListContainer);