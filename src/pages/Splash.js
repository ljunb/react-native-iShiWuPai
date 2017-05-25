/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from 'react'
import { Image } from 'react-native'
import TabBarView from './TabBarView'

export default class Splash extends Component {
    componentDidMount() {
        const { navigator } = this.props
        this.timer = setTimeout(() => {
            navigator.resetTo({
                component: TabBarView,
                name: 'TabBarView'
            })
        }, 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <Image
                style={{width: gScreen.width, height: gScreen.height}}
                source={require('../resource/img_intro_4.png')}
            />
        )
    }
}