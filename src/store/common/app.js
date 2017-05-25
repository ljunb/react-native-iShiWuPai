/**
 * Created by ljunb on 2017/5/25.
 */
import {observable, action} from 'mobx'

class App {
    @observable barStyle = 'light-content'

    @action
    updateBarStyle = style => {
        this.barStyle = style
    }
}

export default new App()