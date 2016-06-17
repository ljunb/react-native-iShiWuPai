/**
 * Created by ljunb on 16/6/5.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    history: [],
    keywordsList: [],
    searchText: null,
    tags: [],
    searchResultList: [],
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
        case types.FETCH_SEARCH_RESULT_LIST:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_SEARCH_RESULT_LIST:
            return Object.assign({}, state, {
                tags: action.tags,
                searchResultList: action.searchResultList,
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
                tags: [],
            })
        default:
            return state;
    }
}

export default searchReducer;