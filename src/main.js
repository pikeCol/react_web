import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import {Provider} from 'mobx-react'
import * as stores from './mobx'
import Layouts from './components/Layouts/layout'
import AuthRoute from './components/Layouts/AuthRoute'
import Login from './views/Login'

// 同步路由与mobx的数据状
// 不允许在动作之外进行状态修改
// useStrict(true)
render((
  <Provider store={stores}>
    <HashRouter>
      <Switch>
        <Route path='/login' exact component={Login} />
        <AuthRoute path='/' component={Layouts} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('app'))
