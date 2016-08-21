/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Platform
} from 'react-native';
import Constants from '../common/constants';

export default class StatusBarIOS extends React.Component {
    render() {
        if (Platform.OS === 'android') return null;

        return (
            <View>
                <StatusBar {...this.props}/>
                <View style={styles.statusBar} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        flex: 1,
        height: 20,
        backgroundColor: Constants.colors.themeColor,
    }
})