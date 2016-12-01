/**
 * Created by ljunb on 16/8/21.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import HomeNavigation from '../../components/HomeNavigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FeedsCategoryBar from '../../components/FeedsCategoryBar';
import FeedHomeListContainer from '../../containers/feed/FeedHomeListContainer';
import FeedEvaluatingListContainer from '../../containers/feed/FeedEvaluatingListContainer';
import FeedKnowledgeListContainer from '../../containers/feed/FeedKnowledgeListContainer';
import FeedDelicacyListContainer from '../../containers/feed/FeedDelicacyListContainer';

const titles = ['首页', '评测', '知识', '美食'];
const controllers = [
    {categoryId: 1, controller: FeedHomeListContainer},
    {categoryId: 2, controller: FeedEvaluatingListContainer},
    {categoryId: 3, controller: FeedKnowledgeListContainer},
    {categoryId: 4, controller: FeedDelicacyListContainer}
]

export default class Home extends Component {
    render() {
        const {navigator} = this.props;

        return (
            <View style={{flex: 1}}>
                <HomeNavigation
                    titleView={() =>
                        <Image
                            style={{width: 60, height: 30}}
                            source={require('../../resource/ic_feed_nav.png')}
                            resizeMode="contain"
                        />
                    }
                    leftIcon={require('../../resource/ic_feed_search.png')}
                    leftIconAction={() => {
                    }}
                    rightIcon={require('../../resource/ic_feed_camera.png')}
                    rightIconAction={() => {
                    }}
                />
                <ScrollableTabView
                    renderTabBar={() => <FeedsCategoryBar tabNames={titles}/>}
                    tabBarPosition='top'
                    scrollWithoutAnimation={false}
                >
                    {controllers.map((data, index) => {
                        let Component = data.controller;
                        return (
                            <Component
                                key={titles[index]}
                                tabLabel={titles[index]}
                                categoryId={data.categoryId}
                                navigator={navigator}
                            />
                        )
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}