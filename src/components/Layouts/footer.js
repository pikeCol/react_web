import React, { Fragment } from 'react'
// import classNames from 'classnames'
import styles from '@less/layouts/footer'
import { Icon, Layout } from 'antd'
const { Footer } = Layout
const links = [
  {
    key: 'Pro 首页',
    title: 'Pro 首页',
    href: 'http://pro.ant.design',
    blankTarget: true
  },
  {
    key: 'github',
    title: <Icon type='github' />,
    href: 'https://github.com/ant-design/ant-design-pro',
    blankTarget: true
  },
  {
    key: 'Ant Design',
    title: 'Ant Design',
    href: 'http://ant.design',
    blankTarget: true
  }
]
const GlobalFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div className={styles.globalFooter}>
        {links && (
          <div className={styles.links}>
            {links.map(link => (
              <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                {link.title}
              </a>
            ))}
          </div>
        )}
        <div className={styles.copyright}>
          <Fragment>
            新零售 Copyright <Icon type='copyright' />2018 by 企加云
          </Fragment>
        </div>
      </div>
    </Footer>
  )
}

export default GlobalFooter
