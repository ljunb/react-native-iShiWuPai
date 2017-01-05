/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    Navigator,
    View,
    StatusBar
} from 'react-native';

import TabBarView from '../containers/TabBarView';

class App extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content"/>
                <Navigator
                    initialRoute={{name: 'TabBarView', component: TabBarView}}
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