/**
 * Created by ljunb on 2017/3/15.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'

const isAndroid = Platform.OS === 'android'
const screenW = Dimensions.get('window').width

const LeftItem = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.leftItem}
            onPress={onPress}
        >
            <Image style={{width: 20, height: 20}}
                   source={require('../resource/ic_back_dark.png')}
                   resizeMode={"contain"}
            />
        </TouchableOpacity>
    )
}

const RightItem = ({onPress, text}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.rightItem}
            onPress={onPress}
        >
            <Text style={{fontSize: 15, color: '#666666'}}>{text}</Text>
        </TouchableOpacity>
    )
}

const RightIconItem = ({onPress, icon}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.rightIconItem}
            onPress={onPress}
        >
            <Image style={{width: 20, height: 20}} source={icon} resizeMode={"contain"}/>
        </TouchableOpacity>
    )
}

export default class AMHeader extends Component {
    render() {
        const {
            title, titleStyle,
            showGoBack, backAction,
            style, rightTitle, rightAction, rightIcon,
            renderRightItem
        } = this.props

        return (
            <View style={[styles.header, style]}>
                {showGoBack && <LeftItem onPress={backAction}/>}
                <Text style={[styles.title, titleStyle]}>{title || ''}</Text>
                {rightTitle && <RightItem text={rightTitle} onPress={rightAction}/>}
                {rightIcon && <RightIconItem icon={rightIcon} onPress={rightAction}/>}
                {renderRightItem &&
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={styles.renderRight}
                        onPress={rightAction}
                    >
                        {renderRightItem()}
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

AMHeader.defaultProps = {
    showGoBack: true
}

AMHeader.propTypes = {
    style: React.PropTypes.any,
    title: React.PropTypes.string,
    showGoBack: React.PropTypes.bool,
    backAction: React.PropTypes.func,
    titleStyle: React.PropTypes.object,
    rightTitle: React.PropTypes.string,
    rightAction: React.PropTypes.func,
    rightIcon: React.PropTypes.any,
    renderRightItem: React.PropTypes.func
}

const styles = StyleSheet.create({
    header: {
        height: isAndroid ? 50 : 64,
        width: screenW,
        paddingTop: isAndroid ? 0 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: gColors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        color: '#666',
        fontSize: 18,
    },
    leftItem: {
        position: 'absolute',
        top: isAndroid ? 0 : 20,
        left: 0,
        height: isAndroid ? 50 : 44,
        width: 60,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    rightItem: {
        position: 'absolute',
        top: isAndroid ? 0 : 20,
        right: 0,
        height: isAndroid ? 50 : 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightIconItem: {
        position: 'absolute',
        top: isAndroid ? 0 : 20,
        right: 0,
        height: isAndroid ? 50 : 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    renderRight: {
        position: 'absolute',
        top: isAndroid ? 0 : 20,
        right: 0,
        height: isAndroid ? 50 : 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})