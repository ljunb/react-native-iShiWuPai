/**
 * Created by ljunb on 16/6/5.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    history: [],
    keywordsList: [],
    isShowSearchResult: false,
    searchText: null,
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
                history: action.history,
            })
        case types.SELECT_KEYWORD:
            return Object.assign({}, state, {
                searchText: action.searchText,
            })
        case types.SETUP_SEARCH_TEXT:
            return Object.assign({}, state, {
                searchText: action.searchText,
            })
        case types.CACHE_HISTORY:
            return Object.assign({}, state, {
                history: action.history,
            })
        case types.CLEAR_HISTORY:
            return Object.assign({}, state, {
                history: []
            })
        case types.RESET_SEARCH_STATE:
            return Object.assign({}, state, {
                searchText: null,
            })
        default:
            return state
    }
}

export default searchReducer;