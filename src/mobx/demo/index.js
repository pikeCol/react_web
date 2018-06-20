// @ts-nocheck
import {observable, action, computed} from 'mobx'
import Http from '../../servers/http'
class ItemsStore {
  @observable items

  constructor () {
    this.items = []
  }

  @computed get total () {
    return this.items.length || 0
  }

  @action
  fetchData = async () => {
    let res = await Http.local.getUser()
    if (res) {
      this.items = res
    }
  }

  @action
  emptyData = () => {
    this.items = []
  }

  @action
  add = (data) => {
    this.items.push(data)
  }

  @action
  indexDel = (index) => {
    this.items.splice(index, 1)
  }
}

export default new ItemsStore()
