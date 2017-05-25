/**
 * Created by ljunb on 2017/2/25.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native'
import Camera from 'react-native-camera'

const ScannerHeader = ({onPress}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.backBtnWrapper}
                onPress={onPress}
            >
                <Image style={{width: 30, height: 30, marginBottom: 5}}
                       source={require('../resource/ic_back_white.png')}/>
                <Text style={{color: '#fff', fontSize: 18}}>返回</Text>
            </TouchableOpacity>
        </View>
    )
}

const ScannerPromptTitle = () => {
    return (
        <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 22, height: 22}} source={require('../resource/ic_scan_gray.png')}/>
            <Text style={{color: '#fff', fontSize: 18}}>请将食物条形码放入圈内</Text>
        </View>
    )
}

export default class Scanner extends Component {

    state = {
        isBarCodeRead: false
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    _onBack = () => this.props.navigator.pop()

    _onBarCodeRead = obj => {
        const {onBarCodeRead, navigator} = this.props
        if (this.state.isBarCodeRead) return

        this.setState({isBarCodeRead: true}, () => {
            this.scannerPrompt.show()
            this.timer = setTimeout(() => {
                navigator.pop()
                onBarCodeRead && onBarCodeRead(obj)

                this.scannerPrompt.hide()
            }, 2500)
        })
    }

    render() {
        return (
            <Camera
                ref={camera => this.camera = camera}
                style={{width: gScreen.width, height: gScreen.height}}
                aspect={Camera.constants.Aspect.fill}
                onBarCodeRead={this._onBarCodeRead}
            >
                <ScannerHeader onPress={this._onBack}/>
                <ScannerPromptTitle/>
                <ScannerAnimatedContent/>
                <ScannerBarCodeReadPrompt ref={s => this.scannerPrompt = s}/>
            </Camera>
        )
    }
}

class ScannerAnimatedContent extends Component {
    state = {
        down: true,
        positionAnimatedValue: new Animated.Value(0)
    }

    componentDidMount() {
        this._startAnimation()
    }

    _startAnimation = () => {
        Animated.timing(this.state.positionAnimatedValue, {
            toValue: this.state.down ? 1 : 0,
            duration: 1500
        }).start(() => {
            this.setState({down: !this.state.down}, () => this._startAnimation())
        })
    }

    render() {
        const positionY = this.state.positionAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, gScreen.width * 0.7 - 2]
        })
        return (
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image
                    style={styles.scanArea}
                    source={require('../resource/img_scan_area.png')}
                >
                    <Animated.Image
                        style={[styles.scanLine, {top: positionY}]}
                        source={require('../resource/img_scan_line.png')}
                        resizeMode="contain"
                    />
                </Image>
            </View>
        )
    }
}

class ScannerBarCodeReadPrompt extends Component {

    state = {
        isShow: false
    }

    show = () => this.setState({isShow: true})

    hide = () => this.setState({isShow: false})

    render() {
        if (!this.state.isShow) return null

        return (
            <View style={styles.scanPromptWrapper}>
                <View style={styles.scanPrompt}>
                    <Text style={{color: '#fff', fontSize: 19}}>扫描成功！</Text>
                    <Text style={{color: '#fff', fontSize: 19, marginTop: 10}}>正在为您跳转页面，请稍等!</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: gScreen.navBarHeight,
        paddingTop: gScreen.navBarPaddingTop,
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    backBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: gScreen.isIOS ? 44 : 50
    },
    scanArea: {
        height: gScreen.width * 0.7,
        width: gScreen.width * 0.7
    },
    scanLine: {
        position: 'absolute',
        height: 2,
        width: gScreen.width * 0.7,
        left: 0
    },
    scanPromptWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanPrompt: {
        width: gScreen.width * 0.7 + 10 * 2,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'rgba(1, 1, 1, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})