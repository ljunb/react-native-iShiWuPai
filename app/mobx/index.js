/**
 * Created by ljunb on 2017/2/22.
 */
import {observable} from 'mobx'

class RootStore {
    @observable barStyle = 'light-content'
}
const rootStore = new RootStore()
export default rootStore