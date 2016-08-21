/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {
    TabBarIOS,
    View,
    Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StrollingContainer from '../containers/StrollingContainer';
import FoodsContainer from '../containers/FoodsContainer';
import UserContainer from '../containers/UserContainer';
import Constants from '../common/constants';
import Home from '../pages/Home';
import TabBar from '../components/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const tabTitles = ['逛吃', '食物百科', '商店', '我的'];
const tabIcons = [
    require('../resource/ic_tab_homepage.png'),
    require('../resource/ic_tab_search.png'),
    require('../resource/ic_tab_shop.png'),
    require('../resource/ic_tab_my.png')
];
const tabSelectedIcon = [
    require('../resource/ic_tab_homepage_select.png'),
    require('../resource/ic_tab_search_select.png'),
    require('../resource/ic_tab_shop_select.png'),
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
                <Home tabLabel="Home" />
                <Text tabLabel="search">食物百科</Text>
                <Text tabLabel="shop">商店</Text>
                <Text tabLabel="my">我的</Text>
            </ScrollableTabView>
        )
    }
}