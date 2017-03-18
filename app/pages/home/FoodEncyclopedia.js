/**
 * Created by ljunb on 2016/12/9.
 * 食物百科页面
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Navigator
} from 'react-native';
import {observer} from 'mobx-react/native'
import FoodEncyclopediaStore from '../../mobx/foodEncyclopediaStore'
import RootStore from '../../mobx'

import Login from '../Login'
import SearchContainer from '../../containers/SearchContainer'
import Scanner from '../../components/Scanner'

import NetInfoDecorator from '../../common/NetInfoDecorator'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import Constants from '../../common/constants'
import Foods from './Foods'

@NetInfoDecorator
@observer
export default class FoodEncyclopedia extends Component {

    componentWillReact() {
        const {errorMsg} = FoodEncyclopediaStore
        errorMsg && this.toast && this.toast.show(errorMsg)
    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps
        const {isNoResult} = FoodEncyclopediaStore
        if (isConnected && isNoResult) {
            FoodEncyclopediaStore.fetchCategoryList()
        }
    }

    _searchAction = () => {
        RootStore.barStyle = 'default'
        this.props.navigator.push({
            component: SearchContainer,
            passProps: {onResetBarStyle: ()=>RootStore.barStyle = 'light-content'}
        })
    }

    _foodHandleAction = (handleTitle) => {
        const {user: {name}} = RootStore
        switch (handleTitle) {
            case '饮食分析':
                if (name) {
                    alert(name)
                } else {
                    this.props.navigator.push({
                        component: Login,
                        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                        passProps: {onResetBarStyle: ()=>RootStore.barStyle = 'light-content'}
                    })
                }
                break;
            case '搜索对比':
                if (name) {
                    alert(name)
                } else {
                    this.props.navigator.push({
                        component: Login,
                        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                        passProps: {onResetBarStyle: ()=>RootStore.barStyle = 'light-content'}
                    })
                }
                break
            case '扫码对比':
                this.props.navigator.push({
                    component: Scanner,
                    passProps: {
                        onBarCodeRead: obj => alert(JSON.stringify(obj))
                    }
                })
                break
        }
    }

    _onPressCategoryItem = (kind, category) => {
        RootStore.barStyle = 'default'
        this.props.navigator.push({
            component: Foods,
            passProps: {
                kind,
                category,
                onResetBarStyle: ()=>RootStore.barStyle = 'light-content'
            }
        })
    }

    _reconnectHandle = () => {
        FoodEncyclopediaStore.fetchCategoryList()
    }

    render() {
        const {foodCategoryList, isFetching} = FoodEncyclopediaStore;
        const {isConnected} = this.props

        return (
            <View style={{flex: 1}}>
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews
                    style={{width: Constants.window.width, height: Constants.window.height}}
                    contentContainerStyle={{alignItems: 'center', backgroundColor: '#f5f5f5', paddingBottom: 10}}
                >
                    <HeaderView searchAction={this._searchAction}/>
                    <FoodHandleView handleAction={this._foodHandleAction}/>
                    {isConnected ?
                        <View>
                            {foodCategoryList.map(foodCategory => {
                                return (
                                    <FoodCategoryView
                                        key={`FoodCategory-${foodCategory.kind}`}
                                        foodCategory={foodCategory}
                                        onPress={this._onPressCategoryItem}
                                    />
                                )
                            })}
                        </View> : <ReconnectView onPress={this._reconnectHandle}/>}
                </ScrollView>
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }
}

const ReconnectView = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={onPress}
        >
            <Text>网络出错，点击重试~</Text>
        </TouchableOpacity>
    )
}

const HeaderView = ({searchAction}) => {
    return (
        <Image
            style={styles.headerContainer}
            source={require('../../resource/img_home_bg.png')}
        >
            <Image
                style={styles.headerLogo}
                source={require('../../resource/ic_head_logo.png')}
                resizeMode="contain"
            />
            <View style={{alignItems: 'center'}}>
                <Text style={{color: 'white', marginBottom: 15, fontSize: 15}}>查 询 食 物
                    信 息</Text>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.headerSearchContainer}
                    onPress={searchAction}
                >
                    <Image style={{width: 20, height: 20, marginHorizontal: 5}}
                           source={require('../../resource/ic_home_search.png')}/>
                    <Text style={{color: 'rgba(222, 113, 56, 0.8)', fontSize: 15}}>请输入食物名称</Text>
                </TouchableOpacity>
            </View>
        </Image>
    )
};

const FoodHandleView = ({handleAction}) => {
    return (
        <View style={styles.foodHandleContainer}>
            <HandleItem title="饮食分析"
                        imageName={require('../../resource/ic_home_analyse.png')}
                        onPress={() => handleAction('饮食分析')}
            />
            <View style={styles.line}/>
            <HandleItem title="搜索对比"
                        imageName={require('../../resource/ic_search_compare.png')}
                        onPress={() => handleAction('搜索对比')}/>
            <View style={styles.line}/>
            <HandleItem title="扫码对比"
                        imageName={require('../../resource/ic_scan_compare.png')}
                        onPress={() => handleAction('扫码对比')}/>
        </View>
    )
};

const HandleItem = ({
    imageName,
    title,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.handelItem}
            onPress={onPress}
        >
            <Image style={{width: 28, height: 28}} source={imageName}/>
            <Text style={{fontSize: 13, color: 'gray'}}>{title}</Text>
        </TouchableOpacity>
    )
};

const FoodCategoryView = ({
    foodCategory,
    onPress
}) => {

    let title = '食物分类';
    if (foodCategory.kind == 'brand') {
        title = '热门品牌';
    } else if (foodCategory.kind == 'restaurant') {
        title = '连锁餐饮';
    }

    return (
        <View style={{backgroundColor: 'white', marginTop: 10, overflow: 'hidden'}}>
            <View style={styles.groupHeader}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <View style={{width: Constants.window.width - 16 * 2, height: 14, backgroundColor: '#f5f5f5'}}>
                    <Image style={{width: Constants.window.width - 16 * 2, height: 14}}
                           source={require('../../resource/img_home_list_bg.png')}
                    />
                </View>
            </View>
            <View style={styles.categoryContainer}>
                {foodCategory.categories.map((category) => {
                    return (
                        <TouchableOpacity
                            key={category.id}
                            activeOpacity={0.75}
                            style={styles.category}
                            onPress={() => onPress(foodCategory.kind, category)}
                        >
                            <Image
                                style={styles.categoryIcon}
                                source={{uri: category.image_url}}
                                resizeMode="contain"
                            />
                            <Text style={styles.categoryTitle}>{category.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        height: 220,
        width: Constants.window.window,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 20 + 15 : 15,
        paddingBottom: 28,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(1,1,1,0)',
        overflow: 'hidden'
    },
    headerLogo: {
        width: 66,
        height: 24,
    },
    headerSearchContainer: {
        height: 50,
        width: Constants.window.width - 16 * 2,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row'
    },
    foodHandleContainer: {
        height: 60,
        width: Constants.window.width - 16 * 2,
        backgroundColor: 'white',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: -1},
        shadowRadius: 2,
    },
    handelItem: {
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    line: {
        height: 50,
        width: 0.5,
        backgroundColor: '#d9d9d9'
    },
    categoryContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Constants.window.width - 16 * 2
    },
    groupHeader: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    category: {
        width: (Constants.window.width - 16 * 2) / 3,
        height: 65,
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
})