/**
 * Created by ljunb on 16/5/8.
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/constants'

const NavigationBarItem = ({icon, onPress, type}) => {
    const style = type == 'left' ? styles.leftIcon : styles.rightIcon
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={style}
            onPress={onPress}
        >
            <Icon color="black" size={30} name={icon}/>
        </TouchableOpacity>
    )
}

const TitleBarItem = ({title, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.rightButton}
            onPress={onPress}
        >
            <Text style={styles.buttonTitleFont}>{title}</Text>
        </TouchableOpacity>
    )
}

const MenuItem = ({title, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.rightMenu}
            onPress={onPress}
        >
            <Text style={{color: 'gray', fontSize: 12}}>{title}</Text>
            <Image source={{uri: 'ic_food_ordering'}} style={{width: 16, height: 16}}/>
        </TouchableOpacity>
    )
}

export default class Header extends React.Component {

    render() {
        const {
            title, titleView,
            leftIcon, leftIconAction,
            rightIcon, rightIconAction,
            rightButton, rightButtonAction,
            rightMenu, rightMenuAction
        } = this.props

        const TitleView = titleView

        return (
            <View style={styles.navigationBarContainer}>
                <View style={styles.statusBar}/>
                {leftIcon && <NavigationBarItem icon={leftIcon} onPress={leftIconAction} type="left"/>}
                {title && <Text style={styles.title}>{title}</Text>}
                {titleView && <TitleView/>}
                {rightIcon && <NavigationBarItem icon={rightIcon} onPress={rightIconAction} type="right"/>}
                {rightButton && <TitleBarItem title={rightButton} onPress={rightButtonAction}/>}
                {rightMenu && <MenuItem title={rightMenu} onPress={rightMenuAction}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBarContainer: {
        height: 64,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: 1 / PixelRatio.get(),
        backgroundColor: 'white',
    },

    statusBar: {
        position: 'absolute',
        top: 0,
        height: 20,
        width: Common.window.width,
        backgroundColor: Common.colors.themeColor
    },

    title: {
        fontSize: 15,
    },

    leftIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        left: 0,
        top: 20
    },

    rightIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        right: 0,
        top: 20
    },

    rightButton: {
        position: 'absolute',
        right: 0,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTitleFont: {
        color: 'white',
        fontSize: 15,
    },

    rightMenu: {
        position: 'absolute',
        right: 15,
        top: 20,
        height: 44,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
})