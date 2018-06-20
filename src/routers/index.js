// @ts-ignore
import loadable from 'react-loadable'
// @ts-ignore
import Loading from '@components/Loading'
// 以组件为中心的代码分割和懒加载
export const Home = loadable({
  // @ts-ignore
  loader: () => import('@views/Home'),
  loading: Loading
})

export const Topics = loadable({
  // @ts-ignore
  loader: () => import('@views/Topics'),
  loading: Loading
})

const routes = [
  {
    path: '/home/index',
    exact: true,
    component: Home
  },
  {
    path: '/home/topics',
    exact: true,
    component: Topics
  }
]

export default routes
