/**
 * Created by ljunb on 2017/3/15.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'


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
            <Image style={{width: 18, height: 18}} source={icon} resizeMode={"contain"}/>
        </TouchableOpacity>
    )
}

export default class Header extends Component {
    static propTypes = {
        style: View.propTypes.style,
        title: React.PropTypes.string,
        showGoBack: React.PropTypes.bool,
        onBack: React.PropTypes.func,
        titleStyle: React.PropTypes.object,
        rightTitle: React.PropTypes.string,
        onRight: React.PropTypes.func,
        rightIcon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        renderRightItem: React.PropTypes.func
    }

    static defaultProps = {
        showGoBack: true
    }

    render() {
        const {
            title, titleStyle,
            showGoBack, onBack,
            style, rightTitle, onRight, rightIcon,
            renderRightItem
        } = this.props

        return (
            <View style={[styles.header, style]}>
                {showGoBack && <LeftItem onPress={onBack}/>}
                <Text style={[styles.title, titleStyle]}>{title || ''}</Text>
                {rightTitle && <RightItem text={rightTitle} onPress={onRight}/>}
                {rightIcon && <RightIconItem icon={rightIcon} onPress={onRight}/>}
                {renderRightItem &&
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={styles.renderRight}
                        onPress={onRight}
                    >
                        {renderRightItem()}
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: __ANDROID__ ? 50 : 64,
        width: gScreen.width,
        paddingTop: __ANDROID__ ? 0 : 20,
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
        top: __ANDROID__ ? 0 : 20,
        left: 0,
        height: __ANDROID__ ? 50 : 44,
        width: 60,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    rightItem: {
        position: 'absolute',
        top: __ANDROID__ ? 0 : 20,
        right: 0,
        height: __ANDROID__ ? 50 : 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightIconItem: {
        position: 'absolute',
        top: __ANDROID__ ? 0 : 20,
        right: 0,
        height: __ANDROID__ ? 50 : 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    renderRight: {
        position: 'absolute',
        top: __ANDROID__ ? 0 : 20,
        right: 0,
        height: __ANDROID__ ? 50 : 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})