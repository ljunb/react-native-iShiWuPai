/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    Navigator,
    View,
} from 'react-native';

import StatusBarIOS from '../components/StatusBarIOS';
import TabBarView from '../containers/TabBarView';

class App extends React.Component {
    render() {

        return (
            <View style={{flex: 1}}>
                <StatusBarIOS barStyle="light-content"/>
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