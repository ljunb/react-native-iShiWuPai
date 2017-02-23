/**
 * Created by ljunb on 2016/11/19.
 * 逛吃-评测
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import {observer} from 'mobx-react/native'
import Common from '../../common/constants';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import FeedDetail from './FeedDetail';
import FeedEvaluatingListStore from '../../mobx/feedEvaluatingListStore'
import Toast from 'react-native-easy-toast'

@observer
export default class FeedEvaluatingList extends PureComponent {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    }

    componentDidMount() {
        FeedEvaluatingListStore.fetchEvaluatingList()
    }

    componentWillReact() {
        const {errorMsg} = FeedEvaluatingListStore
        errorMsg && this.toast.show(errorMsg)
    }

    _onRefresh = () => {
        FeedEvaluatingListStore.isRefreshing = true
        FeedEvaluatingListStore.fetchEvaluatingList()
    }

    _onEndReach = () => FeedEvaluatingListStore.page ++

    _onPressCell = feed => {
        this.props.navigator.push({
            component: FeedDetail,
            passProps: {feed}
        })
    }

    _renderRow = feed => <EvaluatingItem onPress={this._onPressCell} feed={feed}/>

    _renderFooter = () => <LoadMoreFooter/>

    render() {
        const {isFetching, isRefreshing, feedEvaluatingList} = FeedEvaluatingListStore

        return (
            <View style={styles.listView}>
                {!isFetching &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedEvaluatingList.slice(0))}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter}
                    enableEmptySections={true}
                    initialListSize={2}
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

class EvaluatingItem extends PureComponent {

    static propTypes = {
        feed: React.PropTypes.object,
        onPress: React.PropTypes.func
    }

    _onPress = () => {
        const {feed, onPress} = this.props
        onPress && onPress(feed)
    }

    render() {
        const {feed} = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={{width: Common.window.width, paddingHorizontal: 15, marginTop: 15}}
                onPress={this._onPress}
            >
                <Image style={styles.image} source={{uri: feed.background}}>
                    <Text style={{color: '#fff', fontSize: 13}}>{feed.source}</Text>
                    <Text style={styles.feedTitle} numberOfLines={2}>{feed.title}</Text>
                    <View style={styles.imageContentWrapper}>
                        <Image
                            style={{width: 12, height: 12, marginRight: 3}}
                            source={require('../../resource/ic_feed_read.png')}
                        />
                        <Text style={{color: '#fff', fontSize: 13}}>{feed.tail}</Text>
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    image: {
        width: Common.window.width - 15 * 2,
        height: Common.window.height * 0.3,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    feedTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: Common.window.width * 0.62,
        textAlign: 'center',
        lineHeight: 20,
        backgroundColor: 'rgba(1,1,1,0)'
    },
    imageContentWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})