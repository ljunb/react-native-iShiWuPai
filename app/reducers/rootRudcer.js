/**
 * Created by ljunb on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';
import FoodCompare from './foodCompareReducer';
import FoodInfo from './foodInfoReducer';
import Search from './searchReducer';
import feedHome from './feed/feedHomeListReducer';

export default rootReducer = combineReducers({
    FoodCompare,
    FoodInfo,
    Search,
    feedHome,
})