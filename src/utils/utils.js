export const util = {
  //  获取url拼接参数
  queryUrl: function () {
    var query = {}
    var url = window.location.hash
    var queryStr = url.split('?')[1]
    var queryArr = queryStr.split('&')
    for (let key of queryArr) {
      query[key.split('=')[0]] = key.split('=')[1]
    }
    return query
  },
  _getUrlParams: function (urlP) {
    let qs = urlP
    let args = {}
    let items = qs.length ? qs.split('&') : [ ]
    let item = null
    let len = items.length
    for (var i = 0; i < len; i++) {
      item = items[i].split('=')
      let name = decodeURIComponent(item[0])
      let value = decodeURIComponent(item[1])
      if (name) {
        args[name] = value
      }
    }
    return args
  },
  // 判断是否是微信浏览器的函数
  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i)) {
      if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
        return true
      }
    }
    return false
  }
}
