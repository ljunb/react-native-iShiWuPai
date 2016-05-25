/**
 * Created by ljunb on 16/5/25.
 */
import * as types from './actionTypes';

export function show() {
    return {
        type: types.SHOW_MESSAGE
    };
}

export function hide() {
    return {
        type: types.HIDE_MESSAGE
    }
}