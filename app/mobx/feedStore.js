/**
 * Created by ljunb on 2016/12/14.
 */
import {observable, asMap, action, runInAction} from 'mobx'

class FeedStore {
    @observable feedData = asMap({})
    @observable isFetching = true
    @observable isLoadMore = false
    @observable errorMsg = ''

    @action
    fetchFeedList = async(categoryId, page) => {
        try {
            this.isFetching = page == 1
            this.isLoadMore = page != 1
            const result = await this._fetchDataFromServer(categoryId, page)

            runInAction(() => {
                if (page == 1) {
                    this.feedData[categoryId] = result
                } else {
                    // {}里面的[]长度变化，监听不到吗？
                    // this.feedData[categoryId] = [...this.feedData[categoryId], ...result]
                    this.feedData[categoryId].splice(this.feedData[categoryId].length, 0, ...result);
                }
                alert(this.feedData[categoryId])

                this.isFetching = false
            })
        } catch (error) {
            this.errorMsg = error
            this.isFetching = false
        }
    }

    _fetchDataFromServer(categoryId, page) {
        return new Promise((resolve, reject) => {
            const URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${page}&category=${categoryId}&per=10`

            fetch(URL).then(response => {
                if (response.status == 200) return response.json()
                return null
            }).then(responseData => {
                if (responseData) {
                    resolve(responseData.feeds)
                } else {
                    reject('请求出错！')
                }
            }).catch(error => {
                console.log(`Fetch feed list error: ${error}`)
                reject('网络出错！')
            })
        })
    }

    fetchFeedList(page, categoryId) {
        this.isLoading = true

        let URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${page}&category=${categoryId}&per=10`
        fetch(URL)
            .then(response => response.json)
            .then(responseData => {
                this.feedList = page == 1 ? responseData.feeds : this.feedList.concat(responseData.feeds)
            })
            .catch(error => alert(error))
    }
}

const feedStore = new FeedStore()
export default feedStore