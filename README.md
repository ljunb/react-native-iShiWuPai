## iShiWuPai

如果你通过外链来到这个页面，本人要先表示感谢！项目其实很早就开始了，基本是自己学习`React Native`，并整合`Redux`和`MobX`的简单记录。正如你所见，项目并没有继续更新了，没有太多外因，权且理解为自己把重心稍微偏向了生活其他方面上。所以随着版本更新，项目是否能完美运行也是未知数，大家有兴趣可以按需查看源码。再次感谢各位的支持！感谢开源！

> 附：[RNProjectPlayground](https://github.com/ljunb/RNProjectPlayground) 是刚开不久的仓库，主要是 `MobX` 和 `MST` 相关，也加入了混编部分，处理的是导航这方面；接口数据是与本仓库一致的，有兴趣可以移步查看。里面的 [`demos`](https://github.com/ljunb/RNProjectPlayground/tree/master/src/pages/demos) 目录，是自己一些实践尝试，一般与项目无关。

------------

iShiWuPai是基于React Native实现的展示型美食类APP。该分支针对原生新版食物派开发，数据来源于[【薄荷】](http://www.boohee.com/)，主要针对MobX练习，不做商业用途。目前已适配iOS和Android两端，适合刚入门React Native的朋友学习。Enjoy it！🎉🎉🎉

## 运行截图
![食物百科](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/food.png)
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/feed.png)
![资讯详情](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/info_detail.png)
![食物分类](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/foods.png)
![我的](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/profile.png)

## 现有功能点
1. 食物百科、食物列表、二维码扫描、逛吃、逛吃详情、我的和登录等界面的UI搭建
2. 基于MobX实现状态栏颜色和数据管理
3. 二维码扫描成功添加等待提示
4. 网络状态检测高阶组件NetInfoDecorator的初级使用
5. 逛吃顶部Tab标题切换时，添加scale和color动画

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
