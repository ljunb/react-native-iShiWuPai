/**
 * Created by ljunb on 16/5/25.
 * 逛吃reducer
 */
import * as types from '../actions/actionTypes';
const initialState = {
    bannerList: [],
    feedList: [],
    isLoaded: false,
};

let strollingReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case types.FETCH_BANNER_LIST:
            return {
                ...state,
            }
        case types.RECEIVE_BANNER_LIST:
            return Object.assign({}, state, {
                bannerList: action.bannerList,
                isLoaded: action.isLoaded,
            })
        case types.FETCH_FEED_LIST:
            return {
                ...state,
            }
        case types.RECEIVE_FEED_LIST:
            return Object.assign({}, state, {
                feedList: action.feedList,
            })
        default:
            return state;
    }
}

export default strollingReducer;