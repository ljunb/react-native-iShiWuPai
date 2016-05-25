/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

import App from './containers/app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}