/**
 * Created by ljunb on 16/6/5.
 */
import * as types from './actionTypes';
import Util from '../common/utils';

export let fetchKeywords = ()=> {

    let URL = 'http://food.boohee.com/fb/v1/keywords';
    
    return dispatch => {
        dispatch(fetchKeywordsList());
        
        Util.get(URL, (response) => {
            alert(response.keywords)
            dispatch(receiveKeywordsList(response.keywords))
        }, (error) => {
            console.log('Fetch keywords error: ' + error);
            dispatch(receiveKeywordsList([]));
        })
    }
}

let fetchKeywordsList = ()=> {
    return {
        type: types.FETCH_KEYWORDS_LIST,
    }
}

let receiveKeywordsList = (keywords)=> {
    return {
        type: types.RECEIVE_KEYWORDS_LIST,
        keywordsList: keywords,
    }
}