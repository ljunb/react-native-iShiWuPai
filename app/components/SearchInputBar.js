/**
 * Created by ljunb on 16/6/12.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    PixelRatio
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/constants';

export default class SearchInputBar extends React.Component {
    render() {
        const {backAction, searchAction} = this.props
        return (
            <View style={styles.navigationBar}>
                <View style={styles.statusBar}/>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={backAction}
                >
                    <Icon name="angle-left" size={30} color="black"/>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder='请输入食物名称'
                    {...this.props}
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    activeOpacity={0.75}
                    onPress={searchAction}
                >
                    <Image style={{height: 20, width: 20}} source={{uri: 'ic_homepage_search'}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        height: 64,
        paddingTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: 1 / PixelRatio.get(),
        backgroundColor: 'white',
        flexDirection: 'row'
    },

    leftIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },

    textInput: {
        width: Common.window.width * 0.7,
        height: 30,
        marginTop: 9,
        paddingLeft: 5,
        fontSize: 14,
    },

    searchIcon: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },

    statusBar: {
        position: 'absolute',
        top: 0,
        height: 20,
        width: Common.window.width,
        backgroundColor: Common.colors.themeColor
    },
})