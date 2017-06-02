/**
 * Created by ljunb on 2017/02/28.
 */
import {observable, computed, action, runInAction} from 'mobx'
import {get} from '../common/HttpTool'

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
            const url = 'http://food.boohee.com/fb/v1/feeds/category_feed'
            const params = {
                page: this.page,
                category: this.categoryId,
                per: 10
            }
            const responseData = await get({url, params, timeout: 30}).then(res => res.json())
            const {feeds, page, total_pages} = responseData

            runInAction(() => {
                this.isRefreshing = false
                this.errorMsg = ''
                this.isNoMore = page >= total_pages

                if (this.page === 1) {
                    this.feedList.replace(feeds)
                } else {
                    this.feedList.splice(this.feedList.length, 0, ...feeds);
                }
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }

    @computed
    get isFetching() {
        return this.feedList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}