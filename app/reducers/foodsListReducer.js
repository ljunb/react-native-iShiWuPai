/**
 * Created by ljunb on 16/6/2.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    foodsList: [],
    isLoading: true,
    isLoadMore: false,
    sortTypesList: [],
}

let foodsListReducer = (state = initialState, action)=> {
    
    switch (action.type) {
        case types.FETCH_FOODS_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
            })
        case types.RECEIVE_FOODS_LIST: 
            return Object.assign({}, state, {
                foodsList: state.isLoadMore ? state.foodsList.concat(action.foodsList) : action.foodsList,
                isLoading: false,
            })
        case types.FETCH_SORT_TYPES_LIST:
            return Object.assign({}, state, {
                ...state,
            })
        case types.RECEIVE_SORT_TYPES_LIST: 
            return Object.assign({}, state, {
                sortTypesList: action.sortTypesList,
            })
        default:
            return state
    }
}

export default foodsListReducer;