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
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Common from '../../common/constants';
import Loading from '../../components/Loading';


export default class FeedKnowledgeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        const { dispatch, categoryId } = this.props;
        dispatch(fetchFeedList(categoryId))
    }
    render() {
        const { feedKnowledge } = this.props;
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedKnowledge.feedList)}
                    renderRow={(feed) => {
                        if (feed.images.length == 1) {
                            return <KnowledgeSingleImageItem onPress={()=>alert(feed.title)} feed={feed}/>
                        }
                        return <KnowledgeMultiImageItem onPress={()=>alert(feed.title)} feed={feed}/>
                    }}
                    enableEmptySections={true}
                />
            </View>
        )
    }
}

const KnowledgeSingleImageItem = ({
    feed,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{width: Common.window.width, padding: 15, marginTop: 15, flexDirection:'row', backgroundColor: '#fff', justifyContent: 'space-between'}}
            onPress={onPress}
        >
            <View style={{justifyContent: 'space-between'}}>
                <Text numberOfLines={2} style={{width: Common.window.width * 0.55, fontSize: 15}}>{feed.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{feed.source}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            style={{width: 14, height: 14, marginRight: 3}}
                            source={require('../../resource/ic_feed_watch.png')}
                        />
                        <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{feed.tail}</Text>
                    </View>
                </View>
            </View>
            <Image
                style={{height: 80, width: (Common.window.width - 15*2 - 10*2) / 3}}
                source={{uri: feed.images[0]}}
            />
        </TouchableOpacity>
    )
}

const KnowledgeMultiImageItem = ({
    feed,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{width: Common.window.width, padding: 15, marginTop: 15, backgroundColor: '#fff'}}
            onPress={onPress}
        >
            <Text numberOfLines={1} style={{width: Common.window.width - 15*2, fontSize: 15}}>{feed.title}</Text>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
                {feed.images.map((img, i) => {
                    return (
                        <Image
                            key={`${img}-${i}`}
                            style={{height: 80, width: (Common.window.width - 15*2 - 10*2) / 3}}
                            source={{uri: img}}
                        />
                    )
                })}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{feed.source}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                    <Image
                        style={{width: 14, height: 14, marginRight: 3}}
                        source={require('../../resource/ic_feed_watch.png')}
                    />
                    <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{feed.tail}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    listView: {
        flex: 1,
    }
})