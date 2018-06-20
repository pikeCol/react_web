import services from '../servers/api.config'
import axios from 'axios'
import {message} from 'antd'
const https = require('https')

const isFunction = fn => Object.prototype.toString.call(fn) === '[object Function]'

/**
 *@param {Object}|{Array} object 需要遍历处理的对象或数组
 *@param {Function} callback 遍历处理回调函数
 *@param {Array} args callback回调函数的附加参数
 */
const each = (object, callback, args) => {
  let name
  let i = 0
  let length = object.length
  let isObj = length === undefined || isFunction(object)
  if (args) {
    if (isObj) {
      for (name in object) {
        if (callback.apply(object[name], args) === false) {
          break
        }
      }
    } else {
      for (; i < length;) {
        if (callback.apply(object[i++], args) === false) {
          break
        }
      }
    }
  } else {
    if (isObj) {
      for (name in object) {
        if (callback.call(object[name], name, object[name]) === false) {
          break
        }
      }
    } else {
      for (let value = object[ 0 ]; i < length && callback.call(value, i, value) !== false; value = object[ ++i ]) {}
    }
  }
  return object
}
/**
 *错误的信息定义
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
/**
 * 请求 type
 */
const contentTypes = {
  1: 'application/x-www-form-urlencoded',
  2: 'multipart/form-data',
  3: 'application/json',
  4: 'text/xml'
}
/**
 * 检查请求返回的状态
 * @param {*} response
 */
const checkStatus = response => {
  if (response && response.status <= 200) {
    return response.data
  }
  let errorStr = '获取数据失败，请刷新再试试！'
  const errortext = response !== undefined ? codeMessage[ response.status ] || errorStr : errorStr
  message.error(errortext)
  // const error = new Error(errortext)
  // error.response = response
  // throw response
  return response
}
const Agent = new https.Agent({
  rejectUnauthorized: false
})

let jrAxios = axios.create({
  timeout: 5000,
  httpsAgent: Agent,
  withCredentials: false
})

const Http = {}

for (let i in services) {
  let service = services[ i ]
  let serviceHost = service[ 'host' ]
  Http[ i ] = {}
  for (let ind in service) {
    if (ind === 'host') {
      continue
    }
    let api = service[ ind ]
    Http[ i ][ ind ] = async function (params, contentType = 3) {
      let apiUrl = api.url
      let newParams = {}
      if (params && contentType === 3) {
        each(params, function (ind, param) {
          if (apiUrl.indexOf('{' + ind + '}') > -1) {
            apiUrl = apiUrl.replace('{' + ind + '}', param)
          } else {
            newParams[ ind ] = param
          }
        })
      } else {
        newParams = new FormData()
        for (var key in params) {
          newParams.append(key, params[key])
        }
      }
      let data = newParams
      let config = {
        headers: {
          'Content-type': contentTypes[parseInt(contentType)],
          'token': '123123123123213123'
        }
      }
      let response = {}
      if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
        try {
          response = await jrAxios[ api.method ](serviceHost + apiUrl, data, config)
        } catch (e) {
          response = e.response
        }
      } else {
        config.params = newParams
        try {
          response = (await jrAxios[api.method](serviceHost + apiUrl, config))
        } catch (e) {
          response = e.response
        }
      }
      response = checkStatus(response)
      return response
    }
  }
}
export default Http
