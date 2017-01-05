/**
 * Created by ljunb on 16/5/27.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio
} from 'react-native';
import Common from '../common/constants';

export default class SearchHeader extends React.Component {
    render() {
        const {searchAction, scanAction} = this.props

        return (
            <View style={styles.navigationBar}>
                <View style={styles.statusBar}/>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={styles.searchInput}
                        onPress={searchAction}
                    >
                        <Image
                            style={styles.searchIcon}
                            source={{uri: 'ic_input_search'}}
                        />
                        <Text style={styles.searchPlaceholder}>请输入食物名称</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={scanAction}
                    >
                        <Image
                            style={styles.scanIcon}
                            source={{uri: 'ic_homepage_scan'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1 / PixelRatio.get(),
        height: 64
    },

    statusBar: {
        height: 20,
        width: Common.window.width,
        backgroundColor: Common.colors.themeColor
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row'
    },

    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: Common.window.width - 30 - 6 * 3,
        margin: 6,
        padding: 10,
        backgroundColor: 'rgb(245, 246, 247)',
        borderRadius: 2,
    },

    searchIcon: {
        width: 20,
        height: 20,
    },

    scanIcon: {
        width: 30,
        height: 30,
    },

    searchPlaceholder: {
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 15,
        color: 'gray'
    }
})