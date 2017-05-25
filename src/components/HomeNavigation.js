/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

export default class HomeNavigation extends Component {

    render() {
        let NavigationBar = [];

        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                >
                    <Image style={{height: this.props.leftIconSize || 20, width: this.props.leftIconSize || 20}} source={this.props.leftIcon} resizeMode={'contain'}/>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <Text key={'title'} style={styles.title}>{this.props.title}</Text>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;

            NavigationBar.push(
                <Component key={'titleView'}/>
            )
        }

        // 右边图片按钮
        if (this.props.rightIcon != undefined) {

            NavigationBar.push(
                <TouchableOpacity
                    key={'rightIcon'}
                    activeOpacity={0.75}
                    style={styles.rightIcon}
                    onPress={this.props.rightIconAction}
                >
                    <Image style={{height: this.props.rightIconSize || 20, width: this.props.rightIconSize || 20}} source={this.props.rightIcon} resizeMode={'contain'}/>
                </TouchableOpacity>
            )
        }

        // 右边文字按钮
        if (this.props.rightButton != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightButton'}
                    activeOpacity={0.75}
                    style={styles.rightButton}
                    onPress={this.props.rightButtonAction}
                >
                    <Text style={styles.buttonTitleFont}>{this.props.rightButton}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 64 : 50,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    title: {
        fontSize: 16,
        marginLeft: 15,
        color: 'black'
    },

    leftIcon: {
        height: Platform.OS === 'ios' ? 44 : 50,
        width: Platform.OS === 'ios' ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 0,
        left: 0
    },

    rightIcon: {
        height: Platform.OS === 'ios' ? 44 : 50,
        width: Platform.OS === 'ios' ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 0,
        right: 0
    },

    rightButton: {
        position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    buttonTitleFont: {
        color: 'white',
        fontSize: 15,
    },
})