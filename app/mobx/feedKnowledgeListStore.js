/**
 * Created by ljunb on 2017/2/22.
 */
import {observable, runInAction, computed, action, reaction} from 'mobx'

class FeedKnowledgeListStore {
    @observable feedKnowledgeList = []
    @observable errorMsg = ''
    @observable page = 1
    @observable isRefreshing = false

    @action
    fetchKnowledgeList = async () => {
        try {
            if (this.isRefreshing) this.page = 1

            const result = await this._fetchDataFromUrl()
            runInAction(() => {
                this.isRefreshing = false
                this.errorMsg = ''

                if (this.page == 1) {
                    this.feedKnowledgeList.replace(result)
                } else {
                    this.feedKnowledgeList.splice(this.feedKnowledgeList.length, 0, ...result);
                }
            })
        } catch (error) {
            this.errorMsg = error
        }
    }

    @computed
    get isFetching() {
        return this.feedKnowledgeList.length == 0 && this.errorMsg == ''
    }

    @computed
    get isNoResult() {
        return this.feedKnowledgeList.length == 0
    }

    @computed
    get isLoadMore() {
        return this.page != 1
    }

    _fetchDataFromUrl() {
        return new Promise((resolve, reject) => {
            const URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${this.page}&category=3&per=10`

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
const feedKnowledgeListStore = new FeedKnowledgeListStore()

reaction(
    () => feedKnowledgeListStore.page,
    () => feedKnowledgeListStore.fetchKnowledgeList()
)

export default feedKnowledgeListStore