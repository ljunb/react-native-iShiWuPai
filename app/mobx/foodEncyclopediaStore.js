/**
 * Created by ljunb on 2016/12/14.
 */
import {observable, runInAction, asFlat, computed, autorun} from 'mobx'

class FoodEncyclopediaStore {
    @observable foodCategoryList = asFlat([])
    @observable errorMsg = ''

    fetchCategoryList = async() => {
        try {
            const group = await this.fetchDataFromUrl()
            runInAction('Update UI after fetch category', () => {
                this.foodCategoryList = group
            })
        } catch (error) {
            this.errorMsg = error
        }
    }

    @computed get isFetchingCategory() {
        return this.foodCategoryList.length == 0 && this.errorMsg == ''
    }

    fetchDataFromUrl() {
        return new Promise((resolve, reject) => {
            const URL = 'http://food.boohee.com/fb/v1/categories/list'
            fetch(URL)
                .then(response => {
                    if (response.status == 200) return response.json()
                    return null
                })
                .then(responseData => {
                    if (responseData) {
                        resolve(responseData.group)
                    } else {
                        reject('请求出错！')
                    }
                })
                .catch(error => {
                    reject('网络出错！')
                    console.log(`Fetch category error: ${error}`)
                })
        })
    }
}

const foodEncyclopediaStore = new FoodEncyclopediaStore()
export default foodEncyclopediaStore