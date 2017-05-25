/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-首页
 */
import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    RefreshControl,
    Platform,
    ActivityIndicator
} from 'react-native'
import {reaction} from 'mobx'
import Loading from '../../components/Loading'
import FeedDetail from './FeedDetail'
import FeedBaseStore from '../../store/feedBaseStore'
import AutoResponisve from 'autoresponsive-react-native'

const DELICACY_ID = 1
const itemWidth = (gScreen.width - 15 * 2 - 10) / 2

let canLoadMore = false;

@observer
export default class FeedDelicacyList extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.homeFeedStore = new FeedBaseStore(DELICACY_ID)
    }

    componentDidMount() {
        this.dispose = reaction(
            () => this.homeFeedStore.page,
            () => this.homeFeedStore.fetchFeedList()
        );
    }

    componentWillUnmount() {
        this.dispose()
    }

    componentWillReact() {
        const {errorMsg} = this.homeFeedStore
        errorMsg && this.toast.show(errorMsg)
    }

    onMomentumScrollEnd = event => {
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

        let contentSizeH = contentSize.height;
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        canLoadMore = viewBottomY >= contentSizeH;

        if (Math.abs(viewBottomY - contentSizeH) <= 40 && canLoadMore) {
            this.homeFeedStore.page++
            canLoadMore = false
        }
    }

    onRefresh = () => {
        this.homeFeedStore.page = 1
        canLoadMore = false
    }

    getAutoResponsiveProps = () => ({itemMargin: 10})

    renderChildren = (feed, key) => {
        // 默认高度
        let height = itemWidth + 50;
        let titleHeight = 30;
        if (feed.description) {
            if (feed.description.length !== 0 && feed.description.length < 13) {
                titleHeight += 25;
            } else if (feed.description.length >= 13) {
                titleHeight += 40
            }
        }
        height += titleHeight;

        if (feed.content_type !== 5) height = itemWidth + 50;

        const style = {
            width: itemWidth,
            height,
            marginLeft: 15
        }

        return (
            <HomeItem
                titleHeight={titleHeight}
                style={style}
                key={`${feed.item_id}-${key}`}
                feed={feed}
                onPress={this.onPressCell}
            />
        )
    }

    onPressCell = feed => {
        this.props.navigator.push({
            component: FeedDetail,
            passProps: {feed}
        })
    }

    render() {
        const {feedList, isFetching} = this.homeFeedStore
        const feedArray = feedList.slice()
        let scrollViewH = gScreen.height - gScreen.navBarHeight - 44 - 49;

        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <ScrollView
                    contentContainerStyle={{paddingTop: 10}}
                    ref={scrollView => this.scrollView = scrollView}
                    style={{width: gScreen.width, height: scrollViewH}}
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews
                    bounces
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={this.onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                >
                    {!isFetching &&
                    <AutoResponisve {...this.getAutoResponsiveProps()}>
                        {feedArray.map(this.renderChildren)}
                    </AutoResponisve>
                    }
                    {!isFetching &&
                    <View style={[styles.loadingContainer]}>
                        <ActivityIndicator />
                        <Text style={{fontSize: 14, marginLeft: 5}}>正在加载更多的数据...</Text>
                    </View>}
                </ScrollView>
                <Loading isShow={isFetching}/>
            </View>
        );
    }
}

@observer
class HomeItem extends Component {

    onPress = () => {
        const {onPress, feed} = this.props
        onPress && onPress(feed)
    }

    render() {
        const {feed, onPress, style, titleHeight} = this.props
        let imageH = feed.content_type != 5 ? style.width + 50 : style.width;

        // 返回的数据中，头像出现null的情况，所以source仍然做个判断
        let publisherAvatar = feed.publisher_avatar ? {uri: feed.publisher_avatar} : require('../../resource/img_default_avatar.png');

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={[{backgroundColor: '#fff'}, style]}
                onPress={this.onPress}
            >
                <Image
                    style={{width: style.width, height: imageH}}
                    source={{uri: feed.card_image.split('?')[0]}}
                    defaultSource={require('../../resource/img_horizontal_default.png')}
                />
                {feed.content_type == 5 &&
                <View style={{
                    height: titleHeight,
                    width: style.width,
                    paddingHorizontal: 4,
                    paddingTop: 8,
                }}>
                    <View style={{
                        height: titleHeight - 8,
                        width: style.width - 8,
                        justifyContent: 'space-around',
                        borderBottomWidth: gScreen.onePix,
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
                            style={{fontSize: 11, color: 'gray', marginLeft: 8, width: style.width * 0.4}}
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
}


const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    loadingContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})