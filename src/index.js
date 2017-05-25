/**
 * Created by ljunb on 2017/5/25.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Platform,
    StatusBar
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import {observer, inject} from 'mobx-react/native'
import TabBarView from './pages/TabBarView'
import Splash from './pages/Splash'

@inject('app')
@observer
export default class App extends PureComponent {

    _configureScene = route => {
        if (route.sceneConfig) return route.sceneConfig

        return {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures: {}    // 禁用左滑返回手势
        }
    }

    _renderScene = (route, navigator) => {
        let Component = route.component
        return <Component navigator={navigator}{...route.passProps}/>
    }

    render() {
        const initialPage = Platform.OS === 'ios' ? TabBarView : Splash
        const initialPageName = Platform.OS === 'ios' ? 'TabBarView' : 'Splash'

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={this.props.app.barStyle} animated/>
                <Navigator
                    initialRoute={{name: initialPageName, component: initialPage}}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                />
            </View>
        )
    }
}