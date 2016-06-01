/**
 * Created by ljunb on 16/5/26.
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
    ActivityIndicatorIOS
} from 'react-native';
import Common from '../common/constants';
import {fetchCategories} from '../actions/foodsActions';
import SearchHeader from '../components/SearchHeader';

export default class Foods extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(fetchCategories());
        })
    }

    render() {

        const {Foods} = this.props;
        let categoryData = Foods.categoryList;


        return (
            <View style={{flex: 1}}>
                <SearchHeader
                    searchAction={()=>alert('search')}
                    scanAction={()=>alert('scan')}
                />
                <CompareCell />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(categoryData)}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.listView}
                />
            </View>
        )
    }


    _renderRow(group) {

        let title = '食物分类'
        if (group.kind == 'brand') {
            title = '热门品牌';
        } else if (group.kind == 'restaurant') {
            title = '连锁餐饮';
        }

        return (
            <View style={styles.groupCell}>
                <View style={styles.sectionHeader}>
                    <Text>{title}</Text>
                    <View style={styles.line}/>
                </View>
                <View style={styles.categoryContainer}>
                    {
                        group.categories.map((category) => {
                            return (
                                <TouchableOpacity key={category.id} style={styles.category}>
                                    <Image
                                        style={styles.categoryIcon}
                                        source={{uri: category.image_url}}
                                    />
                                    <Text style={styles.categoryTitle}>{category.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    _renderLoading() {
        return (
            <View style={styles.loading}>
                <ActivityIndicatorIOS color="white"/>
                <Text style={styles.loadingTitle}>加载中……</Text>
            </View>
        )
    }
}

class CompareCell extends React.Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.compareCell}
            >
                <View style={styles.leftContainer}>
                    <Image style={styles.vsIcon}/>
                    <View style={styles.compareTitleContainer}>
                        <Text>食物对比</Text>
                        <Text style={styles.compareSubTitle}>食物数据大PK</Text>
                    </View>
                </View>
                <Image style={styles.goIcon} source={{uri: 'ic_my_right'}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    listView: {
        flex: 1,
    },

    compareCell: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    vsIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ccc',
    },

    compareTitleContainer: {
        marginLeft: 10,
    },

    compareSubTitle: {
        color: 'gray',
        marginTop: 4,
        fontSize: 12,
    },

    goIcon: {
        width: 20,
        height: 20,
    },

    groupCell: {
        borderTopColor: 'rgb(241, 241, 241)',
        borderTopWidth: 10,
        paddingTop: 10,
    },

    sectionHeader: {
        alignItems: 'center'
    },

    line: {
        width: 30,
        height: 2,
        marginTop: 10,
        backgroundColor: 'red'
    },

    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25,
    },

    category: {
        width: Common.window.width / 3,
        alignItems: 'center',
        marginBottom: 25,
    },

    categoryIcon: {
        width: 40,
        height: 40,
    },

    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },

    loading: {
        marginTop: Common.window.height * 0.5 - 140,
        backgroundColor: 'gray',
        height: 100,
        width: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }

})