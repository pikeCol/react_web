
// @ts-ignore
import React, { Component } from 'react'
import styles from '@less/login'
import logo from '@images/login/logo.svg'
import { Link, withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import Http from '../../servers/http'
import md5 from 'md5'
import {inject, observer} from 'mobx-react'
const FormItem = Form.Item

@inject('store')
@observer
class Login extends Component {
  constructor (props) {
    super(props)
    this.store = props.store.users
    this.state = {
      loading: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        this.login(values)
      }
    })
  }

  async login (formVal) {
    const { setUsers } = this.store
    let data = formVal

    data.loginPwd = md5(data.loginPwd)
    let res = await Http.API.login(data, 2)
    this.setState({ loading: false })

    if (res.httpcode <= 200) {
      let data = {
        domain: res.domain,
        tenantId: res.tenantId,
        token: res.token,
        name: res.employee.name,
        headPic: res.employee.headPic
      }
      // 设置登录用户信息
      setUsers(data)
      message.success('登录成功,欢迎再次回来！')
      this.props.history.push('/home/index')
    } else {
      let msg = res.retmsg ? `${res.retmsg},请重新再试!` : `登录出错了，请重新再试!`
      message.warning(msg)
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    let btnLabel = this.state.loading ? '' : '登录'
    return (
      <div className={styles.login}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Link to='/login'>
              <img src={logo} className={styles.logo} />
            </Link>
          </div>
          <div className={styles.loginFrom}>
            <div className={styles.title}>用户登录</div>
            <Form onSubmit={this.handleSubmit} className='login-form'>
              <FormItem>
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: '请输入用户名!' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的用户名' }]
                })(
                  <Input prefix={<Icon type='user' style={{ background: 'rgba(255,255,255,.6)', 'borderRadius': '10px' }} />} placeholder='请输入用户名' autoComplete='off' />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('loginPwd', {
                  rules: [{ required: true, message: '请输入用密码！' }]
                })(
                  <Input prefix={<Icon type='lock' style={{ background: 'rgba(255,255,255,.6)', 'borderRadius': '10px' }} />} type='password' autoComplete='off' placeholder='请输入密码' />
                )}
              </FormItem>
              <FormItem>
                <Button type='primary' htmlType='submit' loading={this.state.loading} className='login-form-button'>
                  {btnLabel}
                </Button>
                <div className={styles.forgot}>
                  <Link to='/'>忘记密码？</Link>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Form.create()(Login))
