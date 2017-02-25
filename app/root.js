/**
 * Created by ljunb on 16/5/25.
 */
import GlobalContants from './common/globalContants'
import React from 'react';
import {NetInfo, Animated, StyleSheet, View, Text, Platform} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store';
import Constants from './common/constants';
import NetInfoDecorator from './common/NetInfoDecorator'
import App from './containers/app';
global.Common = Constants;

@NetInfoDecorator
export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptPosition: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps
        // 无网络
        if (!isConnected) {
            Animated.timing(this.state.promptPosition, {
                toValue: 1,
                duration: 200
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(this.state.promptPosition, {
                        toValue: 0,
                        duration: 200
                    }).start()
                }, 2000);
            })
        }
    }

    render() {
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, Platform.OS === 'ios' ? 20 : 0]
        });
        return (
            <View style={{flex: 1}}>
                <Provider store={store}>
                    <App />
                </Provider>
                <Animated.View style={[styles.netInfoView, {top: positionY}]}>
                    <Text style={styles.netInfoPrompt}>网络异常，请检查网络稍后重试~</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    netInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: Constants.colors.themeColor
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold'
    }
});