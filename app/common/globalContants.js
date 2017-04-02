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
    theme: 'rgb(217, 51, 58)',
    background: '#f5f5f5',
    border: '#d5d5d5',
    healthGreen: 'rgb(142, 213, 7)',
    healthYellow: 'rgb(254, 210, 10)',
    healthRed: 'rgb(251, 25, 8)'
}

global.gSortTypeUnitMapper = {
    'calory': '千卡',
    'protein': '克',
    'fat': '克',
    'carbohydrate': '克',
    'fiber_dietary': '克',
    'vitamin_a': 'IU',
    'vitamin_c': '毫克',
    'vitamin_e': '毫克',
    'carotene': '毫克',
    'thiamine': '毫克',
    'lactoflavin': '毫克',
    'niacin': '毫克',
    'cholesterol': '毫克',
    'magnesium': '毫克',
    'calcium': '毫克',
    'iron': '毫克',
    'zinc': '毫克',
    'copper': '毫克',
    'manganese': '毫克',
    'kalium': '毫克',
    'phosphor': '毫克',
    'natrium': '毫克',
    'selenium': '毫克',
    'iodine': '毫克'
}