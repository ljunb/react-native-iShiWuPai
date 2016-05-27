/**
 * Created by ljunb on 16/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Navigator,
    View,
    ListView,
    Image,
} from 'react-native';
import {fetchBanners, fetchFeeds} from '../actions/strollingActions'
import Common from '../common/constants';
import SearchHeader from '../components/SearchHeader';
import Swiper from 'react-native-swiper';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this._renderRow = this._renderRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (data, sectionID, rowID) => {
                    return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return data[sectionID];
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            })
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchBanners());
        dispatch(fetchFeeds(1));
    }

    render() {

        const {Strolling} = this.props;

        let bannerList = Strolling.bannerList;
        let feedList = Strolling.feedList;
        let sourceData = {'banner': [bannerList], 'feed': feedList}

        let sectionIDs = ['banner', 'feed'];
        let rowIDs = [[0]];

        let row = [];
        for (let i = 0; i < feedList.length; i++) {
            row.push(i);
        }
        rowIDs.push(row)

        return (
            <View>
                <SearchHeader
                    searchAction={()=>alert('search')}
                    scanAction={()=>alert('scan')}
                />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIDs)}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    style={{height: Common.window.height - 64}}
                />
            </View>
        )
    }

    _renderRow(data, sectionID, rowID) {

        if (sectionID == 'banner') {
            let bannerList = data;
            return (
                <Swiper
                    height={200}
                    loop={true}
                    autoplay={bannerList.length > 1}
                    dot={<View style={styles.customDot} />}
                    activeDot={<View style={styles.customActiveDot} />}
                    paginationStyle={{
                        bottom: 10
                    }}
                >
                    {bannerList.map((banner) => {
                        return (
                            <TouchableOpacity key={banner.name} activeOpacity={0.75}>
                                <Image
                                    style={styles.bannerImage}
                                    source={{uri: banner.image_key}}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </Swiper>
            )
        } else {
            let feedCellStyle = [styles.feedCell];
            let sourceFontStyle = [styles.sourceFont];
            let plainContentStyle = [styles.plainContent];
            let plainPVFontStyle = [styles.plainPVFont];
            if (data.background) {
                feedCellStyle.push({height: 200})
                sourceFontStyle.push({color: 'white'})
                plainContentStyle.push({color: 'white'})
                plainPVFontStyle.push({color: 'white'})
            }

            return (
                <View style={feedCellStyle}>
                    {data.background ?
                        <Image
                            style={styles.feedImage}
                            source={{uri: data.background}}
                        >
                            <View style={styles.plainTitleContainer}>
                                <Text style={sourceFontStyle}>{data.source}</Text>
                            </View>
                            <Text style={plainContentStyle}>{data.title}</Text>
                            <Text style={plainPVFontStyle}>{data.tail}</Text>
                        </Image>
                        :
                        <View style={styles.plainFeed}>
                            <View style={styles.plainTitleContainer}>
                                <Text style={sourceFontStyle}>{data.source}</Text>
                            </View>
                            <Text style={plainContentStyle}>{data.title}</Text>
                            <Text style={plainPVFontStyle}>{data.tail}</Text>
                        </View>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    bannerImage: {
        height: 200,
        width: Common.window.width,
    },

    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    feedCell: {
        padding: 15,
        paddingBottom: 0,
    },

    feedImage: {
        height: 185,
        width: Common.window.width - 15 * 2,
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
        borderRadius: 2,
        paddingLeft: 15,
        paddingTop: 40,
    },

    plainFeed: {
        paddingLeft: 15,
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
        borderRadius: 2,
        backgroundColor: 'white',
    },

    plainTitleContainer: {
        marginTop: 30,
        paddingLeft: 5,
        borderLeftColor: 'red',
        borderLeftWidth: 2,
    },

    sourceFont: {
        color: 'gray',
        fontSize: 13,
    },

    plainContent: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 15,
    },

    plainPVFont: {
        marginTop: 20,
        marginBottom: 20,
        color: 'gray',
        fontSize: 13,
    }
})