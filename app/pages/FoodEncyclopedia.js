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
    Platform
} from 'react-native';
import {observer} from 'mobx-react/native'
import Constants from '../common/constants';
import Loading from '../components/Loading';
import SearchContainer from '../containers/SearchContainer';
import FoodEncyclopediaStore from '../mobx/foodEncyclopediaStore'

@observer
export default class FoodEncyclopedia extends Component {

    componentDidMount() {
        FoodEncyclopediaStore.fetchCategoryList()
    }

    _searchAction = () => {
        this.props.navigator.push({
            component: SearchContainer
        })
    }

    _foodHandleAction = (handleTitle) => {
        let nextComponent;
        switch (handleTitle) {
            case '饮食分析':
                alert('饮食分析')
                break;
            case '搜索对比':
                alert('搜索对比')
                break;
            case '扫码对比':
                alert('扫码对比')
                break;
        }
    }

    _onPressCategoryItem = (category) => {
        alert(category.name)
    }

    render() {
        const {foodCategoryList, isFetchingCategory} = FoodEncyclopediaStore;

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
                    </View>
                </ScrollView>
                <Loading isShow={isFetchingCategory}/>
            </View>
        )
    }
}

const HeaderView = ({searchAction}) => {
    return (
        <Image
            style={styles.headerContainer}
            source={require('../resource/img_home_bg.png')}
        >
            <Image
                style={styles.headerLogo}
                source={require('../resource/ic_head_logo.png')}
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
                           source={require('../resource/ic_home_search.png')}/>
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
                        imageName={require('../resource/ic_home_analyse.png')}
                        onPress={() => handleAction('饮食分析')}
            />
            <View style={styles.line}/>
            <HandleItem title="搜索对比"
                        imageName={require('../resource/ic_search_compare.png')}
                        onPress={() => handleAction('搜索对比')}/>
            <View style={styles.line}/>
            <HandleItem title="扫码对比"
                        imageName={require('../resource/ic_scan_compare.png')}
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
                           source={require('../resource/img_home_list_bg.png')}
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
                            onPress={() => onPress(category)}
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