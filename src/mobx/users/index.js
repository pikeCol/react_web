import { observable, action, computed } from 'mobx'
import * as Storage from '../../utils/storage'

class Users {
  // 存储登录后的用户信息
  @observable users = {}
  @observable isLogin = false

  constructor () {
    let users = Storage.getStore('users')
    this.users = users || {}
  }

  /**
   *计算是否登录
   * @param {*} payload
   */
  @computed get checkLogin () {
    this.isLogin = Object.keys(this.users).length > 0
  }
  /**
   *将登录后的用户信息存入users 对象中
   * @param {*} payload
   */
  @action
  setUsers = (payload) => {
    this.users = payload
    Storage.setStore('users', payload)
  }
}

export default new Users()
