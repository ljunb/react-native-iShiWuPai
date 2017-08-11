## iShiWuPai
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