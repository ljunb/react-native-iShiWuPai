/**
 * Created by ljunb on 2017/2/22.
 */
import {observable, runInAction, computed, action} from 'mobx'

class FeedEvaluatingListStore {
    @observable feedEvaluatingList = []
    @observable errorMsg = ''
    @observable page = 1
    @observable isRefreshing = false

    @action
    fetchEvaluatingList = async (page = 1, refreshing = false) => {
        try {
            this.page = page
            this.isRefreshing = refreshing
            const result = await this._fetchDataFromUrl(page)
            this.isRefreshing = false
            runInAction(() => {
                if (page == 1) {
                    this.feedEvaluatingList.replace(result)
                } else {
                    this.feedEvaluatingList.splice(this.feedEvaluatingList.length, 0, ...result);
                }
                this.errorMsg = ''
            })
        } catch (error) {
            this.errorMsg = error
        }
    }

    @computed
    get isFetching() {
        return this.feedEvaluatingList.length == 0 && this.errorMsg == ''
    }

    @computed
    get isNoResult() {
        return this.feedEvaluatingList.length == 0
    }

    @computed
    get isLoadMore() {
        return this.page != 1
    }

    _fetchDataFromUrl(page) {
        return new Promise((resolve, reject) => {
            const URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${page}&category=2&per=10`

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
                console.log(`Fetch evaluating list error: ${error}`)
                reject('网络出错！')
            })
        })
    }
}

const feedEvaluatingListStore = new FeedEvaluatingListStore()
export default feedEvaluatingListStore