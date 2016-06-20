## iShiWuPai
iShiWuPai是基于React Native和Redux实现的展示型美食类APP。持续更新中，欢迎一起讨论学习！

## 完成功能
目前只针对iOS端，完成功能：
- [x] 逛吃界面，支持下拉刷新和上拖加载更多
- [x] 资讯详情界面
- [x] 食物百科界面
- [x] 食物列表页面所有功能，包括子类别排序、营养素排序功能及动画，支持上拖加载更多
- [x] 搜索历史记录、搜索结果功能及对应排序动画，支持上拖加载更多
- [x] 我的、食物对比基本界面
- [ ] 食物详情
- [ ] 食物对比
- [ ] 我的页面功能
- [ ] 分享&收藏
- [ ] 性能优化

## 部分功能演示
![排序](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/performance.gif)

## 运行截图
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/strolling.png)
![资讯详情](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/feedDetail.png)
![食物百科](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/foods.png)
![排序功能](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/sortList.png)
![搜索](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/result.png)
![我的](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/user.png)

## 心得
>1、state的拥有权
公司项目采用的Flux架构，与视图无关的state数据都保存到了store，参考该做法，iShiWuPai项目中与视图或动画相关的state才放在组件中，而其他state数据则存放在对应reducer中，如：
```
// FoodsList.js 
    ...
constructor(props) {
    super(props);

    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),

        // 排序视图Y值
        sortTypeViewY: new Animated.Value(0),
        // 排序三角角度
        angleRotation: new Animated.Value(0),
        // 遮盖层透明度
        coverViewOpacity: new Animated.Value(0),
    }
}
    ...
--------------------------------

// foodsListReducer.js

const initialState = {
    // 食物分类数组
    foodsList: [],
    // 营养素数组
    sortTypesList: [],
    // 当前营养素
    currentSortType: null,
    // 显示营养素视图
    showSortTypeView: false,
    // 升降序
    orderByAsc: false,
    // 显示子分类视图
    showSubcategoryView: false,
    // 当前子分类
    currentSubcategory: null,
    isLoading: true,
    isLoadMore: false,
}
    ...
```

>2、维护Redux中的actionTypes常量应多加小心，之前项目就因为actionType不对应而出现bug，而这仅仅是因为我手动复制类型时没有注意导致的。

>3、当需要实现一些遮盖视图的效果时，可尝试使用绝对布局，结合相应动画，可以达到原生的一些操作体验。比如项目中食物列表、搜索的排序功能。

## 相关依赖
```
  "dependencies": {
    "react": "^15.1.0",
    "react-native": "^0.27.2",
    "react-native-swiper": "^1.4.4",
    "react-native-vector-icons": "^2.0.2",
    "react-redux": "^4.4.5",
    "redux": "^3.5.2",
    "redux-thunk": "^2.1.0"
  },
```