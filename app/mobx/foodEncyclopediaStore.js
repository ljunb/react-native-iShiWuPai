/**
 * Created by ljunb on 2016/12/14.
 */
import {observable} from 'mobx'

class FoodEncyclopediaStore {
    @observable foodCategories = []
    @observable isFetchingFoodCategories = true
    @observable errorMsg = ''

    fetchCategories() {
        this.isFetchingFoodCategories = true

        const URL = 'http://food.boohee.com/fb/v1/categories/list'
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                this.isFetchingFoodCategories = false
                this.foodCategories = responseData.group
            })
            .catch(error => {
                this.foodCategories = []
                this.isFetchingFoodCategories = false
                this.errorMsg = '请求出错'
                console.log(`Fetch food categories error ${error}`)
            })
    }
}

const foodEncyclopediaStore = new FoodEncyclopediaStore()
export default foodEncyclopediaStore