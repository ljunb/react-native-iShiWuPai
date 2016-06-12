/**
 * Created by ljunb on 16/6/12.
 */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import SearchInputBar from '../components/SearchInputBar';

export default class SearchResult extends React.Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <SearchInputBar
                    backAction={()=>this.props.navigator.pop()}
                    value={this.props.keyword}
                    searchAction={()=>{
                        alert(this.props.keyword)
                    }}
                />
            </View>
        )
    }
}