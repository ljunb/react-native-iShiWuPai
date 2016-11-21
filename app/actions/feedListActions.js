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

let _calculateContentHeight = (feedList) => {
    let array = [];
    let screenW = Common.window.width;
    let width = (screenW - 15 * 2 - 10) / 2;
    let cacheHeight = [];
    let maxH;

    feedList.map((feed, i) => {
        let data;
        // 默认高度
        let height = width + 30 + 50;
        if (feed.description.length != 0 && feed.description < 13) {
            height += 25;
        } else if (feed.description >= 13) {
            height += 40
        }

        if (i == 0) {
            data = {left: 15, top: 10, height: height}
            cacheHeight.push(height)
        } else if (i == 1) {
            data = {left: 15 + width + 10, top: 10, height}
            cacheHeight.push(height)
        } else {
            if (i % 2 == 0) {
                data = {left: 15, top: cacheHeight[0] + 10 + 10, height: height}
                cacheHeight[0] += height + 10;
            } else {
                data = {left: 15 + width + 10, top: cacheHeight[1] + 10 + 10, height: height}
                cacheHeight[1] += height + 10;
            }
        }
        array.push(data);

        if (i == feed.length - 1) maxH += height + 20;
    });

    if (cacheHeight[0] < cacheHeight[1]) {
        maxH += cacheHeight[1];
    } else {
        maxH += cacheHeight[0];
    }

    return {array, maxH}
}
