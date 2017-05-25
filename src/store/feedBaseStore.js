/**
 * Created by ljunb on 2017/02/28.
 */
import {observable, computed, action, runInAction} from 'mobx'
export default class FeedStore {
    @observable feedList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable isRefreshing = false;
    @observable isNoMore = true;

    constructor(categoryId) {
        this.categoryId = categoryId;
        this.fetchFeedList()
    }

    @action
    fetchFeedList = async () => {
        try {
            if (this.isRefreshing) this.page = 1

            const {feeds, isNoMore} = await this._fetchDataFromUrl();
            runInAction(() => {
                this.isRefreshing = false
                this.errorMsg = ''
                this.isNoMore = isNoMore

                if (this.page == 1) {
                    this.feedList.replace(feeds)
                } else {
                    this.feedList.splice(this.feedList.length, 0, ...feeds);
                }
            })
        } catch (error) {
            this.errorMsg = error
        }
    }

    @computed
    get isFetching() {
        return this.feedList.length == 0 && this.errorMsg == ''
    }

    @computed
    get isLoadMore() {
        return this.page != 1
    }

    _fetchDataFromUrl() {
        return new Promise((resolve, reject) => {
            const URL = `http://food.boohee.com/fb/v1/feeds/category_feed?page=${this.page}&category=${this.categoryId}&per=10`

            fetch(URL).then(response => {
                if (response.status == 200) return response.json();
                return null;
            }).then(responseData => {
                if (responseData) {
                    const {feeds, page, total_pages} = responseData
                    resolve({feeds, isNoMore: page >= total_pages})
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