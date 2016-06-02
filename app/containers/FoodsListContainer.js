/**
 * Created by ljunb on 16/6/2.
 */
import React from 'react';
import {connect} from 'react-redux';
import FoodsList from '../pages/FoodsList';

class FoodsListContainer extends React.Component {
    render() {
        return (
            <FoodsList {...this.props} />
        )
    }
}

export default connect((state) => {
    const {FoodsList} = state;
    return {
        FoodsList
    }
})(FoodsListContainer);