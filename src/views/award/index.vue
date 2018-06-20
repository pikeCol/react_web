<template>
  <div id="award">
    <div v-if="mydata.isWin==1" class="failed_bg">
      <p class="failed_word">{{failed_word[0]}}</p>
      <a class="failed_back" @click="back"></a>
    </div>
    <div class="award_bg" v-if="mydata.isWin==0">
      <div class="award_sec">
        <img class="coin_icon" src="../../assets/images/award/icon.png" alt="">
        <p class="award_name">{{mydata.bonusPoints}}积分</p>
      </div>
      <div class="award_desc">
        <h3>奖励说明</h3>
        <p>{{mydata.desc}}</p>
        <span v-if="mydata.isPointPermanet==='0'">奖励有效期{{startDate}}-{{mydata.pointValidAfterDays}}</span>
        <span v-if="mydata.isPointPermanet==='1'">奖励永久效</span>
      </div>
    </div>
  </div>
</template>
<script>
import {util} from '../../utils/utils'
import { globalVariable } from '../../config/app'
import moment from 'moment'
let Tida = window.Tida
export default {
  data () {
    return {
      memberId: '',
      startDate: '',
      bg: '',
      failed_word: ['活动已经结束', '您的奖励次数已用完!'],
      mydata: {
        isWin: 0
      }
    }
  },
  methods: {
    init () {
      // http://192.168.4.140:8000/v1/scene/lotteryDetail/bargainContentDetail?sourceId=56&memberId=264&tenantId=12818
      // var url = 'http://192.168.4.140:8000/v1/scene/lotteryDetail/bargainContentDetail?sourceId=56&memberId=264&tenantId=12818'
      this.$Http.lotteryContentDetail.get({
        sourceId: 56,
        memberId: 264,
        tenantId: 12818
      }, true).then(res => {
        if (res.httpcode === 200) {
          this.mydata = res.lotteryPrizeVO
        } else {
          this.$dialog.alert({
            title: '错误提示',
            message: res.httpmsg,
            closeOnClickOverlay: true,
            overlay: true,
            showConfirmButton: false
          })
        }
      })
    },
    back () {
      var url = util.queryUrl()
      console.log(url)
    }
  },
  mounted () {
    this.startDate = moment().format('YYYY-MM-DD')
    var memberId = localStorage.getItem('memberId')
    alert(memberId)
    if (memberId) {
      this.memberId = memberId
      this.init()
      return
    }
    var myurl = encodeURIComponent(window.location.href)
    // 先调登录  判断会员信息
    let jumpUrl = globalVariable.kk_url + '?url=' + myurl
    Tida.pushWindow(jumpUrl)
  }
}
</script>
<style lang="less">
 @import '../../assets/less/award/award';
</style>