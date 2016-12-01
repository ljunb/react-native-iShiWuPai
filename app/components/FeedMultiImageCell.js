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

const FeedMultiImageCell = ({
    title,
    source,
    viewCount,
    images,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{width: screenW, padding: 15, marginTop: 15, backgroundColor: '#fff'}}
            onPress={onPress}
        >
            <Text numberOfLines={1} style={{width: screenW - 15 * 2, fontSize: 15}}>{title}</Text>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
                {images.map((img, i) => {
                    return (
                        <Image
                            key={`${img}-${i}`}
                            style={{height: 80, width: (screenW - 15 * 2 - 10 * 2) / 3}}
                            source={{uri: img}}
                            defaultSource={require('../resource/img_news_default.png')}
                        />
                    )
                })}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{source}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                    <Image
                        style={{width: 14, height: 14, marginRight: 3}}
                        source={require('../resource/ic_feed_watch.png')}
                    />
                    <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{viewCount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default FeedMultiImageCell;