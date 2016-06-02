/**
 * Created by ljunb on 16/5/26.
 */
import * as types from './actionTypes';
import Util from '../common/utils';

export let fetchCategories = ()=>{
    let URL = 'http://food.boohee.com/fb/v1/categories/list';

    return dispatch => {
        dispatch(fetchCategoryList());

        Util.get(URL, (response) => {
            dispatch(receiveCategoryList(response.group));
        }, (error) => {
            console.log('Fetch category list error: ' + error);
            dispatch(receiveCategoryList([])); 
        });
    }
}

let fetchCategoryList = ()=> {
    return {
        type: types.FETCH_CATEGORY_LIST,
    }
}

let receiveCategoryList = (categoryList)=> {
    return {
        type: types.RECEIVE_CATEGORY_LIST,
        categoryList: categoryList,
    }
}