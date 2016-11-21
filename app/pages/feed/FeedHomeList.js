/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-首页
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    InteractionManager,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Common from '../../common/constants';
import Loading from '../../components/Loading';

let canLoadMore = false;
let page = 1;

export default class FeedList extends React.Component {

    constructor(props) {
        super(props);
        this._onScrollEndDrag = this._onScrollEndDrag.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, categoryId} = this.props;
            dispatch(fetchFeedList(categoryId, page));
        });
    }

    _onScrollEndDrag(event) {
        const {dispatch, categoryId} = this.props;
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

        let contentSizeH = contentSize.height;
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        canLoadMore = viewBottomY > contentSizeH;
        // 上拖加载更多
        if (viewBottomY - contentSizeH >= 20 && canLoadMore) {
            page++;
            dispatch(fetchFeedList(categoryId, page));

            canLoadMore = false;
            console.log(page)
        }

        console.log(contentSizeH + ' : ' + viewBottomY + ' : ' + contentOffset.y)
    }


    render() {
        const {feedHome} = this.props;

        if (feedHome.isLoading) return <Text>Loading</Text>

        let scrollViewH = Common.window.height - (Platform.OS === 'ios' ? 64 : 50) - 44 - 49;

        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <ScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    style={{width: Common.window.width, height: scrollViewH}}
                    contentContainerStyle={{paddingBottom: 0}}
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    onScrollEndDrag={this._onScrollEndDrag}
                    bounces={true}
                >
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        height: feedHome.maxHeight,
                        overflow: 'hidden'
                    }}>
                        {feedHome.feedList.map((feed, i) => {
                            return (
                                <HomeItem
                                    key={`${feed.item_id}-${i}`}
                                    feed={feed} i={i}
                                    feedHome={feedHome}
                                    data={feedHome.cachedArray[i]}
                                />
                            )
                        })}
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const HomeItem = ({feed, i, feedHome, data}) => {

    const {cachedArray} = feedHome;
    let screenW = Common.window.width;
    let width = (screenW - 15 * 2 - 10) / 2;
    let imageH = feed.content_type != 5 ? width + 50 : width;
    let publisherAvatar = feed.publisher_avatar ? {uri: feed.publisher_avatar} : require('../../resource/img_default_avatar.png')

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
        >
            <Image style={{width: width, height: imageH}} source={{uri: feed.card_image.split('?')[0]}}/>
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
                    <Text style={{fontSize: 14, color: 'black'}}>{feed.title}</Text>
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
                    <Image style={{height: 30, width: 30, borderRadius: 15}} source={publisherAvatar}/>
                    <Text style={{fontSize: 11, color: 'gray', marginLeft: 8}}>{feed.publisher}</Text>
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

    listView: {
        flex: 1,
    }
})