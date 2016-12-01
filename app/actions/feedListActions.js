/**
 * Created by ljunb on 16/5/26.
 */
import * as types from './actionTypes';
import Util from '../common/utils';
import Common from '../common/constants';

export let fetchFeedList = (category, page) => {
    let URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${page}&category=${category}&per=10`;

    return dispatch => {
        dispatch(fetchingFeedList(category, page));

        Util.get(URL, (response) => {
            dispatch(receiveFeedList(response.feeds, category, page));
        }, (error) => {
            console.log('Fetch category list error: ' + error);
            dispatch(receiveFeedList([]));
        });
    }
}

let fetchingFeedList = (category, page) => {
    let type;
    switch (category) {
        case 1:
            type = types.FEED_HOME_LIST_FETCH_LIST;
            break;
        case 2:
            type = types.FEED_EVALUATING_LIST_FETCH_LIST;
            break;
        case 3:
            type = types.FEED_KNOWLEDGE_LIST_FETCH_LIST;
            break;
        case 4:
            type = types.FEED_DELICACY_LIST_FETCH_LIST;
            break
    }
    return {
        type,
        payload: {page}
    }
}

let receiveFeedList = (feedList, category, page) => {
    let type;
    switch (category) {
        case 1:
            type = types.FEED_HOME_LIST_RECEIVE_LIST;
            break;
        case 2:
            type = types.FEED_EVALUATING_LIST_RECEIVE_LIST;
            break;
        case 3:
            type = types.FEED_KNOWLEDGE_LIST_RECEIVE_LIST;
            break;
        case 4:
            type = types.FEED_DELICACY_LIST_RECEIVE_LIST;
            break
    }
    return {
        type,
        payload: {feedList, page}
    }
};