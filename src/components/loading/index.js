import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Spin } from 'antd'
import NProgress from 'nprogress'
import '../../assets/less/common/loading'
import * as Storage from '@utils/storage'

@withRouter
@inject('store')
@observer
class Loading extends Component {
  constructor (props) {
    super(props)
    this.store = props.store.layout
  }

  componentDidMount () {
    let users = Storage.getStore('users')
    window.users = users
    const isAuthenticated = Object.keys(users).length > 0
    if (!isAuthenticated) {
      this.props.history.push('/login')
    }
  }
  componentDidUpdate () {
    if (this.store.loading) {
      setTimeout(() => {
        this.store.updateLoading(false)
        NProgress.done(true)
      }, 1000)
    }
  }
  componentWillReceiveProps () {
    NProgress.start()
    this.store.updateLoading()
  }
  shouldComponentUpdate (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      return true
    }
  }
  render () {
    return (
      <Spin tip='加载中...' wrapperClassName='Loading_wrap' spinning={this.store.loading}>
        {this.props.children}
      </Spin>
    )
  }
}

export default Loading
