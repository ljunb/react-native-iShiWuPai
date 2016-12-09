/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-知识
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
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import FeedSingleImageCell from '../../components/FeedSingleImageCell';
import FeedMultiImageCell from '../../components/FeedMultiImageCell';
import FeedDetail from './FeedDetail';

let page = 1;
let canLoadMore = false;

export default class FeedKnowledgeList extends React.Component {

    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._onPressCell = this._onPressCell.bind(this);
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

    _renderRow(feed) {
        let cellData = {
            title: feed.title,
            source: feed.source,
            viewCount: feed.tail,
            images: feed.images
        };

        if (feed.images.length == 1) {
            return <FeedSingleImageCell {...cellData} onPress={() => this._onPressCell(feed)}/>
        }
        return <FeedMultiImageCell {...cellData} onPress={() => this._onPressCell(feed)} />
    }

    _onPressCell(feed) {
        this.props.navigator.push({
            component: FeedDetail,
            passProps: {feed}
        })
    }

    _onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    _onRefresh() {
        const {dispatch, categoryId} = this.props;
        page = 1;
        canLoadMore = false;
        dispatch(fetchFeedList(categoryId, page))
    }

    _onEndReach() {
        if (canLoadMore) {
            const {dispatch, categoryId} = this.props;
            page++;
            dispatch(fetchFeedList(categoryId, page));
            canLoadMore = false;
        }
    }

    _renderFooter() {
        const {feedKnowledge} = this.props;

        if (feedKnowledge.isLoadMore || page == 1) return <LoadMoreFooter/>;
    }

    render() {
        const {feedKnowledge} = this.props;
        return (
            <View style={styles.listView}>
                {!feedKnowledge.isLoading &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedKnowledge.feedList)}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    initialListSize={3}
                    onScroll={this._onScroll}
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30}
                    renderFooter={this._renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={feedKnowledge.isLoading}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                />
                }
                <Loading isShow={feedKnowledge.isLoading}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    loadingContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})