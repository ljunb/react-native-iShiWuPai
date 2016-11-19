/**
 * Created by ljunb on 2016/11/19.
 */
import * as types from '../../actions/actionTypes';

const initialState = {
    feedList: [],
    isLoading: true,
}

let feedListReducer = (state = initialState, {type, payload})=>{

    switch (type) {
        case types.FEED_EVALUATING_LIST_FETCH_LIST:
            return Object.assign({}, state, {
                ...state,
            });
        case types.FEED_EVALUATING_LIST_RECEIVE_LIST:
            return Object.assign({}, state, {
                feedList: payload.feedList,
                isLoading: false,
            })
        default:
            return state
    }
}

export default feedListReducer;