/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as strollingActions from '../actions/strollingActions';
import Strolling from '../pages/Strolling';

class StrollingContainer extends React.Component {
    render() {
        return (
            <Strolling {...this.props} />
        )
    }
}

export default connect((state) => ({
        state: state.Strolling
    }),
    (dispatch) => ({
        actions: bindActionCreators(strollingActions, dispatch)
    })
)(StrollingContainer);