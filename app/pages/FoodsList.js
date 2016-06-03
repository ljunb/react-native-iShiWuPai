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
    InteractionManager,
    Animated,
} from 'react-native';

import Header from '../components/Header';
import {fetchFoods, fetchSortTypes} from '../actions/foodsListAction';
import Loading from '../components/Loading';
import LoadMoreFooter from '../components/LoadMoreFooter';
import Common from '../common/constants';

let page = 1;
let order_by = 1;
let order_asc = 0;
let canLoadMore = false;
let isLoading = true;

export default class FoodsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            sortTypeViewY: new Animated.Value(0),
            angleRotation: new Animated.Value(0),
            coverViewOpacity: new Animated.Value(0),
            showSortTypeView: false,
            currentSortType: null,
            orderByAsc: false,
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, kind, category} = this.props;
            dispatch(fetchFoods(kind, category.id, order_by, page, order_asc, canLoadMore, isLoading));
            dispatch(fetchSortTypes())
        })
    }

    // 排序View动画
    _handleSortTypesViewAnimation() {
        Animated.sequence([
            Animated.parallel([

                Animated.timing(this.state.sortTypeViewY, {
                    toValue: this.state.showSortTypeView ? 0 : 1,
                    duration: 500,
                }),
                Animated.timing(this.state.angleRotation, {
                    toValue: this.state.showSortTypeView ? 0 : 1,
                    duration: 500,
                })
            ]),
            Animated.timing(this.state.coverViewOpacity, {
                toValue: this.state.showSortTypeView ? 0 : 1,
                duration: 100,
            })
        ]).start();
        this.setState({showSortTypeView: !this.state.showSortTypeView})
    }

    // 遮盖层
    _renderCoverView() {
        return (
            <TouchableOpacity
                style={{position: 'absolute',top: 84}}
                activeOpacity={1}
                onPress={()=>this._handleSortTypesViewAnimation()}
            >
                <Animated.View
                    style={{
                        width: Common.window.width,
                        height: Common.window.height - 84,
                        backgroundColor: 'rgba(131, 131, 131, 0.3)',
                        opacity: this.state.coverViewOpacity,
                    }}
                />
            </TouchableOpacity>
        )
    }

    // 所有营养素View
    _renderSortTypesView() {
        const {FoodsList} = this.props;
        // 这里写死了8行数据
        let height = 8 * (30 + 10) + 10;

        let typesStyle = [styles.sortTypesView];
        typesStyle.push({
            top: this.state.sortTypeViewY.interpolate({
                inputRange:[0, 1],
                outputRange:[84-height, 84]
            })
        })

        return (
            <Animated.View style={typesStyle}>
                {FoodsList.sortTypesList.map((type, i) => {
                    let sortTypeStyle = [styles.sortType];

                    if (this.state.currentSortType) {
                        if (this.state.currentSortType.index == type.index) {
                            sortTypeStyle.push({
                                backgroundColor: '#ccc'
                            })
                        }
                    }

                    return (
                        <TouchableOpacity
                            key={i}
                            style={sortTypeStyle}
                            onPress={()=>{
                                this._handleSortTypesViewAnimation();
                                this.setState({currentSortType: type, showSortTypeView: false});

                                InteractionManager.runAfterInteractions(()=> {
                                    page = 1;
                                    isLoading = true;
                                    canLoadMore = false;
                                    this._fetchData(page, canLoadMore, isLoading);
                                })
                            }}
                        >
                            <Text>{type.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Animated.View>
        )
    }

    // 营养素排序Cell
    _renderSortTypeCell() {
        let currentTypeName = this.state.currentSortType ? this.state.currentSortType.name : '营养素排序';
        let orderByAscTitle = this.state.orderByAsc ? '由低到高' : '由高到低';
        let orderByAscIconSource = this.state.orderByAsc ? {uri: 'ic_food_ordering_up'} : {uri: 'ic_food_ordering_down'};
        return (
            <View style={styles.sortTypeCell}>
                <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    activeOpacity={0.75}
                    onPress={()=>{this._handleSortTypesViewAnimation();}}
                >
                    <Text>{currentTypeName}</Text>
                    <Animated.Image
                        style={{
                            width: 16,
                            height: 16,
                            transform: [{
                                rotate: this.state.angleRotation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }]
                        }}
                        source={{uri: 'ic_food_ordering'}}
                    />
                </TouchableOpacity>
                {this.state.currentSortType ?
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={{flexDirection: 'row'}}
                        onPress={()=>{
                            this.setState({orderByAsc: !this.state.orderByAsc})
                            InteractionManager.runAfterInteractions(()=>{
                                page = 1;
                                canLoadMore = false;
                                isLoading = true;
                                this._fetchData(page, canLoadMore, isLoading);
                            })
                        }}
                    >
                        <Text style={{color: 'red'}}>{orderByAscTitle}</Text>
                        <Image style={{width: 16, height: 16}} source={orderByAscIconSource}/>
                    </TouchableOpacity> : null
                }
            </View>
        )
    }

    _onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    _fetchData(page, canLoadMore, isLoading) {
        const {dispatch, kind, category} = this.props;
        let order_by = this.state.currentSortType ? this.state.currentSortType.index : 1;
        let order_asc = this.state.orderByAsc ? 1 : 0;
        dispatch(fetchFoods(kind, category.id, order_by, page, order_asc, canLoadMore, isLoading));
    }

    render() {

        const {category, FoodsList} = this.props;

        return (
            <View style={{flex: 1}}>
                {FoodsList.isLoading ?
                    <Loading /> :
                    <ListView
                        style={{flex: 1, marginTop: 84}}
                        dataSource={this.state.dataSource.cloneWithRows(FoodsList.foodsList)}
                        renderRow={this._renderRow}
                        onScroll={this._onScroll}
                        onEndReached={this._onEndReach.bind(this)}
                        onEndReachedThreshold={10}
                        renderFooter={this._renderFooter.bind(this)}
                    />
                }
                {this.state.showSortTypeView ? this._renderCoverView() : null}
                {this._renderSortTypesView()}
                <View style={{position: 'absolute', top: 0}}>
                    <Header
                        leftIcon='angle-left'
                        leftIconAction={()=>this.props.navigator.pop()}
                        title={category.name}
                    />
                    {this._renderSortTypeCell()}
                </View>
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

    // 上拉加载
    _onEndReach() {
        if (canLoadMore) {
            page++;
            isLoading = false;
            this._fetchData(page, canLoadMore, isLoading);
            canLoadMore = false;
        }
    }

    _renderFooter() {
        const {FoodsList} = this.props;
        if (FoodsList.isLoadMore) {
            return <LoadMoreFooter />
        }
    }
}

const styles = StyleSheet.create({
    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
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
    }
})