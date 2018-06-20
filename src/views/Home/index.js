// @ts-ignore
import React, { Component } from 'react'
// @ts-ignore
import {inject, observer} from 'mobx-react'
import { Button, Checkbox, message } from 'antd'

@inject('store')
@observer
class Home extends Component {
  constructor (props) {
    super(props)
    this.store = props.store.demo
  }

  componentDidMount () {
    console.log('被调用了')
    message.error('.....')
    const { fetchData } = this.store
    fetchData()
  }

  delAll () {
    const { emptyData } = this.store
    emptyData()
  }

  add () {
    let data = {
      id: 12,
      name: 'zhigang'
    }
    const { add } = this.store
    add(data)
  }

  del (index) {
    const { indexDel } = this.store
    indexDel(index)
  }
  render () {
    const {items, total} = this.store
    return (
      <div>
        你好{total}
        {
          items.map((item, index) => {
            return <div key={item.id}>{item.name} <button onClick={this.del.bind(this, index)}>删除</button></div>
          })
        }
        <button className="bg" onClick={this.delAll.bind(this)}>清除</button>
        <button onClick={this.add.bind(this)}>添加</button>
        <Button type="primary">xxxxxx</Button>
        <Checkbox>测试</Checkbox>
      </div>
    )
  }
}

export default Home
