/**
 * Created by ljunb on 16/5/25.
 * 逛吃reducer
 */
import * as types from '../actions/actionTypes';
const initialState = {
    isShow: true,
};

let strollingReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SHOW_MESSAGE:
            return {
                isShow: true,
            };
        case types.HIDE_MESSAGE:
            return {
                isShow: false,
            };
        default:
            return state;
    }
}

export default strollingReducer;