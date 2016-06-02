/**
 * Created by ljunb on 16/6/2.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import Header from '../components/Header';
import {fetchFoods} from '../actions/foodsListAction';
import Loading from '../components/Loading';

let page = 1;
let order_by = 1;
let order_asc = 0;

export default class FoodsList extends React.Component {

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
            const {dispatch, kind, category} = this.props;
            dispatch(fetchFoods(kind, category.id, order_by, page, order_asc));
        })
    }


    render() {

        const {category, FoodsList} = this.props;

        return (
            <View style={{flex: 1}}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title={category.name}
                />
                <SortTypeCell />
                {FoodsList.isLoading ?
                    <Loading /> :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(FoodsList.foodsList)}
                        renderRow={this._renderRow}
                        style={{flex: 1}}
                    />
                }
            </View>
        )
    }

    _renderRow(food) {

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
                        <Text>{food.name}</Text>
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

class SortTypeCell extends React.Component {
    render() {
        return (
            <View style={styles.sortTypeCell}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Text>营养素排序</Text>
                    <Image style={{width: 16, height: 16}} source={{uri: 'ic_food_ordering'}}/>
                </TouchableOpacity>
                {/*
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Text style={{color: 'red'}}>由高到低</Text>
                    <Image style={{width: 16, height: 16}} source={{uri: 'ic_food_ordering_down'}} />
                </TouchableOpacity>
                */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
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
    }
})