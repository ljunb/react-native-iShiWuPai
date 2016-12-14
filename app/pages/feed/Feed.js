/**
 * Created by ljunb on 16/8/21.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FeedsCategoryBar from '../../components/FeedsCategoryBar';
import FeedHomeListContainer from '../../containers/feed/FeedHomeListContainer';
import FeedEvaluatingListContainer from '../../containers/feed/FeedEvaluatingListContainer';
import FeedKnowledgeListContainer from '../../containers/feed/FeedKnowledgeListContainer';
import FeedDelicacyListContainer from '../../containers/feed/FeedDelicacyListContainer';
// import FeedHomeList from '../../pages/feed/FeedHomeList';
// import FeedEvaluatingList from '../../pages/feed/FeedEvaluatingList';
// import FeedKnowledgeList from '../../pages/feed/FeedKnowledgeList';
// import FeedDelicacyList from '../../pages/feed/FeedDetail';

const titles = ['首页', '评测', '知识', '美食'];
const controllers = [
    {categoryId: 1, controller: FeedHomeListContainer},
    {categoryId: 2, controller: FeedEvaluatingListContainer},
    {categoryId: 3, controller: FeedKnowledgeListContainer},
    {categoryId: 4, controller: FeedDelicacyListContainer}
]

export default class Home extends Component {
    _pictureAction() {
        alert('Tack a picture')
    }
    render() {
        const {navigator} = this.props;

        return (
            <View style={{flex: 1}}>
                <HeaderView pictureAction={this._pictureAction}/>
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

const HeaderView = ({pictureAction}) => {
    return (
        <View style={[styles.header, {borderBottomWidth: Common.window.onePR}]}>
            <Image
                style={{width: 60, height: 30}}
                source={require('../../resource/ic_feed_nav.png')}
                resizeMode="contain"
            />
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.photo}
                onPress={pictureAction}
            >
                <Image
                    style={{width: 20, height: 20}}
                    source={require('../../resource/ic_feed_camera.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 64 : 50,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        borderBottomColor: '#d9d9d9',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    photo: {
        width: Platform.OS === 'ios' ? 44 : 50,
        height: Platform.OS === 'ios' ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: Platform.OS === 'ios' ? 20 : 0
    }
})