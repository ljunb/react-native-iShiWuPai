/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {
    TabBarIOS,
    View,
    Text,
} from 'react-native';
import Home from '../pages/feed/Feed';
import TabBar from '../components/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const tabTitles = ['逛吃', '食物百科', '我的'];
const tabIcons = [
    require('../resource/ic_tab_homepage.png'),
    require('../resource/ic_tab_search.png'),
    require('../resource/ic_tab_my.png')
];
const tabSelectedIcon = [
    require('../resource/ic_tab_homepage_select.png'),
    require('../resource/ic_tab_search_select.png'),
    require('../resource/ic_tab_my_select.png')
];

export default class TabBarView extends React.Component {
    render() {
        return (
            <ScrollableTabView
                renderTabBar={() =>
                    <TabBar
                        tabNames={tabTitles}
                        tabIconNames={tabIcons}
                        selectedTabIconNames={tabSelectedIcon}
                    />
                }
                tabBarPosition='bottom'
                locked={true}
                scrollWithoutAnimation={true}
            >
                <Home tabLabel="Home" navigator={this.props.navigator}/>
                <Text tabLabel="Search" navigator={this.props.navigator}>食物百</Text>
                <Text tabLabel="My" navigator={this.props.navigator}>我的</Text>
            </ScrollableTabView>
        )
    }
}