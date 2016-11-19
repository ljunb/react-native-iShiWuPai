/**
 * Created by ljunb on 2016/11/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const {height, width} = Dimensions.get('window');
const CHANNEL_HEIGHT = 150;
const ANIMATION_DURATION = 200;

export default class ShareView extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.shareChannelItemOnPress = this.shareChannelItemOnPress.bind(this);
        this.state = {
            isShow: false,
            shareContent: '',
            coverOpacityValue: new Animated.Value(0),
            coverPositionLeftValue: new Animated.Value(0),
            channelBottomValue: new Animated.Value(0),
        }
    }

    share(shareContent) {
        this.setState({
            isShow: true,
            shareContent
        });
        Animated.parallel([
            Animated.timing(this.state.coverOpacityValue, {
                toValue: 1,
                duration: ANIMATION_DURATION
            }),
            Animated.timing(this.state.channelBottomValue, {
                toValue: 1,
                duration: ANIMATION_DURATION
            })
        ]).start();
    }

    close() {
        Animated.sequence([
            Animated.timing(this.state.channelBottomValue, {
                toValue: 0,
                duration: ANIMATION_DURATION
            }),
            Animated.timing(this.state.coverPositionLeftValue, {
                toValue: 1,
                duration: ANIMATION_DURATION,
            })
        ]).start(()=>{
            this.state.coverPositionLeftValue.setValue(0);
            this.state.coverOpacityValue.setValue(0);
            this.setState({isShow: false})
        });
    }

    shareChannelItemOnPress(channelName) {
        alert(channelName)
    }

    render() {
        if (!this.state.isShow) return null;

        let styleProps = {
            coverOpacityValue: this.state.coverOpacityValue,
            coverPositionLeft: this.state.coverPositionLeftValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width]
            }),
            channelPositionBottom: this.state.channelBottomValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-CHANNEL_HEIGHT, 0]
            })
        };
        let channelProps = {
            shareChannels: ['QQ', '微信', '朋友圈', '新浪微博'],
            channelImages: []
        };

        return (
            <ChannelContainer
                {...styleProps}
                {...channelProps}
                coverViewOnPress={this.close}
                shareChannelItemOnPress={this.shareChannelItemOnPress}
            />
        )
    }
}

const ChannelContainer = ({
    coverOpacityValue,
    coverPositionLeft,
    channelPositionBottom,
    coverViewOnPress,
    shareChannels,
    shareChannelItemOnPress
}) => {
    return (
        <Animated.View style={[styles.container, {opacity: coverOpacityValue, left: coverPositionLeft}]}>
            <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={coverViewOnPress}
            />
            <Animated.View style={[styles.shareChannel, {bottom: channelPositionBottom}]}>
                {shareChannels.map((channelName, index) => {
                    return (
                        <TouchableOpacity
                            key={`${channelName}-${index}`}
                            onPress={()=>shareChannelItemOnPress(channelName)}
                        >
                            <Text>{channelName}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: height,
        backgroundColor: 'rgba(1,1,1,0.5)'
    },
    shareChannel: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: CHANNEL_HEIGHT,
        backgroundColor: '#d5d5d5'
    }
});