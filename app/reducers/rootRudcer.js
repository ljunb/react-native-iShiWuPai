/**
 * Created by ljunb on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';
import Strolling from './strollingReducer';
import Foods from './foodsReducer';
import FoodsList from './foodsListReducer';
import FoodCompare from './foodCompareReducer';
import Search from './searchReducer';
import User from './userReducer';

export default rootReducer = combineReducers({
    Strolling,
    Foods,
    FoodsList,
    FoodCompare,
    Search,
    User,
})