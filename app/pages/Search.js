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
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {
    fetchKeywords,
    selectKeyword,
    resetState,
    setupSearchText,
    clearHistory
} from '../actions/searchActions';

import Common from '../common/constants';
import SearchResultContainer from '../containers/SearchResultContainer';
import SearchInputBar from '../components/SearchInputBar';

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

        if (Search.history.length) {
            sectionIDs.push('history');

            let rowID = [];
            for (let i = 0; i < Search.history.length; i++) {
                rowID.push(i);
            }

            rowID.push('clear');
            rowIdentifiers.push(rowID);
        }

        if (Search.keywordsList.length) {
            sectionIDs.push('keywordsList');
            rowIdentifiers.push([0]);
        }

        if (Search.history.length) {
            sourceData = {'history': Search.history, 'keywordsList': [Search.keywordsList]};
        } else {
            sourceData = {'keywordsList': [Search.keywordsList]};
        }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <SearchInputBar
                    backAction={()=>{
                        this.props.navigator.pop();
                    }}
                    searchAction={this.pushToResultPage.bind(this, Search.searchText)}
                    value={Search.searchText}
                    onChangeText={(text)=>{
                        dispatch(setupSearchText(text))
                    }}
                />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIdentifiers)}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    enableEmptySections={true}
                    bounces={false}
                />
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
                    onPress={this.pushToResultPage.bind(this, keywords)}
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
                                onPress={this.pushToResultPage.bind(this, keyword)}
                            >
                                <Text>{keyword}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    pushToResultPage(keyword) {

        if (!keyword || !keyword.trim().length) {
            alert('食物名称不能为空!');
            return;
        }

        const {dispatch} = this.props;

        InteractionManager.runAfterInteractions(()=> {
            this.props.navigator.push({
                name: 'SearchResultContainer',
                component: SearchResultContainer,
                passProps: {
                    keyword: keyword,
                }
            })
            dispatch(selectKeyword(keyword));
        })
    }

    renderSectionHeader(sectionHeader) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{fontSize: 13, color: 'gray'}}>{sectionHeader}</Text>
            </View>
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
    }
})