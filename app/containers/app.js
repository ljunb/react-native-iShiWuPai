/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/strollingActions';
import Main from '../pages/Main';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {state, actions} = this.props;
        
        return (
            <Main isShow = {state.isShow} {...actions}/>
        )
    }
}

export default connect(state => ({
        state: state.strolling
    }),
    (dispatch) => ({
        actions: bindActionCreators(appActions, dispatch)
    })
)(App);