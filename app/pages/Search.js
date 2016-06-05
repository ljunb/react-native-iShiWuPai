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
} from 'react-native';

import {
    fetchKeywords,
} from '../actions/searchActions';

import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Search extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchKeywords());
    }
    
    render() {

        const {Search} = this.props;

        return (
            <View>
                <SearchInput
                    backAction={()=>this.props.navigator.pop()}
                    searchAction={()=>alert('search')}
                />
            </View>
        )
    }
}

class SearchInput extends React.Component {
    render() {
        return (
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={{marginLeft: 15}}
                    onPress={this.props.backAction}
                >
                    <Icon name="angle-left" size={30} color="black"/>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder='请输入食物名称'
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    activeOpacity={0.75}
                    onPress={this.props.searchAction}
                >
                    <Image style={{height: 20, width: 20}} source={{uri: 'ic_homepage_search'}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
    },

    textInput: {
        width: Common.window.width - 15 - 30 - 20,
        height: 30,
        marginTop: 9,
        paddingLeft: 5,
        fontSize: 14,
    },

    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 12
    }
})