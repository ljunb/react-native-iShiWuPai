/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    Navigator,
    View,
    Platform
} from 'react-native';

import StatusBarIOS from '../components/StatusBarIOS';
import TabBarView from '../containers/TabBarView';
import Splash from '../pages/Splash';

class App extends React.Component {
    render() {
        const initialPage = Platform.OS === 'ios' ? TabBarView : Splash;
        const initialPageName = Platform.OS === 'ios' ? 'TabBarView' : 'Splash';

        return (
            <View style={{flex: 1}}>
                <StatusBarIOS barStyle="light-content"/>
                <Navigator
                    initialRoute={{name: initialPageName, component: initialPage}}
                    configureScene={()=>{
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    }}
                />
            </View>
        )
    }
}

export default App;