## iShiWuPai
iShiWuPai是基于React Native实现的展示型美食类APP。该分支针对原生新版食物派开发，主要针对Mobx练习，不做商业用途。目前已适配iOS和Android两端。如有问题和改进意见，欢迎提issue和pr一起讨论学习。

## 运行截图
![食物百科](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/food.png)
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/feed.png)
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/feed4.png)
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/foods.png)
![我的](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/profile.png)

## 现有功能点
1. 食物百科、食物列表、二维码扫描、逛吃、逛吃详情、我的和登录等界面的UI搭建
2. 引入Mobx，目前食物百科、逛吃分类已使用Mobx管理数据，请求方面分页加载的思路，是采用reaction函数来监听page的变化进行处理
3. 二维码扫描成功添加等待提示
4. 基于Mobx实现状态栏颜色管理
5. 网络状态检测高阶组件NetInfoDecorator的初级使用

## 运行

```
$ git clone https://github.com/ljunb/react-native-iShiWuPai.git
$ cd react-native-iShiWuPai 
$ npm install
$ react-native run-ios/run-android
```

## 相关第三方库
1. [mobx](https://github.com/mobxjs/mobx)
2. [mobx-react](https://github.com/mobxjs/mobx-react)
3. [react-native-camera](https://github.com/lwansbrough/react-native-camera)
4. [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)
5. [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)