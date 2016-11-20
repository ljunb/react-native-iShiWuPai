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
    Platform
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
        const {dispatch, categoryId} = this.props;
        dispatch(fetchFeedList(categoryId));
    }

    render() {
        const {feedHome} = this.props;

        if (feedHome.isLoading) return <Text>Loading</Text>

        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView
                    style={{
                        flex:1,
                        width: Common.window.width,
                        height: Common.window.height - (Platform.OS === 'ios' ? 64 : 50) - 49 - 44
                    }}
                    contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 49}}
                >
                    {feedHome.feedList.map((feed, i) => {
                        return (
                            <HomeItem key={`${feed.item_id}-${i}`} feed={feed} i={i} feedHome={feedHome}/>
                        )
                    })}

                </ScrollView>
            </View>
        )
    }
}

const HomeItem = ({feed, i, feedHome}) => {

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{height: feedHome.heightArray[i], width: (Common.window.width - 45) / 2, backgroundColor: '#ccc', marginLeft: 15, marginTop: feedHome.cachedArray[i]}}
        >
            <Text>{feedHome[i]}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    listView: {
        flex: 1,
    }
})