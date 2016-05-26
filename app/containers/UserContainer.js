/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import User from '../pages/User';

class UserContainer extends React.Component {
    render() {
        return (
            <User {...this.props} />
        )
    }
}

export default connect((state) => ({
        state: state.User
    }),
    (dispatch) => ({
        actions: bindActionCreators(userActions, dispatch)
    })
)(UserContainer);