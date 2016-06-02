/**
 * Created by ljunb on 16/6/2.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    foodsList: [],
    isLoading: true,
}

let foodsListReducer = (state = initialState, action)=> {
    
    switch (action.type) {
        case types.FETCH_FOODS_LIST:
            return Object.assign({}, state, {
                ...state,
            })
        case types.RECEIVE_FOODS_LIST: 
            return Object.assign({}, state, {
                foodsList: action.foodsList,
                isLoading: false,
            })
        default:
            return state
    }
}

export default foodsListReducer;