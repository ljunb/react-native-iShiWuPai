/**
 * Created by ljunb on 16/5/26.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
} from 'react-native'
import RootStore from '../mobx'
import Feed from '../pages/feed/Feed'
import FoodEncyclopedia from '../pages/home/FoodEncyclopedia'
import Profile from '../pages/profile/Profile'
import TabBar from '../components/TabBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

const tabTitles = ['食物百科', '逛吃', '我的']
const tabIcons = [
    require('../resource/ic_tab_search.png'),
    require('../resource/ic_tab_homepage.png'),
    require('../resource/ic_tab_my.png')
]
const tabSelectedIcon = [
    require('../resource/ic_tab_search_select.png'),
    require('../resource/ic_tab_homepage_select.png'),
    require('../resource/ic_tab_my_select.png')
]

export default class TabBarView extends PureComponent {

    _onChangeTab = ({i}) => RootStore.barStyle = i == 1 ? 'default' : 'light-content'

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
                locked
                scrollWithoutAnimation
                onChangeTab={this._onChangeTab}
            >
                <FoodEncyclopedia tabLabel="Food" navigator={this.props.navigator}/>
                <Feed tabLabel="Home" navigator={this.props.navigator}/>
                <Profile tabLabel="Profile" navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}