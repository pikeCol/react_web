let wx = require('../../static/wxsdk.js')

export const wxsignature = {
  data () {
    return {
      wxConfig: {
        appId: null,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        openId: '',
        // outer_str: '',
        timestamp: null,
        nonceStr: null,
        debug: false,
        signature: ''
      },
      wxShareConfig: {
        shareTitle: '',
        lineLink: '',
        descContent: '',
        imgUrl: ''
      }
    }
  },
  methods: {
    getsignature (tenantId, nonceStr, timestamp, url) {
      var self = this
      this.$Http.getsignature.post({
        tenantId: tenantId,
        nonceStr: nonceStr,
        timestamp: timestamp,
        url: url
      }, true).then(res => {
        if (res.httpcode === 200) {
          self.wxConfig.signature = res.signature
          wx.config(this.wxConfig)
        } else {
          this.$toast(res.httpmsg)
        }
      })
    },
    getAppId (id) {
      var data = {
        tenantId: id
      }
      this.$Http.getTenantAppid.post(data, true).then(res => {
        if (res.httpcode === 200) {
          this.wxConfig.appId = res.appId
          this.wxinit()
        } else {
          this.$toast(res.data.httpmsg)
        }
      })
    },
    getLongUrl (instanceUrl, tenantId) {
      this.$Http.longUrl.get({shortUrl: instanceUrl}).then((res) => {
        this.wxShareConfig.lineLink = res.httpmsg
        this.getAppId(tenantId)
      })
    },
    randomWord (randomFlag, min, max) {
      var str = ''
      let range = min
      let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min
      }
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
      }
      return str
    }
  },
  mounted () {
    let iTimestamp = Date.parse(new Date()) / 1000
    this.wxConfig.timestamp = iTimestamp
    this.wxConfig.nonceStr = this.randomWord(false, 43)
  }
}
