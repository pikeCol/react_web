/**
 * Created with
 * Author:  方治刚
 * Version: 1.0.0
 * Date: 2018/05/16 上午9:40
 * Description:  数据存储
 * Copyright(C), 企加云北京分公司
 */

import jwt from 'jwt-simple'
let jwtSecret = '309dd1eed5e10a2aa38eb7a31ee932bb'

/**
 * 根据name 获取值
 * @param {*} key
 * @returns {String} val
 */
export const getToken = (key) => {
  let tokenStr = ''
  let user = getStore('users')
  if (user) {
    tokenStr = user[key] || ''
  }
  return tokenStr
}

/**
 *写入 sessionStorage
 * @param name     名称
 * @param content  内容
 */
export const setStore = (name, content) => {
  if (!name || !content) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  content = jwtEncode(content)
  window.sessionStorage.setItem(name, content)
}

/**
 *获取 sessionStorage
 * @param name  获取的名称
 */
export const getStore = (name) => {
  let obj = ''
  if (!name) return
  let content = window.sessionStorage.getItem(name)
  let val = jwtDncode(content)
  if (val) {
    obj = JSON.parse(val)
  }
  return obj
}

/**
 * 删除
 * @param name
 */
export const removeStore = (name) => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 *加密
 * @param payload 内容
 */
export const jwtEncode = (payload) => {
  let valStr = ''
  if (payload) {
    valStr = jwt.encode(payload, jwtSecret)
  }
  return valStr
}

/**
 * 解密
 * @param payload 内容
 */
export const jwtDncode = (payload) => {
  let valStr = ''
  if (payload) {
    valStr = jwt.decode(payload, jwtSecret)
  }
  return valStr
}
