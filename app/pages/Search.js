/**
 * Created by ljunb on 16/6/5.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {
    fetchKeywords,
    selectKeyword,
    resetState,
    setupSearchText,
    clearHistory,
    fetchSearchResults,
} from '../actions/searchActions';

import Common from '../common/constants';
import SearchInputBar from '../components/SearchInputBar';

let page = 1;

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (data, sectionID, rowID) => {
                    if (rowID == 'clear') return '清空历史记录';
                    return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return sectionID == 'history' ? '最近搜过' : '大家都在搜';
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            }),

            resultDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(()=> {
            dispatch(fetchKeywords());
        })
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(resetState());
    }

    render() {

        const {Search, dispatch} = this.props;

        // 将数据进行分组
        let sectionIDs = [];
        let rowIdentifiers = [];
        let sourceData = null;

        if (Search.history && Search.history.length) {
            sectionIDs.push('history');

            let rowID = [];
            for (let i = 0; i < Search.history.length; i++) {
                rowID.push(i);
            }

            rowID.push('clear');
            rowIdentifiers.push(rowID);
        }

        if (Search.keywordsList && Search.keywordsList.length) {
            sectionIDs.push('keywordsList');
            rowIdentifiers.push([0]);
        }

        if (Search.history && Search.history.length) {
            sourceData = {'history': Search.history, 'keywordsList': [Search.keywordsList]};
        } else {
            sourceData = {'keywordsList': [Search.keywordsList]};
        }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <SearchInputBar
                    backAction={()=>this.props.navigator.pop()}
                    searchAction={this.handleSearchText.bind(this, Search.searchText)}
                    value={Search.searchText}
                    onChangeText={(text)=>{
                        dispatch(setupSearchText(text))
                    }}
                />
                {Search.searchText ?
                    this.renderResultView() :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIdentifiers)}
                        renderRow={this.renderRow}
                        renderSectionHeader={this.renderSectionHeader}
                        enableEmptySections={true}
                        bounces={false}
                    />
                }
            </View>
        )
    }

    renderRow(keywords, sectionID, rowID) {

        const {dispatch} = this.props;

        if (sectionID == 'history') {
            if (rowID == 'clear') {
                return (
                    <TouchableOpacity
                        style={styles.clearHistoryRow}
                        onPress={()=>dispatch(clearHistory())}
                    >
                        <Image source={{uri: 'ic_trash'}} style={{height: 20, width: 20, marginRight: 10}}/>
                        <Text style={{color: 'gray'}}>{keywords}</Text>
                    </TouchableOpacity>
                )
            }

            // 搜索历史记录
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    activeOpacity={0.75}
                    onPress={this.handleSearchText.bind(this, keywords)}
                >
                    <Image source={{uri: 'ic_search_history'}} style={styles.historyIcon}/>
                    <View style={styles.historyTitle}>
                        <Text>{keywords}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.keywordsContainer}>
                {
                    keywords.map((keyword) => {
                        return (
                            <TouchableOpacity
                                key={keyword}
                                style={styles.keyword}
                                activeOpacity={0.75}
                                onPress={this.handleSearchText.bind(this, keyword)}
                            >
                                <Text>{keyword}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    handleSearchText(keyword) {

        if (!keyword || !keyword.trim().length) {
            alert('食物名称不能为空!');
            return;
        }

        const {dispatch} = this.props;
        dispatch(selectKeyword(keyword));
        dispatch(fetchSearchResults(keyword, page))
    }

    renderSectionHeader(sectionHeader) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{fontSize: 13, color: 'gray'}}>{sectionHeader}</Text>
            </View>
        )
    }

    renderResultView() {
        const {Search} = this.props;

        return (
            <View style={{backgroundColor: 'white'}}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{height: 40, alignItems: 'center'}}
                >
                    {Search.tags.map((tag)=> {
                        return (
                            <TouchableOpacity key={tag.name}>
                                <Text style={styles.tag}>{tag.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={styles.sortTypeCell}>
                    <Text>营养素排序</Text>
                </View>
                <ListView
                    dataSource={this.state.resultDataSource.cloneWithRows(Search.searchResultList)}
                    renderRow={this.renderResultRow}
                    enableEmptySections={true}
                    style={{height: Common.window.height-144}}
                />
            </View>
        )
    }

    renderResultRow(food) {

        let lightStyle = [styles.healthLight];
        if (food.health_light == 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light == 3) {
            lightStyle.push({backgroundColor: 'red'})
        }

        return (
            <TouchableOpacity
                style={styles.foodsCell}
            >
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.foodIcon} source={{uri: food.thumb_image_url}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.foodName} numberOfLines={1}>{food.name}</Text>
                        <Text style={styles.calory}>
                            {food.calory}
                            <Text style={styles.unit}> 千卡/{food.weight}克</Text>
                        </Text>
                    </View>
                </View>
                <View style={lightStyle}/>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    historyTitle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        width: Common.window.width - 15 - 10 - 16,
        marginLeft: 10,
        paddingTop: 15,
        paddingBottom: 15
    },

    historyIcon: {
        height: 16,
        width: 16,
        marginLeft: 15
    },

    clearHistoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    keyword: {
        width: Common.window.width / 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        padding: 15,
    },

    sectionHeader: {
        height: 44,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: 'rgb(245, 246, 247)'
    },

    tag: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        textAlign: 'center',
        padding: 6,
        marginLeft: 10,
    },

    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width,
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },


    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    titleContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'space-between',
    },

    foodName: {
        width: Common.window.width - 15 - 15 - 40 - 15 - 10,
    },

    calory: {
        fontSize: 13,
        color: 'red',
    },

    unit: {
        fontSize: 13,
        color: 'black'
    },

    healthLight: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 0,
    },

    sortType: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width - 4 * 10) / 3,
        height: 30,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 10,
    },

    sortTypesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: Common.window.width,
        paddingTop: 10,
    },

    subcategoryContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 150,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
    },

    subcategory: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        height: 40,
        justifyContent: 'center',
        padding: 15,
    }
})