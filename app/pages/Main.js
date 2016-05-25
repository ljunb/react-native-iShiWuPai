/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

export default class Main extends React.Component {

    render() {
        const { show, hide, isShow } = this.props;

        return (
            <TouchableOpacity
                style = {styles.container}
                onPress={isShow ? hide : show}
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