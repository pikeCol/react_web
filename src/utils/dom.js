/**
 * Created with
 * Author:  方治刚
 * Version: 1.0.0
 * Date: 2018/05/15 下午2:04
 * Description:
 * Copyright(C),企加云北京分公司
 */

/**
 * 浏览器视口的高度
 */
const getWindowHeight = () => {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

/**
 * 滚动条在Y轴上的滚动距离
 */
const getScrollHeight = () => {
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

/**
 * 获取元素 offset 值
 * @param {*} Node dom 节点
 * @param {*} offset
 */
const getOffset = (Node, offset) => {
  if (!offset) {
    offset = {}
    offset.top = 0
    offset.left = 0
  }
  if (Node === document.body) {
    // 当该节点为body节点时，结束递归
    return offset
  }
  offset.top += Node.offsetTop
  offset.left += Node.offsetLeft
  return getOffset(Node.parentNode, offset)// 向上累加offset里的值
}

/**
 * 检查元素是否包含某一class
 * @param {*} element  dom 节点
 * @param {*} csName   class name
 */
const hasClass = (element, csName) => {
  return element.className.match(RegExp('(\\s|^)' + csName + '(\\s|$)'))
}

/**
 * 删除元素的class
 * @param {*} element dom 节点
 * @param {*} csName
 */
const deleteClass = (element, csName) => {
  if (hasClass(element, csName)) {
    element.className = element.className.replace(RegExp('(\\s|^)' + csName + '(\\s|$)'), ' ')
  }
}

/**
 * 给元素添加class
 * @param {*} element
 * @param {*} csName
 */
const addClass = (element, csName) => {
  if (!hasClass(element, csName)) {
    element.className += ' ' + csName
  }
}

export default {
  getWindowHeight,
  getScrollHeight,
  getOffset,
  deleteClass,
  addClass
}
