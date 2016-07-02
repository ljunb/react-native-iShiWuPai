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
- [x] 食物对比
- [ ] 食物详情
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
![对比](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/compare.png)
![我的](https://github.com/ljunb/react-native-iShiWuPai/blob/master/screenshot/user.png)

## 运行
```
$ git clone https://github.com/ljunb/react-native-iShiWuPai.git
$ cd react-native-iShiWuPai 
$ npm install
$ react-native run-ios
```

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