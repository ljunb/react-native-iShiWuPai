/**
 * Created by ljunb on 16/6/5.
 */
import * as types from './actionTypes';
import Util from '../common/utils';
import UserDefaults from '../common/UserDefaults';
import Common from '../common/constants';

export let fetchKeywords = ()=> {

    let URL = 'http://food.boohee.com/fb/v1/keywords';

    return dispatch => {
        dispatch(fetchKeywordsList());

        Util.get(URL, (response) => {
            // 已缓存的搜索记录
            UserDefaults.cachedObject(Common.storeKeys.SEARCH_HISTORY_KEY)
                .then((historyKeywords)=> {
                    let history = historyKeywords ? historyKeywords : [];

                    dispatch(receiveKeywordsList(history, response.keywords));

                });
        }, (error) => {
            console.log('Fetch keywords error: ' + error);
            dispatch(receiveKeywordsList([], []));
        })
    }
}

let fetchKeywordsList = ()=> {
    return {
        type: types.FETCH_KEYWORDS_LIST,
    }
}

let receiveKeywordsList = (history, keywords)=> {
    return {
        type: types.RECEIVE_KEYWORDS_LIST,
        history: history,
        keywordsList: keywords,
    }
}

export let selectKeyword = (keyword)=> {

    return dispatch => {
        dispatch(setupSearchText(keyword))
        
        // 已缓存的搜索记录
        UserDefaults.cachedObject(Common.storeKeys.SEARCH_HISTORY_KEY)
            .then((historyKeywords)=> {

                let history = historyKeywords ? historyKeywords : [];

                if (history.indexOf(keyword) != -1) return;
                
                history.push(keyword);

                UserDefaults.setObject(Common.storeKeys.SEARCH_HISTORY_KEY, history);

                dispatch(cacheHistory(history))
            });
    }
}

export let resetState = ()=> {
    return {
        type: types.RESET_SEARCH_STATE,
    }
}

export let setupSearchText = (text)=> {
    return {
        type: types.SETUP_SEARCH_TEXT,
        searchText: text,
    }
}

// 添加搜索记录
let cacheHistory = (history)=> {
    return {
        type: types.CACHE_HISTORY,
        history: history,
    }
}

// 清除搜索历史
export let clearHistory = ()=> {
    UserDefaults.clearCachedObject(Common.storeKeys.SEARCH_HISTORY_KEY);
    
    return {
        type: types.CLEAR_HISTORY,
    }
}