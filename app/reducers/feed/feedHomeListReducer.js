/**
 * Created by ljunb on 16/5/26.
 */
import * as types from '../../actions/actionTypes';
import Common from '../../common/constants';

const initialState = {
    feedList: [],
    isLoading: true,
    isLoadMore: false,
    cachedArray: [],
    cachedHeights: [],
    maxHeight: 0
};

let feedListReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case types.FEED_HOME_LIST_FETCH_LIST:
            if (payload.page == 1) {
                return Object.assign({}, state, {
                    ...initialState,
                    cachedHeights: []
                })
            } else {
                return Object.assign({}, state, {
                    isLoading: false,
                    isLoadMore: true
                })
            }
        case types.FEED_HOME_LIST_RECEIVE_LIST:

            let array = [];
            let screenW = Common.window.width;
            let width = (screenW - 15 * 2 - 10) / 2;
            let cacheHeight = state.cachedHeights;
            let maxH = 0;

            if (payload.page == 1) {
                payload.feedList.map((feed, i) => {
                    let data;
                    // 默认高度
                    let height = width + 50;
                    let titleHeight = 30;

                    if (feed.description) {
                        if (feed.description.length != 0 && feed.description.length < 13) {
                            titleHeight += 25;
                        } else if (feed.description.length >= 13) {
                            titleHeight += 40
                        }
                    }
                    height += titleHeight;

                    if (feed.content_type != 5) height = width + 50;

                    if (i == 0) {
                        data = {left: 15, top: 10, height: height, titleHeight}
                        cacheHeight.push(height)
                    } else if (i == 1) {
                        data = {left: 15 + width + 10, top: 10, height, titleHeight}
                        cacheHeight.push(height)
                    } else {
                        if (cacheHeight[0] < cacheHeight[1]) {
                            data = {left: 15, top: cacheHeight[0] + 10 + 10, height: height, titleHeight}
                            cacheHeight[0] += height + 10;
                        } else {
                            data = {left: 15 + width + 10, top: cacheHeight[1] + 10 + 10, height: height, titleHeight};
                            cacheHeight[1] += height + 10;
                        }
                    }
                    array.push(data);
                });
            } else {
                payload.feedList.map((feed, i) => {
                    let data;
                    // 默认高度
                    let height = width + 50;
                    let titleHeight = 30;

                    if (feed.description) {
                        if (feed.description.length != 0 && feed.description.length < 13) {
                            titleHeight += 25;
                        } else if (feed.description.length >= 13) {
                            titleHeight += 40
                        }
                    }
                    height += titleHeight;
                    if (feed.content_type != 5) height = width + 50;

                    if (cacheHeight[0] < cacheHeight[1]) {
                        data = {left: 15, top: cacheHeight[0] + 10 + 10, height: height, titleHeight}
                        cacheHeight[0] += height + 10;
                    } else {
                        data = {left: 15 + width + 10, top: cacheHeight[1] + 10 + 10, height: height, titleHeight};
                        cacheHeight[1] += height + 10;
                    }

                    array.push(data);
                });
            }

            if (cacheHeight[0] < cacheHeight[1]) {
                maxH += cacheHeight[1] + 10;
            } else {
                maxH += cacheHeight[0] + 10;
            }

            return Object.assign({}, state, {
                isLoading: false,
                feedList: state.isLoadMore ? state.feedList.concat(payload.feedList) : payload.feedList,
                cachedArray: state.isLoadMore ? state.cachedArray.concat(array) : array,
                maxHeight: maxH,
                cachedHeights: cacheHeight
            });
        default:
            return state
    }
}

export default feedListReducer;