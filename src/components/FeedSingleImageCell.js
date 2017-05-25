/**
 * Created by ljunb on 2016/12/1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
const screenW = Dimensions.get('window').width;

const FeedSingleImageItem = ({
    title,
    source,
    viewCount,
    images,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{
                width: screenW,
                padding: 15,
                marginTop: 15,
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'space-between'
            }}
            onPress={onPress}
        >
            <View style={{justifyContent: 'space-between'}}>
                <Text numberOfLines={2} style={{width: screenW * 0.55, fontSize: 15}}>{title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{source}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            style={{width: 14, height: 14, marginRight: 3}}
                            source={require('../resource/ic_feed_watch.png')}
                        />
                        <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{viewCount}</Text>
                    </View>
                </View>
            </View>
            <Image
                style={{height: 80, width: (screenW - 15 * 2 - 10 * 2) / 3}}
                source={{uri: images[0]}}
                defaultSource={require('../resource/img_news_default.png')}
            />
        </TouchableOpacity>
    )
};

export default FeedSingleImageItem;