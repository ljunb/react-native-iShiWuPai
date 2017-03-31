/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-首页
 */
import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import {
    StyleSheet,
    View,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Common from '../../common/constants';
import Loading from '../../components/Loading';
import FeedDetail from './FeedDetail';

let canLoadMore = false;
let page = 1;

export default class FeedList extends Component {

    constructor(props) {
        super(props);
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchFeedList(page));
    }

    _onMomentumScrollEnd(event) {
        const {dispatch} = this.props;
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

        let contentSizeH = contentSize.height;
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        canLoadMore = viewBottomY >= contentSizeH;

        if (Math.abs(viewBottomY - contentSizeH) <= 40 && canLoadMore) {
            page++;
            dispatch(fetchFeedList(page));
            canLoadMore = false;
        }
    }

    _onRefresh() {
        const {dispatch} = this.props;
        page = 1;
        canLoadMore = false;
        dispatch(fetchFeedList(page))
    }

    _onPressCell(feed) {
        this.props.navigator.push({
            component: FeedDetail,
            passProps: {feed}
        })
    }

    render() {
        const {feedHome} = this.props;

        let scrollViewH = Common.window.height - (Platform.OS === 'ios' ? 64 : 50) - 44 - 49;

        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                {!feedHome.isLoading &&
                <ScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    style={{width: Common.window.width, height: scrollViewH}}
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    bounces={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={feedHome.isLoading}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                >
                    <View style={[styles.contentContainer, {height: feedHome.maxHeight + 40}]}>
                        {feedHome.feedList.map((feed, i) => {
                            return (
                                <HomeItem
                                    key={`${feed.item_id}-${i}`}
                                    feed={feed}
                                    data={feedHome.cachedArray[i]}
                                    onPress={() => this._onPressCell(feed)}
                                />
                            )
                        })}
                        <View style={[styles.loadingContainer, {top: feedHome.maxHeight}]}>
                            <ActivityIndicator />
                            <Text style={{fontSize: 14, marginLeft: 5}}>正在加载更多的数据...</Text>
                        </View>
                    </View>
                </ScrollView>
                }
                <Loading isShow={feedHome.isLoading}/>
            </View>
        )
    }
}

const HomeItem = ({
    feed,
    data,
    onPress
}) => {

    let screenW = Common.window.width;
    let width = (screenW - 15 * 2 - 10) / 2;
    let imageH = feed.content_type != 5 ? width + 50 : width;

    // 返回的数据中，头像出现null的情况，所以source仍然做个判断
    let publisherAvatar = feed.publisher_avatar ? {uri: feed.publisher_avatar} : require('../../resource/img_default_avatar.png');

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{
                height: data.height,
                width: (Common.window.width - 40) / 2,
                backgroundColor: '#fff',
                left: data.left,
                top: data.top,
                position: 'absolute',
                flex: 1
            }}
            onPress={onPress}
        >
            <Image
                style={{width: width, height: imageH}}
                source={{uri: feed.card_image.split('?')[0]}}
                defaultSource={require('../../resource/img_horizontal_default.png')}
            />
            {feed.content_type == 5 &&
            <View style={{
                height: data.titleHeight,
                width: width,
                paddingHorizontal: 4,
                paddingTop: 8,
            }}>
                <View style={{
                    height: data.titleHeight - 8,
                    width: width - 8,
                    justifyContent: 'space-around',
                    borderBottomWidth: Common.window.onePR,
                    borderColor: '#ccc'
                }}>
                    <Text style={{fontSize: 14, color: 'black'}} numberOfLines={1}>{feed.title}</Text>
                    {feed.description != '' &&
                    <Text style={{color: 'gray', fontSize: 13}} numberOfLines={2}>{feed.description}</Text>
                    }
                </View>
            </View>
            }
            {feed.content_type == 5 &&
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                paddingHorizontal: 4
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={{height: 30, width: 30, borderRadius: 15}}
                        source={publisherAvatar}
                        defaultSource={require('../../resource/img_default_avatar.png')}
                    />
                    <Text
                        style={{fontSize: 11, color: 'gray', marginLeft: 8, width: width * 0.4}}
                        numberOfLines={1}
                    >
                        {feed.publisher}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 12, width: 12}} source={require('../../resource/ic_feed_like.png')}/>
                    <Text style={{fontSize: 11, color: 'gray', marginLeft: 2}}>{feed.like_ct}</Text>
                </View>
            </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    loadingContainer: {
        height: 40,
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})