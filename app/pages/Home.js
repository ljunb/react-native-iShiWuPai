/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Constant from '../common/constants';
import HomeNavigation from '../components/HomeNavigation';

const titles = ['首页', '评测', '知识', '美食'];

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTitle: '逛吃'
        }
    }

    render() {
        return (
            <View>
                <HomeNavigation
                    titleView={()=>
                        <Image
                            style={{width: 60, height: 30}}
                            source={require('../resource/ic_feed_nav.png')}
                            resizeMode="contain"
                        />
                    }
                    leftIcon={require('../resource/ic_feed_search.png')}
                    leftIconAction={()=>alert('left')}
                    rightIcon={require('../resource/ic_feed_camera.png')}
                    rightIconAction={()=>alert('right')}
                />
                <View style={styles.titleContainer}>
                    {titles.map((title, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                activePacity={0.75}
                                style={styles.title}
                                onPress={()=>alert('change')}
                            >
                                <Text>{title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <ScrollView

                >

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    titleContainer: {
        height: 40,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#ccc'
    },

    title: {
        width: Constant.window.width / 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})