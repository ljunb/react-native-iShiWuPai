/**
 * Created by ljunb on 2016/11/19.
 */
import * as types from '../../actions/actionTypes';

const initialState = {
    feedList: [],
    isLoading: true,
    isLoadMore: false,
};

let feedListReducer = (state = initialState, {type, payload})=>{

    switch (type) {
        case types.FEED_EVALUATING_LIST_FETCH_LIST:
            if (payload.page == 1) {
                return Object.assign({}, state, {
                    ...initialState,
                })
            } else {
                return Object.assign({}, state, {
                    isLoading: false,
                    isLoadMore: true
                })
            }
        case types.FEED_EVALUATING_LIST_RECEIVE_LIST:
            return Object.assign({}, state, {
                feedList: state.isLoadMore ? state.feedList.concat(payload.feedList) : payload.feedList,
                isLoading: false
            });
        default:
            return state
    }
}

export default feedListReducer;