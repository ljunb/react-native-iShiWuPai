/**
 * Created by ljunb on 16/5/26.
 */
import * as types from '../../actions/actionTypes';

const initialState = {
    feedList: [],
    isLoading: true,
}

let feedListReducer = (state = initialState, {type, payload})=>{
    
    switch (type) {
        case types.FEED_HOME_LIST_FETCH_LIST:
            return Object.assign({}, state, {
                ...state,
            });
        case types.FEED_HOME_LIST_RECEIVE_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                feedList: payload.feedList,
            });
        default:
            return state
    }
}

export default feedListReducer;