/**
 * Created by ljunb on 16/8/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Constant from '../common/constants';
import HomeNavigation from '../components/HomeNavigation';
import ShareView from '../components/ShareView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FeedsCategoryBar from '../components/FeedsCategoryBar';
import FeedList from '../containers/feed/FeedHomeListContainer';
import FeedEvaluatingListContainer from '../containers/feed/FeedEvaluatingListContainer';
import FeedKnowledgeListContainer from '../containers/feed/FeedKnowledgeListContainer';
import FeedDelicacyListContainer from '../containers/feed/FeedDelicacyListContainer';

const titles = ['首页', '评测', '知识', '美食'];

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTitle: '逛吃'
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HomeNavigation
                    titleView={() =>
                        <Image
                            style={{width: 60, height: 30}}
                            source={require('../resource/ic_feed_nav.png')}
                            resizeMode="contain"
                        />
                    }
                    leftIcon={require('../resource/ic_feed_search.png')}
                    leftIconAction={() => this.refs['ShareView'].share('分享到朋友圈')}
                    rightIcon={require('../resource/ic_feed_camera.png')}
                    rightIconAction={() => this.refs['ShareView'].close()}
                />
                <ScrollableTabView
                    renderTabBar={() => <FeedsCategoryBar tabNames={titles}/>}
                    style={{height: Constant.window.height - 64 - 49, width: Constant.window.width}}
                    tabBarPosition='top'
                    scrollWithoutAnimation={true}
                >
                    <FeedList categoryId={1} key="首页" tabLabel="首页"/>
                    <FeedEvaluatingListContainer categoryId={2} key="评测" tabLabel="评测"/>
                    <FeedKnowledgeListContainer categoryId={3} key="知识" tabLabel="知识"/>
                    <FeedDelicacyListContainer categoryId={4} key="美食" tabLabel="美食"/>
                </ScrollableTabView>
                <ShareView ref="ShareView"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    titleContainer: {
        height: 40,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#ccc'
    },

    title: {
        width: Constant.window.width / 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})