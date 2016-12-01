/**
 * Created by ljunb on 16/12/1.
 */
import React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class LoadMoreFooter extends React.Component {
    render() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
                <Text style={styles.title}>正在加载更多的数据...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 14,
        marginLeft: 5,
        color: 'gray'
    }
})