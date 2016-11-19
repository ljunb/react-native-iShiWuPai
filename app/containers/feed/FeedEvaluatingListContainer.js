/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import FeedEvaluatingList from '../../pages/feed/FeedEvaluatingList';

class FeedEvaluatingListContainer extends React.Component {
    render() {
        return (
            <FeedEvaluatingList {...this.props} />
        )
    }
}

export default connect((state) => {
    const {feedEvaluating} = state;
    return {feedEvaluating}
})(FeedEvaluatingListContainer);