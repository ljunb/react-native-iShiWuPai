/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import FeedKnowledgeList from '../../pages/feed/FeedKnowledgeList';

class FeedKnowledgeListContainer extends React.Component {
    render() {
        return (
            <FeedKnowledgeList {...this.props} />
        )
    }
}

export default connect((state) => {
    const {feedKnowledge} = state;
    return {feedKnowledge}
})(FeedKnowledgeListContainer);