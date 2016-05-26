/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    View,
} from 'react-native';

import StatusBarIOS from '../components/StatusBarIOS';
import TabBarView from '../containers/TabBarView';

class App extends React.Component {
    render() {

        return (
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default App;