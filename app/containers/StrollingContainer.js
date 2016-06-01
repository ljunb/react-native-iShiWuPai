/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import Strolling from '../pages/Strolling';

class StrollingContainer extends React.Component {
    render() {
        return (
            <Strolling {...this.props} />
        )
    }
}

export default connect((state) => {
    const { Strolling } = state;
    return {
        Strolling
    }
})(StrollingContainer);