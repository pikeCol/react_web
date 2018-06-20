import React, { Component } from 'react'
import { Menu, Icon, Dropdown, Avatar, Divider, Layout, Badge } from 'antd'
import Debounce from 'lodash-decorators/debounce'
import { Link, withRouter } from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import styles from '@less/layouts//header'
import screenfull from 'screenfull'
import * as Storage from '@utils/storage'
const { Header } = Layout

@inject('store')
@observer
class Headers extends Component {
  constructor (props) {
    super(props)
    this.store = props.store.layout
  }

  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request()
    }
  }

  toggle = () => {
    const {toggle} = this.store
    toggle()
  }

  componentWillUnmount () {
    this.triggerResizeEvent.cancel()
  }

  onMenuClick = ({ item, key, keyPath }) => {
    let path = keyPath + ''
    if (path === 'logout') {
      this.logout()
    }
  }

  logout () {
    Storage.removeStore('users')
    this.props.history.push('/login')
  }

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() { 
   const { users } =  this.props.store.users
    const menu = (
      <Menu className='menu' selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    )

    const {collapsed} = this.store
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className={styles.header}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <div className={styles.right}>
          <Menu  mode='horizontal' style={{ lineHeight: '63px',float: 'left'}} >
              <Menu.Item key='full' onClick={this.screenFull}>
               <Icon type='arrows-alt' onClick={this.screenFull} />
            </Menu.Item>
            <Menu.Item key='n'>
              <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                <Icon type='notification' />
              </Badge>
            </Menu.Item>
            </Menu>
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={users.headPic} />
                <span className={styles.name}>{users.name}</span>
              </span>
              </Dropdown>
          </div>
        </div>
      </Header>
    );
  }
}
export default withRouter(Headers)