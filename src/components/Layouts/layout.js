
import React from 'react'
import { Layout, BackTop } from 'antd'
import { MyLayout } from '../../components'
import { renderRoutes } from 'react-router-config'
import routers from '../../routers'
import { HashRouter } from 'react-router-dom'
import Loading from '../Loading'
import Tabs from './tabs'
const { Content } = Layout

class Layouts extends React.Component {
  render () {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <BackTop />
          {/* 左侧但航栏 */}
          <MyLayout.SiderMenu />
          <Layout>
            {/* head */}
            <MyLayout.Headers />
            {/* 快捷菜单操作 */}
            <Tabs />
            {/* 中间部分 */}
            <Content style={{ margin: '0 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Loading>
                <HashRouter>
                  {renderRoutes(routers)}
                </HashRouter>
              </Loading>
            </Content>
            <MyLayout.Footer />
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Layouts
