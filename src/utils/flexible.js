/**
 * Created with
 * Author:  方治刚
 * Version: 1.0.0
 * Date: 2018/05/15 下午3:40
 * Description:  利于rem 布局的辅助方法
 * Copyright(C), 企加云北京分公司
 */

/**
 * 动态像素比
 */
const autoPixelRatio = () => {
  let pixelRatio = 1 / window.devicePixelRatio
  let head = document.getElementsByTagName('head')[0]
  let viewmeta = document.createElement('meta')
  viewmeta.charset = 'utf-8'
  viewmeta.setAttribute('name', 'viewport')
  let content = 'width=device-width, initial-scale=' + pixelRatio + ', maximum-scale=' + pixelRatio + ', minimum-scale=' + pixelRatio + ', user-scalable=no'
  viewmeta.setAttribute('content', content)
  head.appendChild(viewmeta)
}

/**
 * 动态更改html根字体大小从而改变1rem对应px的值
 * @param {number} designImageSize 设计稿的尺寸大小
 */
const autoChangeRootFontSize = (designImageSize = 750) => {
  if (!designImageSize) {
    console.error('请输入设计图尺寸！')
    return false
  }

  const autoRem = () => {
    let docEl = document.documentElement
    let clientWidth = getDocSize().width
    let size = 100 * (clientWidth / designImageSize)
    docEl.style.fontSize = size + 'px'
  }
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(resizeEvt, autoRem, false)
  document.addEventListener('DOMContentLoaded', autoRem, false)
}

/**
 * 获取屏幕尺寸
 */
const getDocSize = () => {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight
  }
}

export default {
  autoPixelRatio,
  autoChangeRootFontSize
}
