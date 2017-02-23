/**
 * Created by ljunb on 16/5/25.
 */
import React, {PureComponent} from 'react'
import {
    Navigator,
    View,
    Platform,
    StatusBar
} from 'react-native';
import {observer} from 'mobx-react/native'
import TabBarView from '../containers/TabBarView'
import Splash from '../pages/Splash'
import RootStore from '../mobx'

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
                <StatusBar barStyle={RootStore.barStyle}/>
                <Navigator
                    initialRoute={{name: initialPageName, component: initialPage}}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                />
            </View>
        )
    }
}