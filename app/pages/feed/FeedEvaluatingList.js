/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-评测
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Common from '../../common/constants';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';

let page = 1;
let canLoadMore = false;

export default class FeedEvaluatingList extends React.Component {

    constructor(props) {
        super(props);
        this._onEndReach = this._onEndReach.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        const {dispatch, categoryId} = this.props;
        dispatch(fetchFeedList(categoryId, page))
    }

    _onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    // 下拉刷新
    _onRefresh() {
        const {dispatch, categoryId} = this.props;
        page = 1;
        canLoadMore = false;
        dispatch(fetchFeedList(categoryId, page))
    }

    // 上拉加载
    _onEndReach() {
        if (canLoadMore) {
            const {dispatch, categoryId} = this.props;
            page++;
            dispatch(fetchFeedList(categoryId, page));
            canLoadMore = false;
        }
    }

    _renderFooter() {
        const {feedEvaluating} = this.props;

        if (feedEvaluating.isLoadMore) return <LoadMoreFooter/>;
    }

    render() {
        const {feedEvaluating} = this.props;
        return (
            <View style={styles.listView}>
                {!feedEvaluating.isLoading &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedEvaluating.feedList)}
                    renderRow={(feed) => <EvaluatingItem onPress={() => alert(feed.title)} feed={feed}/>}
                    enableEmptySections={true}
                    initialListSize={2}
                    onScroll={this._onScroll}
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30}
                    renderFooter={this._renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={feedEvaluating.isLoading}
                            onRefresh={this._onRefresh}
                            color={['rgb(217, 51, 58)']}
                        />
                    }
                />
                }
                <Loading isShow={feedEvaluating.isLoading}/>
            </View>
        )
    }
}

const EvaluatingItem = ({
    feed,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{width: Common.window.width, paddingHorizontal: 15, marginTop: 15}}
            onPress={onPress}
        >
            <Image
                style={{
                    width: Common.window.width - 15 * 2,
                    height: Common.window.height * 0.3,
                    paddingVertical: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ccc'
                }}
                source={{uri: feed.background}}
            >
                <Text style={{color: '#fff', fontSize: 13, backgroundColor: 'rgba(1,1,1,0)'}}>{feed.source}</Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'bold',
                        width: Common.window.width * 0.62,
                        textAlign: 'center',
                        lineHeight: 20,
                        backgroundColor: 'rgba(1,1,1,0)'
                    }}
                    numberOfLines={2}
                >{feed.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 12, height: 12, marginRight: 3}}
                           source={require('../../resource/ic_feed_read.png')}/>
                    <Text style={{color: '#fff', fontSize: 13, backgroundColor: 'rgba(1,1,1,0)'}}>{feed.tail}</Text>
                </View>
            </Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
})