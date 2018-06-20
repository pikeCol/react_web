/**
 * Created with
 * Author:  方治刚
 * Version: 1.0.0
 * Date: 2018/05/15 上午4:42
 * Description:  http 请求类的封装
 * Copyright(C), 企加云北京分公司
 */
import services from './api.config'
// import qs from 'qs'
// @ts-ignore
const fly = require('flyio')

const isFunction = (fn) => Object.prototype.toString.call(fn) === '[object Function]'

let config = {
  headers: {},
  timeout: 5000,
  withCredentials: false
}
/**
* 遍历处理辅助函数
* @param {Object} object 需要遍历处理的对象或数组
* @param {Function} callback 遍历处理回调函数
* @param {Array} args callback回调函数的附加参数
*/
const objEach = (object, callback, args) => {
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
      for (let value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
      }
    }
  }
  return object
}

const Http = {}

for (let i in services) {
  let service = services[i]
  let serviceHost = service['host']
  Http[i] = {}
  for (let ind in service) {
    if (ind === 'host') {
      continue
    }
    let api = service[ind]
    Http[i][ind] = async function (params, isFormData = false, isNeedStatus = false, headers = {}) {
      let apiUrl = api.url
      let newParams = {}
      if (params && !isFormData) {
        // @ts-ignore
        objEach(params, function (ind, param) {
          if (apiUrl.indexOf('{' + ind + '}') > -1) {
            apiUrl = apiUrl.replace('{' + ind + '}', param)
          } else {
            newParams[ind] = param
          }
        })
      } else {
        newParams = new FormData()
        for (var key in params) {
          newParams.append(key, params[key])
        }
      }
      let data = newParams
      let response = {}
      config.headers = headers
      if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
        try {
          response = await fly[api.method](serviceHost + apiUrl, data, config)
        } catch (e) {
          response = e.response
        }
        if (!isNeedStatus) {
          response = response.data
        }
      } else {
        config.params = newParams
        try {
          response = (await fly[api.method](serviceHost + apiUrl, params))
        } catch (e) {
          response = e.response
        }
        if (!isNeedStatus) {
          response = response.data
        }
      }
      return response
    }
  }
}

export default Http
