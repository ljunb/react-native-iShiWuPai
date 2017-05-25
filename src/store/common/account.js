/**
 * Created by ljunb on 2017/5/25.
 */
import {observable} from 'mobx'

class Account {
    @observable name = ''
}

export default new Account()