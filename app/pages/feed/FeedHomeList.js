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
} from 'react-native';
import {
    fetchFeedList
} from '../../actions/feedListActions';
import Common from '../../common/constants';
import Loading from '../../components/Loading';

export default class FeedList extends React.Component {

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
        alert(categoryId)
    }
    render() {
        const { feedHome } = this.props;

        if (feedHome.isLoading) return <Text>Loading</Text>

        return (
            <View style={{flex: 1}}>
                {feedHome.feedList.map((feed, i) => {
                    return <Text key={`${feed.item_id}-${i}`}>{feed.title}</Text>
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    listView: {
        flex: 1,
    }
})