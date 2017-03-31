/**
 * Created by ljunb on 16/5/26.
 */
import * as types from './actionTypes';
import Util from '../common/utils';
import Common from '../common/constants';

export let fetchFeedList = (page) => {
    let URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${page}&category=1&per=10`;

    return dispatch => {
        dispatch(fetchingFeedList(page));

        Util.get(URL, (response) => {
            dispatch(receiveFeedList(response.feeds, page));
        }, (error) => {
            console.log('Fetch category list error: ' + error);
            dispatch(receiveFeedList([]));
        });
    }
}

let fetchingFeedList = (page) => {
    return {
        type: types.FEED_HOME_LIST_FETCH_LIST,
        payload: {page}
    }
}

let receiveFeedList = (feedList, page) => {
    return {
        type: types.FEED_HOME_LIST_RECEIVE_LIST,
        payload: {feedList, page}
    }
};