/**
 * Created by ljunb on 2016/12/14.
 */
import {observable, runInAction, computed, action} from 'mobx'

class FoodEncyclopediaStore {
    @observable foodCategoryList = []
    @observable errorMsg = ''

    @action
    fetchCategoryList = async() => {
        try {
            const group = await this._fetchDataFromUrl()

            runInAction(() => {
                this.foodCategoryList.replace(group)
                this.errorMsg = ''
            })
        } catch (error) {
            this.errorMsg = error
        }
    }

    @computed
    get isFetching() {
        return this.foodCategoryList.length == 0 && this.errorMsg == ''
    }

    @computed
    get isNoResult() {
        return this.foodCategoryList.length == 0
    }

    _fetchDataFromUrl() {
        return new Promise((resolve, reject) => {
            const URL = 'http://food.boohee.com/fb/v1/categories/list'
            fetch(URL).then(response => {
                if (response.status == 200) return response.json()
                return null
            }).then(responseData => {
                if (responseData) {
                    resolve(responseData.group)
                } else {
                    reject('请求出错！')
                }
            }).catch(error => {
                console.log(`Fetch category error: ${error}`)
                reject('网络出错！')
            })
        })
    }
}

const foodEncyclopediaStore = new FoodEncyclopediaStore()
export default foodEncyclopediaStore