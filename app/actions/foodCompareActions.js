/**
 * Created by ljunb on 16/6/5.
 */
import * as types from './actionTypes';

export let clearCompareFood = (position)=> {
    return {
        type: types.CLEAR_COMPARE_FOOD,
        position: position
    }
}

export let resetState = ()=> {
    return { type: types.FOOD_COMPARE_RESET_STATE }
}