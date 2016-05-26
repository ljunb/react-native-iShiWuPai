/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {
    TabBarIOS,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import StrollingContainer from '../containers/StrollingContainer';
import FoodsContainer from '../containers/FoodsContainer';
import UserContainer from '../containers/UserContainer';

const tabBarItems = [
    {title: '逛吃', icon: 'ic_tab_homepage', selectedIcon: 'ic_tab_homepage_select', component: StrollingContainer},
    {title: '食物百科', icon: 'ic_tab_search', selectedIcon: 'ic_tab_search_select',component: FoodsContainer},
    {title: '我的', icon: 'ic_tab_my', selectedIcon: 'ic_tab_my_select',component: UserContainer},
]

export default class TabBarView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }

    render() {
        return (
            <TabBarIOS tintColor='red'>
                {
                    tabBarItems.map((controller, i) => {

                        let Component = controller.component;

                        return (
                            <TabBarIOS.Item
                                key={i}
                                title={controller.title}
                                icon={{uri: controller.icon}}
                                selectedIcon={{uri: controller.selectedIcon}}
                                selected={this.state.selectedTab === controller.title}
                                onPress={() => {
                                    this.setState({
                                       selectedTab: controller.title
                                    })
                                }}
                            >
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabBarIOS.Item>
                        )
                    })
                }
            </TabBarIOS>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})