/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    Navigator,
    View,
    Platform,
    StatusBar
} from 'react-native';
import {observer} from 'mobx-react/native'
import TabBarView from '../containers/TabBarView';
import Splash from '../pages/Splash';
import RootStore from '../mobx'

@observer
class App extends React.Component {
    render() {
        const initialPage = Platform.OS === 'ios' ? TabBarView : Splash;
        const initialPageName = Platform.OS === 'ios' ? 'TabBarView' : 'Splash';

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={RootStore.barStyle}/>
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