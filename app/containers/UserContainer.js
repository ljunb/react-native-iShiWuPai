/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import User from '../pages/User';

class UserContainer extends React.Component {
    render() {
        return (
            <User {...this.props} />
        )
    }
}

export default connect((state) => {
    const {User} = state;
    return {
        User
    }
})(UserContainer);