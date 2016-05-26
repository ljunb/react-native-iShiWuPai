/**
 * Created by ljunb on 16/5/26.
 */
import * as types from './actionTypes';

export let showAction = ()=>{
    return {
        type: types.SHOW_MESSAGE
    };
}

export let hideAction = ()=>{
    return {
        type: types.HIDE_MESSAGE
    }
}