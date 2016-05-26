/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Navigator,
} from 'react-native';

export default class Main extends React.Component {

    render() {
        const { hideAction, showAction } = this.props.actions;
        const { isShow } = this.props.state;
        return (
            <TouchableOpacity
                style = {styles.container}
                onPress={isShow ? hideAction : showAction}
            >
                <Text>{isShow ? 'Show, Redux!' : 'Hide, Redux!'}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})