/**
 * Created by ljunb on 2016/12/14.
 */
import { observable } from 'mobx'

class FeedStore {
    @observable feedList = []
    @observable isLoading = true

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