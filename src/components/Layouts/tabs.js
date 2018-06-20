import React from 'react'
import { Tabs } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { getMenuData } from '../../utils/menu'
const { TabPane } = Tabs

@inject('store')
@observer
class TabsM extends React.Component {
  constructor (props) {
    super(props)
    this.store = this.props.store.layout
  }

  componentWillReceiveProps () {
    const { pathname } = this.props.history.location
    const { updateTabsList } = this.store
    const menuData = getMenuData()
    if (pathname === '/') {
      return false
    }
    let nameAray = pathname.split('/')
    const children = menuData.filter(item => item.path === `/${nameAray[1]}`)
    let obj = {}
    if (nameAray.length > 3) {
      obj = children[0].children.filter(item => item.path === `/${nameAray[1]}/${nameAray[2]}`)
      obj = obj[0].children.filter(item => item.path === pathname)
    } else {
      obj = children[0].children.filter(item => item.path === pathname)
    }
    let data = { title: obj[0].name, content: '', key: pathname }
    updateTabsList(data)
  }

  onChange = (activeKey) => {
    this.props.history.push(activeKey)
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  remove = (targetKey) => {
    const { delTabsItem } = this.store
    delTabsItem(targetKey)
    const { activeKey } = this.store.tabs
    this.props.history.push(activeKey)
  }

  render () {
    const { activeKey, list } = this.store.tabs
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={activeKey}
        type='editable-card'
        onEdit={this.onEdit}
        style={{margin: '24px 15px 0'}}
      >
        {list.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
      </Tabs>
    )
  }
}

export default withRouter(TabsM)
