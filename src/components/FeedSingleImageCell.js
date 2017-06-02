/**
 * Created by ljunb on 2016/12/1.
 */
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

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
            style={styles.container}
            onPress={onPress}
        >
            <View style={{justifyContent: 'space-between'}}>
                <Text numberOfLines={2} style={styles.title}>{title}</Text>
                <View style={styles.content}>
                    <Text style={{color: 'rgb(150,150,150)', fontSize: 13}}>{source}</Text>
                    <View style={styles.imgWrapper}>
                        <Image
                            style={styles.feedIcon}
                            source={require('../resource/ic_feed_watch.png')}
                        />
                        <Text style={styles.viewCount}>{viewCount}</Text>
                    </View>
                </View>
            </View>
            <Image
                style={styles.image}
                source={{uri: images[0]}}
                defaultSource={require('../resource/img_news_default.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: gScreen.width,
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    title: {
        width: gScreen.width * 0.55,
        fontSize: 15
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 80,
        width: (gScreen.width - 15 * 2 - 10 * 2) / 3
    },
    feedIcon: {
        width: 14,
        height: 14,
        marginRight: 3
    },
    viewCount: {
        color: 'rgb(150,150,150)',
        fontSize: 13
    }
})

export default FeedSingleImageItem