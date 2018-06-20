import {util} from '../utils/utils'

export const myMixin = {
  data () {
    return {
      decode_url: {
        url: ''
      }
    }
  },
  mounted () {
    const queryUrl = util.queryUrl()
    this.decode_url.url = (queryUrl.code.replace(/%20/g, '+'))
    // console.log(this.decode_url.url, 1111111111111)
  },
  methods: {
    _getBaseUrl () {
      return new Promise((resolve, reject) => {
        this.$Http.deCodeSection.get({
          url: decodeURIComponent(this.decode_url.url)
        }).then((res) => {
          if (res.httpcode === 200 && res.httpmsg) {
            var data = util._getUrlParams(res.httpmsg)
            this.$store.dispatch('setData', data)
            resolve(data)
          } else {
            reject(res)
          }
        })
      })
    }
  }
}
