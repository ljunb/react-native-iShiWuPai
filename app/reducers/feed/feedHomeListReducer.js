/**
 * Created by ljunb on 16/5/26.
 */
import * as types from '../../actions/actionTypes';
import Common from '../../common/constants';

const initialState = {
    feedList: [],
    isLoading: true,
    heightArray: [140, 150, 140, 140, 150, 150, 150, 140, 160, 150],
    cachedArray: []
};

let feedListReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case types.FEED_HOME_LIST_FETCH_LIST:
            return Object.assign({}, state, {
                ...state,
            });
        case types.FEED_HOME_LIST_RECEIVE_LIST:
            let screenW = Common.window.width;
            let cacheHeight = [state.heightArray[0], state.heightArray[1]];

            let array = [];

            state.heightArray.map((height, i) => {
                let marginTop;
                if (i == 0 || i == 1) {
                    marginTop = 10;
                } else {
                    let chazhi = cacheHeight[0] - cacheHeight[1];
                    if (chazhi > 0) {
                        marginTop = 10;
                        // if (i % 2 == 1) {
                        //     marginTop = 10 - chazhi;
                        // }
                    } else {
                        marginTop = 10 + chazhi;
                    }

                    if (i % 2 == 0) {
                        cacheHeight[0] += height + 10;
                    } else {
                        cacheHeight[1] += height + 10;
                    }
                }
                array.push(marginTop)
            });
            return Object.assign({}, state, {
                isLoading: false,
                feedList: payload.feedList,
                cachedArray: array
            });
        default:
            return state
    }
}

export default feedListReducer;