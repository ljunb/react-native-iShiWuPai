/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from 'react';
import { Image } from 'react-native';
import TabBarView from '../containers/TabBarView';
import Constant from '../common/constants';

export default class Splash extends React.Component {
    componentDidMount() {
        const { navigator } = this.props;
        this.timer = setTimeout(() => {
            navigator.resetTo({
                component: TabBarView,
                name: 'TabBarView'
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Image
                style={{
                    width: Constant.window.width,
                    height: Constant.window.height
                }}
                source={require('../resource/img_intro_4.png')}
            />
        );
    }
}