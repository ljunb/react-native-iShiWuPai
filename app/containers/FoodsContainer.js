/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import Foods from '../pages/Foods';

class FoodsContainer extends React.Component {
    render() {
        return (
            <Foods {...this.props} />
        )
    }
}

export default connect((state) => {
    const {Foods} = state;
    return {
        Foods
    }
})(FoodsContainer);