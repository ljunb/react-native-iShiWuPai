/**
 * Created by ljunb on 16/6/2.
 */
import * as types from './actionTypes';
import Util from '../common/utils';

export let fetchFoods = (kind, value, order_by, page, order_asc)=> {

    let URL = 'http://food.boohee.com/fb/v1/foods?kind=' + kind + '&value=' + value + '&order_by=' + order_by + '&page=' + page + '&order_asc=' + order_asc;

    return dispatch => {
        dispatch(fetchFoodsList());

        Util.get(URL, (response) => {
            dispatch(receiveFoodsList(response.foods))
        }, (error) => {
            console.log('Fetch foods list error: ' + error);
            dispatch(receiveFoodsList([]))
        })
    }
}

let fetchFoodsList = ()=> {
    return {
        type: types.FETCH_FOODS_LIST,
    }
}

let receiveFoodsList = (foods)=> {
    return {
        type: types.RECEIVE_FOODS_LIST,
        foodsList: foods,
    }
}