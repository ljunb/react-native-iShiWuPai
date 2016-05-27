/**
 * Created by ljunb on 16/5/26.
 */
import { Dimensions } from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

let colors = {
    themeColor: 'rgb(217, 51, 58)',
}

export default {
    window: window,
    colors: colors,
}