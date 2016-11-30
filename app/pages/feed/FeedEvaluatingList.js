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
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Common from '../../common/constants';
import Loading from '../../components/Loading';


export default class FeedEvaluatingList extends React.Component {

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
        const { feedEvaluating } = this.props;
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedEvaluating.feedList)}
                    renderRow={(feed)=><EvaluatingItem onPress={()=>alert(feed.title)} feed={feed}/>}
                    enableEmptySections={true}

                />
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
                style={{width: Common.window.width - 15*2, height: Common.window.height * 0.3, paddingVertical: 20, alignItems:'center', justifyContent: 'space-between', backgroundColor: '#ccc'}}
                source={{uri: feed.background}}
            >
                <Text style={{color: '#fff', fontSize: 13, backgroundColor: 'rgba(1,1,1,0)'}}>{feed.source}</Text>
                <Text
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold', width: Common.window.width * 0.62, textAlign: 'center', lineHeight: 20, backgroundColor: 'rgba(1,1,1,0)'}}
                    numberOfLines={2}
                >{feed.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 12, height: 12, marginRight: 3}} source={require('../../resource/ic_feed_read.png')}/>
                    <Text style={{color: '#fff', fontSize: 13, backgroundColor: 'rgba(1,1,1,0)'}}>{feed.tail}</Text>
                </View>
            </Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    listView: {
        flex: 1,
    }
})