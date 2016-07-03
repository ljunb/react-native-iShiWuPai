/**
 * Created by ljunb on 16/7/3.
 */
import React from 'react';
import { connect } from 'react-redux';
import FoodInfo from '../pages/FoodInfo';

class FoodInfoContainer extends React.Component {
    render() {
        return <FoodInfo {...this.props} />
    }
}

export default connect((state)=>{
    const { FoodInfo } = state;
    return { FoodInfo };
})(FoodInfoContainer);