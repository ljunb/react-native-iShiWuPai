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
    Platform
} from 'react-native';

import Common from '../common/constants';

export default class SearchInputBar extends React.Component {
    render() {
        return (
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.backIcon}
                    onPress={this.props.backAction}
                >
                    <Image style={{width: 24, height: 24}} source={require('../resource/ic_back_search.png')}/>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder='请输入食物名称'
                    underlineColorAndroid="transparent"
                    {...this.props}
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    activeOpacity={0.75}
                    onPress={this.props.searchAction}
                >
                    <Image style={{height: 24, width: 24}} source={require('../resource/ic_input_search.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 64 : 50,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: Common.window.onePR,
        backgroundColor: 'white',
    },

    textInput: {
        width: Common.window.width - 15 - 30 - 20,
        height: 40,
        paddingLeft: 5,
        marginLeft: 5,
        marginTop: 2,
        fontSize: 14,
    },

    backIcon: {
        position: 'absolute',
        left: 0,
        top: Platform.OS === 'ios' ? 20 : 0,
        width: Platform.OS === 'ios' ? 44 : 50,
        height: Platform.OS === 'ios' ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchIcon: {
        position: 'absolute',
        right: 0,
        top: Platform.OS === 'ios' ? 20 : 0,
        width: Platform.OS === 'ios' ? 44 : 50,
        height: Platform.OS === 'ios' ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})