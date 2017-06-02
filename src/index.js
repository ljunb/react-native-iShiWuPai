/**
 * Created by ljunb on 2017/5/25.
 */
import React, {PureComponent} from 'react'
import {
    View,
    StatusBar
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import {observer, inject} from 'mobx-react/native'
import Router from './common/Routers'

@inject('app')
@observer
export default class App extends PureComponent {

    configureScene = route => {
        if (route.sceneConfig) return route.sceneConfig

        return {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures: {}    // 禁用左滑返回手势
        }
    }

    renderScene = (route, navigator) => {
        let Component = Router[route.id].default
        return <Component navigator={navigator} {...route.passProps}/>
    }

    render() {
        const initialPage = __IOS__ ? 'TabBarView' : 'Splash'
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={this.props.app.barStyle} animated />
                <Navigator
                    initialRoute={{id: initialPage}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                />
            </View>
        )
    }
}