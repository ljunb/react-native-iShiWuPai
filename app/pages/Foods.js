/**
 * Created by ljunb on 16/5/26.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import SearchHeader from '../components/SearchHeader';
export default class Foods extends React.Component {

    render() {
        return (
            <View>
                <SearchHeader
                    searchAction={()=>alert('search')}
                    scanAction={()=>alert('scan')}
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>食物百科</Text>
                </View>
            </View>
        )
    }
}