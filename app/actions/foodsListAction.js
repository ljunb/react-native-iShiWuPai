/**
 * Created by ljunb on 16/6/2.
 */
import * as types from './actionTypes';
import Util from '../common/utils';

export let fetchFoods = (kind, value, order_by, page, order_asc, isLoadMore, isLoading)=> {

    let URL = 'http://food.boohee.com/fb/v1/foods?kind=' + kind + '&value=' + value + '&order_by=' + order_by + '&page=' + page + '&order_asc=' + order_asc;

    return dispatch => {
        dispatch(fetchFoodsList(isLoadMore, isLoading));

        Util.get(URL, (response) => {
            dispatch(receiveFoodsList(response.foods))
        }, (error) => {
            console.log('Fetch foods list error: ' + error);
            dispatch(receiveFoodsList([]))
        })
    }
}

let fetchFoodsList = (isLoadMore, isLoading)=> {
    return {
        type: types.FETCH_FOODS_LIST,
        isLoadMore: isLoadMore,
        isLoading: isLoading,
    }
}

let receiveFoodsList = (foods)=> {
    return {
        type: types.RECEIVE_FOODS_LIST,
        foodsList: foods,
    }
}

export let fetchSortTypes = ()=> {
    let URL = 'http://food.boohee.com/fb/v1/foods/sort_types';
    
    return dispatch => {
        dispatch(fetchSortTypesList());
        
        Util.get(URL, (response) => {
            dispatch(reveiveSortTypesList(response.types));
        }, (error) => {
            console.log('Fetch sort types error: ' + error);
            dispatch(reveiveSortTypesList([]))
        })
    }
}

let fetchSortTypesList = ()=> {
    return {
        type: types.FETCH_SORT_TYPES_LIST,
    }
}

let reveiveSortTypesList = (sortTypes)=> {
    return {
        type: types.RECEIVE_SORT_TYPES_LIST,
        sortTypesList: sortTypes,
    }
}