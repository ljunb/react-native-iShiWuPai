## iShiWuPai
iShiWuPai是基于React Native实现的展示型美食类APP。该分支针对原生新版食物派开发，主要针对Mobx练习，不做商业用途。目前已适配iOS和Android两端。

## 运行截图
![食物百科](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/food.png)
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/feed.png)
![逛吃](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/feed4.png)
![我的](https://github.com/ljunb/react-native-iShiWuPai/blob/alpha/screenshot/profile.png)

## 运行

```
$ git clone -b alpha https://github.com/ljunb/react-native-iShiWuPai.git
$ cd react-native-iShiWuPai 
$ npm install
$ react-native link
$ react-native run-ios/run-android
```

## 相关依赖
```
    "dependencies": {
        "mobx": "^2.7.0",
        "mobx-react": "^4.0.3",
        "react": "^15.4.0",
        "react-native": "^0.39.2",
        "react-native-camera": "^0.4.1",
        "react-native-easy-toast": "^1.0.5",
        "react-native-scrollable-tab-view": "^0.6.0",
        "react-redux": "^4.4.6",
        "redux": "^3.6.0",
        "redux-thunk": "^2.1.0"
      },
      "devDependencies": {
        "babel-plugin-transform-decorators-legacy": "^1.3.4",
        "babel-preset-react-native-stage-0": "^1.0.1"
      }
```