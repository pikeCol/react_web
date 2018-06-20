// @ts-nocheck
import {observable, action, computed} from 'mobx'
class LayoutStore {
  // 左侧菜单收起状态
  @observable collapsed
  // loading 加载状态
  @observable loading
  // 快捷选项卡
  @observable tabs = {activeKey: '', list: []}

  constructor () {
    this.collapsed = false
    this.loading = false
  }

  @computed
  get total () {
    return this.collapsed
  }

  @action
  toggle = () => {
    this.collapsed = !this.collapsed
  }

  @action
  updateLoading = () => {
    this.loading = !this.loading
  }

  @action
  checkedTabsActiveKey = (activeKey) => {
    this.tabs.activeKey = activeKey
  }

  @action
  updateTabsList = (payload) => {
    let list = this.tabs.list
    const findList = list.find(tab => tab.key === payload.key)
    if (!findList) {
      this.tabs.list.push(payload)
    }
    this.tabs.activeKey = payload.key
  }

  @action
  updateTabsActiveKey = (activeKey) => {
    this.tabs.activeKey = activeKey
  }

  @action
  delTabsItem = (targetKey) => {
    let { activeKey, list } = this.tabs
    let lastIndex
    list.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = list.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    this.tabs = {
      list: panes,
      activeKey
    }
  }
}

export default new LayoutStore()
