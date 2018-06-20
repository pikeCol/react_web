import {globalVariable} from '../config/app'

const local = {
  host: globalVariable.test + '/',
  getUser: {
    method: 'get',
    url: 'users'
  }
}

const API = {
  host: globalVariable.url + '/eis/v1/',
  login: {
    method: 'post',
    url: 'loginService/login'
  }
}

export default {
  local,
  API
}
