/**
 * Created by ljunb on 2017/2/25.
 */
import { Dimensions, Platform, PixelRatio } from 'react-native'

global.gScreen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    navBarHeight: Platform.OS === 'ios' ? 64 : 50,
    navBarPaddingTop: Platform.OS === 'ios' ? 20 : 0,
    onePix: 1 / PixelRatio.get(),
    isIOS: Platform.OS === 'ios'
}

global.gColors = {
    themColor: 'rgb(217, 51, 58)',
    bgColor: '#f5f5f5',
    borderColor: '#d5d5d5'
}