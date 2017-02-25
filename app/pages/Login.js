/**
 * Created by ljunb on 2017/2/22.
 */
import React, { PureComponent } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import Header from '../components/HomeNavigation'
import Common from '../common/constants'
import RootStore from '../mobx'

export default class Login extends PureComponent {

    accounts = [
        {name: 'QQ', icon: require('../resource/ic_account_qq.png')},
        {name: '微信', icon: require('../resource/ic_account_wechat.png')},
        {name: '微博', icon: require('../resource/ic_account_weibo.png')},
        {name: '薄荷', icon: require('../resource/ic_account_boohee.png')}
    ]

    componentWillMount() {
        if (RootStore.barStyle == 'light-content') RootStore.barStyle = 'default'
    }

    _onBack = () => {
        const {navigator, onResetBarStyle} = this.props
        onResetBarStyle && onResetBarStyle()
        navigator.pop()
    }

    _renderAccountView = (account, key) => {
        const {name, icon} = account
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                key={`${name}-${key}`}
                onPress={()=>alert(name)}
                style={styles.accountItem}
            >
                <Image style={{width: 50, height: 50, marginBottom: 5}} source={icon}/>
                <Text style={{color: '#999999', fontSize: 13}}>{name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Header
                    title="登录"
                    leftIconAction={this._onBack}
                    leftIcon={require('../resource/ic_back_dark.png')}
                />
                <View style={styles.content}>
                    <Text style={{textAlign: 'center'}}>不用注册，用以下账号直接登录</Text>
                    <View style={styles.accountWrapper}>
                        {this.accounts.map(this._renderAccountView)}
                    </View>
                    <Text style={{textAlign: 'center'}}>没有以上账号？</Text>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={styles.registerBtn}
                    >
                        <Text style={{fontSize: 16, color: 'red'}}>注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 50
    },
    accountWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    accountItem: {
        alignItems: 'center'
    },
    registerBtn: {
        width: Common.window.width * 0.4,
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})