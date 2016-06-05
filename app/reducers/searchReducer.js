/**
 * Created by ljunb on 16/6/5.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    keywordsList: [],
}

let searchReducer = (state = initialState, action)=> {

    switch (action.type) {
        case types.FETCH_KEYWORDS_LIST:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_KEYWORDS_LIST:
            return Object.assign({}, state, {
                keywordsList: action.keywordsList,
            })
        default:
            return state
    }
}

export default searchReducer;