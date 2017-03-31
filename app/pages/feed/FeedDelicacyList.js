/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-知识
 */
import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    RefreshControl
} from 'react-native'
import {observer} from 'mobx-react/native'
import {reaction} from 'mobx'
import Loading from '../../components/Loading'
import LoadMoreFooter from '../../components/LoadMoreFooter'
import FeedSingleImageCell from '../../components/FeedSingleImageCell'
import FeedMultiImageCell from '../../components/FeedMultiImageCell'
import FeedDetail from './FeedDetail'
import Toast from 'react-native-easy-toast'
import FeedBaseStore from '../../mobx/feedBaseStore'

const DELICACY_ID = 4

@observer
export default class FeedDelicacyList extends PureComponent {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.delicacyListStore = new FeedBaseStore(DELICACY_ID)
    }

    componentDidMount() {
        reaction(
            () => this.delicacyListStore.page,
            () => this.delicacyListStore.fetchFeedList()
        );
    }

    componentWillReact() {
        const {errorMsg} = this.delicacyListStore
        errorMsg && this.toast.show(errorMsg)
    }

    _renderRow = feed => <DelicacyItem onPress={this._onPressCell} feed={feed}/>

    _onRefresh = () => {
        this.delicacyListStore.isRefreshing = true;
        this.delicacyListStore.fetchFeedList()
    };

    _onEndReach = () => this.delicacyListStore.page++

    _renderFooter = () => <LoadMoreFooter isNoMore={this.delicacyListStore.isNoMore}/>

    _onPressCell = feed => {
        this.props.navigator.push({
            component: FeedDetail,
            passProps: {feed}
        })
    }

    render() {
        const {isRefreshing, isFetching, feedList} = this.delicacyListStore
        return (
            <View style={styles.listView}>
                {!isFetching &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedList.slice(0))}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                />
                }
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }
}

class DelicacyItem extends PureComponent {

    static propTypes = {
        feed: React.PropTypes.object,
        onPress: React.PropTypes.func
    }

    _onPress = () => {
        const {feed, onPress} = this.props
        onPress && onPress(feed)
    }

    render() {
        const {feed: {title, source, tail, images}} = this.props
        const cellData = {title, source, images, viewCount: tail}

        if (images.length == 1) {
            return <FeedSingleImageCell {...cellData} onPress={this._onPress}/>
        }
        return <FeedMultiImageCell {...cellData} onPress={this._onPress}/>
    }
}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
})