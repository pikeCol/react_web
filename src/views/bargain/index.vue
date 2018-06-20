<template>
<div class="bargain_wrap">
	<div class="bargain">
		<Banner :list="bargainContentVO.contentJsonVO.bargainGoodsInfo.picture" class="banner" />
		<div class="activity" @click="showActi">活动规则</div>
		<div class="price clear" v-if="loadData.bargainStatus!=3">
			<div class="price_left left"> ￥<span>{{(bargainContentVO.contentJsonVO.bargainGoodsInfo.originalPrice-loadData.hasBargainPrice)?(bargainContentVO.contentJsonVO.bargainGoodsInfo.originalPrice-loadData.hasBargainPrice).toFixed(2):0}}</span> 当前价 </div>
			<div class="price_right right">
				<p v-if="loadData.bargainStatus==3">砍价未发起哦</p>
				<p v-if="loadData.bargainStatus==1">砍价成功</p>
				<p v-if="loadData.bargainStatus==2&&loadData.contactFlag==1">兑换成功</p>
				<p v-if="loadData.bargainStatus==1&&loadData.contactFlag==1">砍价成功~快去使用吧</p>
				<p v-if="loadData.bargainStatus==9">砍价失败</p>
				<p v-if="loadData.bargainStatus==0">活动结束还剩</p>
				<p class="clock" v-show="bargainContentVO.contentJsonVO.enableTimeLimit && loadData.bargainStatus==0">
					<Clock :time="bargainContentVO.contentJsonVO.timeLimitSecond?bargainContentVO.contentJsonVO.timeLimitSecond:null" /> 
          </p>
			</div>
		</div>
		<div class="detail_wrap">
			<div class="goods_detail"> 
				<h3> {{bargainContentVO.contentJsonVO.bargainGoodsInfo.name}}</h3>
				<p>{{bargainContentVO.contentJsonVO.bargainGoodsInfo.introduction}}</p>
			</div>
			<div class="price_now"> ￥<span class="now_price">{{(bargainContentVO.contentJsonVO.bargainGoodsInfo.floorPrice)}} </span><span class="linethrought">￥{{bargainContentVO.contentJsonVO.bargainGoodsInfo?bargainContentVO.contentJsonVO.bargainGoodsInfo.originalPrice:null}}</span>
				<Tag v-if="bargainContentVO.contentJsonVO.newMemberBenefitCount" :word="`新会员砍${bargainContentVO.contentJsonVO.newMemberBenefitCount}次`" class="right" />
				<Tag v-if="loadData.bargainStatus!=3" :word="`已有${loadData.index?loadData.index:0}人帮砍`" class="right" style="margin-right:.3rem" /> </div>
			<!-- 砍价进度条 -->
			<div class="progress" v-if="bargainContentVO.status<3">
				<!-- loadData.bargainStatus 砍价活动实例状态 0-砍价进行中 1-砍价成功 2-砍价未发起 9-砍价失败 -->
				<p v-if="loadData.bargainStatus==0">已砍<strong>{{loadData.hasBargainPrice}}</strong>元还剩{{loadData.remainPrice}}元</p>
				<p v-if="loadData.bargainStatus==1&&loadData.contactFlag==1">砍价成功~快去使用吧</p>
				<!-- <p v-if="loadData.bargainStatus==2&&loadData.contactFlag==1">兑换成功</p> -->
				<!-- <p v-else="loadData.bargainStatus==1">砍价成功~快去使用吧</p> -->
				<div class="clear" v-if="loadData.bargainStatus==0" v-cloak> <span>砍价进行中：</span>
					<van-progress class="progress_wrap" color="#f60" :percentage="percent" /> </div>
			</div>
			<!-- 砍价排行榜 -->
			<div class="price_list" :class="{'ishidden':showstyle}" v-if="bargainContentVO.status<3&&loadData.index">
				<h3>砍价榜</h3>
				<div v-if="loadData.bargainRecord&&loadData.bargainRecord.length>3" :class="['showmore',{'show':showstyle}]" @click="showmoredetail"> 查看更多 </div>
				<div class="ul_wrap">
					<ul>
						<li v-for="item in loadData.bargainRecord" :key="item.bargainPrice">
							<div class="avatar_info"> <img :src="item.headImg?item.headImg:default_avatar" alt="">
								<div class="avatar_text">
									<p>{{item.contactNick ?item.contactNick :item.phone}} {{bargain_word[item.bargainTime%18]}}</p> <span v-show="item.max">最给力</span> </div>
							</div> <span class="avatar_right"> <span class="cut"></span>砍掉{{item.bargainPrice}}元</span> 
            </li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 商家信息 -->
		<div class="bussiness_info">
			<div :class="['bussiness_title',{'isfixed':barFixed}]" @click="tabswitch"> <span class="choose" @click="gotab(scrollTop)">商品详情</span> <span @click="gotab(bussinessTop)">商家信息</span> <span @click="gotab(changeTop)">兑换须知</span> </div>
			<div class="bussiness_detail">
				<Titles word="商品详情" />
				<GoodDetail v-for="item in bargainContentVO.contentJsonVO.bargainGoodsInfo.detail" :key="item.serialNo" :text="item.text" :imagePath="item.imagePath" />
				<div class="bussiness_top" style="height:.5px"></div>
				<Titles word="商家信息" />
				<GoodDetail v-for="item in bargainContentVO.businessInfo" :key="item.serialNo" :text="item.text" :imagePath="item.imagePath" />
				<Titles word="兑换须知" class="change_top" />
				<div class="messageinfo">{{bargainContentVO.contentJsonVO.exchangeNotice }}</div>
				<!-- 商店地址 -->
				<div class="shop" v-if="bargainContentVO.storeNos">
					<div class="shop_head">
						<h3>适用门店 </h3> <span @click="$router.push('/shoplist')">
                共{{bargainContentVO.storeNos.length}}<van-icon name="arrow"></van-icon>
            </span> </div>
					<ShopList /> </div>
			</div>
		</div>
	</div>
	<div class="gotin" v-cloak>
    <!-- 活动进行中且砍价未发起 -->
    <span class="gethelp" @click="bargain(loadData.bargainStatus,loadData.contactFlag)" v-if="(bargainContentVO.status==1)&&(loadData.bargainStatus==3&&!end)">发起砍价</span> 
    <!-- 活动未结束且是自己发起的砍价活动 -->
    <span class="gethelp" @click="bargain(loadData.bargainStatus,loadData.contactFlag)" v-if="(bargainContentVO.status!=9)&&(loadData.bargainStatus==0&&loadData.contactFlag==1&&!end)">找人帮砍</span>		
    <!-- 活动未结束且不是自己发起的 -->
    <span class="gethelp" @click="bargain(loadData.bargainStatus,loadData.contactFlag,5)" v-if="(bargainContentVO.status<9&&loadData.bargainStatus!=3)&&loadData.contactFlag==0">我也要砍</span>
    <!-- 活动进行中且不是自己发起的 -->
    
    <span class="gethelp" @click="helpbargain(contentId)" v-if="(loadData.status!=9)&&(loadData.bargainStatus==0&&loadData.contactFlag==0&&!end)">帮TA砍一刀</span> 
    <span class="gethelp" @click="showgift=!showgift" v-if="loadData.bargainStatus==1&&loadData.contactFlag==1">兑换奖品</span>
    <!-- 在活动实例时间内未完成砍价 -->
    <span v-cloak class="disablebtn" v-if="(loadData.bargainStatus==9&&initdata.bargainInstanceId)||(end&&loadData.bargainStatus!=1&&initdata.bargainInstanceId)">砍价失败</span>
    <!-- 活动过期 -->
    <span v-cloak class="disablebtn" v-if="bargainContentVO.status==9&&initdata.bargainContentId">活动已经结束</span>
    <span v-cloak class="disablebtn" v-if="bargainContentVO.status==0&&initdata.bargainContentId">活动将于 {{startTime+' 开始'}} </span>
    <span class="gethelp" v-if="loadData.bargainStatus==2&&loadData.contactFlag==1">兑换成功</span>
	</div>
	<div class="giftmask" v-show="showgift" @click="showgift=false">
		<div class="img_wrap"> <span>{{loadData.bargainStatus===3?'兑换成功':loadData.exchangeCode}}</span> 
      <!-- <img src="../assets/img/gift@3x.png" alt="">  -->
    </div>
	</div>
  <div class="sharebg" v-if="showmask" @click="showmask = false">
    <img src="../../assets/images/bargain/invite-share2.png" alt="">
    <div class="share-text">
      <p>请点击右上角</p>
      <p>将它发给指定朋友</p>
      <p>或点击朋友圈</p>
    </div>
  </div>
</div>
</template>
<script>
import Banner from '../../components/banner'
import Tag from '../../components/tag'
import Clock from '../../components/clock'
import GoodDetail from '../../components/good_detail'
import Titles from '../../components/titles'
import ShopList from '../../components/shop_list'
import $ from 'jquery'
import { util } from '../../utils/utils'
import { mapGetters } from 'vuex'
import { myMixin } from '../../mixins/code'
import { clipboard } from '../../mixins/clipboard'
import { wxsignature } from '../../mixins/wxsignature'
import imgUrl from '../../assets/images/bargain/present@3x.png'
let wx = require('../../../static/wxsdk.js')
// 帮别人砍有实例id  自己砍有contactid
// bargainContentVO.status  活动状态 0-活动初始化 1-活动进行中 2-活动暂停 9-活动结束
// loadData.bargainStatus 砍价活动实例状态 0-砍价进行中 1-砍价成功 2-兑换成功 3-砍价未发起 9-砍价失败
// loadData.contactFlag  是否本人发起 0-否 1-是 ,   立即砍价  自己砍一刀
export default {
  data () {
    return {
      showmask: false,
      default_avatar: imgUrl,
      initdata: '',
      phone: '',
      bargainInstanceId: '',
      contentId: '',
      scrollTop: 0,
      bussinessTop: 0,
      changeTop: 0,
      top: 0,
      barFixed: false,
      showgift: false,
      words: '新人砍三次',
      loadData: {
        bargainRecord: []
      },
      bargainContentVO: {
        contentJsonVO: {
          bargainGoodsInfo: {
            detail: []
          }
        }
      },
      showstyle: false,
      openId: '',
      disparties: 1,
      price: 0,
      bargain_word: [ '看我青龙偃月刀 砍了', '手起刀落，咔嚓 砍了', '不愧是屠夫出身 砍了', '简直塑料友情 砍了', '拼刀法没输过 砍了', '小李探花销魂一刀  砍了', '一出手，山河抖三抖 砍了', '路见砍价，拔刀相助 砍了', '刀刀见血 砍了', '老司机就是稳 砍了', '凑热闹怎能少了我 砍了', '献丑了，见笑见笑 砍了', '没98K，用平底锅 砍了', '挥舞着劳动的镰刀 砍了', '伸出一阳指的中指 砍了',
        '用平沙落雁第一式 砍了', '翻开葵花宝典 砍了', '默念玉女心经 砍了', '使用蛮荒之力 砍了'
      ]
    }
  },
  computed: {
    ...mapGetters({ end: 'end' }),
    percent () {
      return (1 - this.price / this.disparties).toFixed(2) * 100
    }
  },
  mixins: [ myMixin, clipboard, wxsignature ],
  methods: {
    showmoredetail () {
      this.showstyle = true
      this.initpostion()
    },
    helpbargain () {
      var self = this
      if (this.contactId || this.$store.state.user.openId) {
        let params = {
          bargainInstanceId: self.bargainInstanceId,
          phone: self.phone,
          tenantId: self.$store.state.user.tenantId,
          weixinOpenId: self.$store.state.user.openId
        }
        this.$Http.helpPersonBargain.post(params, true)
          .then(res => {
            if (res.httpcode === 200) {
              this.init(this.initdata)
            } else {
              this.$toast(res.httpmsg)
            }
          })
      } else {
        this.$router.push('/login')
      }
    },
    bargain (bargainStatus, contactFlag, need) {
      let params
      var self = this
      if (this.contactId) {
        // if ( bargainStatus == 3 && contactFlag == 0 ) {
        params = {
          bargainContentId: this.bargainContentVO.id,
          phone: this.phone,
          tenantId: this.$store.state.user.tenantId,
          weixinOpenId: this.$store.state.user.openId || this.openId
        }
        // }
        if (bargainStatus === '0' && contactFlag === '1') {
          if (util.isWeiXin()) {
            this.showmask = true
            return
          }
          this.$dialog
            .confirm({
              title: '复制以下链接，分享给好友',
              message: this.loadData.instanceUrl,
              confirmButtonText: '复制'
            })
            .then(() => {
              self.handleCopy(self.loadData.instanceUrl)
            })
          return
        }
        this.$Http.startBargain.post(params, true).then(res => {
          if (res.httpcode === 200) {
            if (need === 5) {
              this.initdata.bargainInstanceId = ''
              this.initdata.bargainContentId = this.bargainContentVO.id
              this.init(this.initdata)
              return
            }
            this.init(this.initdata)
          } else {
            this.$toast(res.httpmsg)
          }
        })
      } else {
        this.$router.push('/login')
      }
    },
    showActi () {
      this.$dialog
        .alert({
          title: '标题',
          message: this.bargainContentVO.ruleDesc,
          closeOnClickOverlay: true,
          overlay: true,
          showConfirmButton: false
        })
        .then(() => {
          // on close
        })
    },
    wxinit () {
      var self = this
      var _url = window.location.href
      this.getsignature(this.initdata.tenantId, self.wxConfig.nonceStr, self.wxConfig.timestamp, _url)
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: self.bargainContentVO.shareTitle, // 分享标题
          link: self.wxShareConfig.lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: self.bargainContentVO.sharePictureUrl, // 分享图标
          success: function () {},
          cancel: function () {}
        })
        // 分享到朋友
        wx.onMenuShareAppMessage({
          title: self.bargainContentVO.shareTitle, // 分享标题
          desc: self.bargainContentVO.shareDesc, // 分享描述
          link: self.wxShareConfig.lineLink, // 分享链接
          imgUrl: self.bargainContentVO.sharePictureUrl, // 分享图标
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (data) {},
          cancel: function () {}
        })
      })
      wx.error(function (data) {
      })
    },
    handleScroll () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > this.scrollTop) {
        this.barFixed = true
      } else {
        this.barFixed = false
      }
    },
    gotab (height) {
      $('html,body').animate({
        scrollTop: height
      })
    },
    initpostion () {
      var self = this
      setTimeout(() => {
        var scrollTop = $('.bussiness_info')[0].offsetTop
        var bussinessTop =
        $('.bussiness_top')[0].offsetTop - 2 * ($('.bussiness_title')[0].offsetHeight)
        var changeTop =
        $('.change_top')[0].offsetTop - 2 * ($('.bussiness_title')[0].offsetHeight)
        self.scrollTop = scrollTop
        self.bussinessTop = bussinessTop
        self.changeTop = changeTop
      }, 1000)
    },
    tabswitch (event) {
      if (!event) return
      let target = event.target
      if (target.nodeName.toLowerCase() !== 'span') {
        return
      }
      let len = target.parentNode.children
      for (let i = 0; i < len.length; i++) {
        len[i].index = i
        len[i].removeAttribute('class')
      }
      target.setAttribute('class', 'choose')
    },
    init (data) {
      var self = this
      // let url = this.localurl + '/v1/scene/bargainDetail/bargainContentDetail'
      this.initdata = data
      this.$Http.bargainContentDetail.get({
        ...data
      }, true)
        .then(res => {
          if (res.httpcode === 200) {
            if (!this.$store.state.user.openId && util.isWeiXin()) {
              // this.getAppId(this.initdata.tenantId)  微信授权跳转
              window.location = res.bargainInstance.bargainContentVO.wxUrl ? res.bargainInstance.bargainContentVO.wxUrl : res.bargainInstance.wxurl
              return
            }
            this.initpostion()
            self.loadData = res.bargainInstance
            self.bargainContentVO = res.bargainInstance.bargainContentVO
            // timeLimitSecond 倒计时
            self.bargainContentVO.contentJsonVO.timeLimitSecond &&
              this.$store.dispatch('setTime', {
                time: self.bargainContentVO.contentJsonVO.timeLimitSecond
              })
            self.bargainContentVO.storeNos &&
              this.$store.dispatch('setArr', {
                data: self.bargainContentVO.storeNos
              })
            // 差价
            var data =
              res.bargainInstance.bargainContentVO.contentJsonVO
                .bargainGoodsInfo
            self.disparties =
              Math.floor((data.originalPrice - data.floorPrice) * 100) / 100
            // 已经砍掉金额
            // 砍价最高
            let max = 0
            let _index = 0
            if (res.bargainInstance.bargainRecord) {
              res.bargainInstance.bargainRecord.forEach((val, key) => {
                let _value = parseFloat(val.bargainPrice)
                if (_value > max) {
                  max = _value
                  _index = key
                }
                self.price += parseFloat((val.bargainPrice - 0).toFixed(2))
              })
              res.bargainInstance.bargainRecord[_index].max = true
            }
            self.loadData = res.bargainInstance
            self.bargainContentVO = res.bargainInstance.bargainContentVO
            // timeLimitSecond 倒计时
            self.bargainContentVO.contentJsonVO.timeLimitSecond && this.$store.dispatch('setTime', {
              time: self.bargainContentVO.contentJsonVO.timeLimitSecond
            })
            self.bargainContentVO.storeNos && this.$store.dispatch('setArr', {
              data: self.bargainContentVO.storeNos
            })
            if (util.isWeiXin()) {
              self.getLongUrl(res.bargainInstance.instanceUrl, this.initdata.tenantId)
            }
          } else {
            this.$toast(res.httpmsg)
          }
        })
    }
  },
  mounted () {
    this.contactId = localStorage.getItem('contactId') || this.$store.state.user.contactId
    this.phone = this.$store.state.user.phone || localStorage.getItem('phone')
    this.openId = localStorage.getItem('openId') || this.$store.state.user.openId
    // 解析code
    this._getBaseUrl()
      .then(res => {
        this.bargainInstanceId = res.bargainInstanceId
        this.contentId = res.contentId
        this.init({
          bargainContentId: res.contentId ? res.contentId : '',
          bargainInstanceId: res.bargainInstanceId ? res.bargainInstanceId : '',
          phone: this.phone ? this.phone : '',
          weixinOpenId: res.openId ? res.openId : '',
          tenantId: res.tenantId
        })
      })
    window.addEventListener('scroll', this.handleScroll)
  },
  components: {
    Banner,
    Tag,
    Clock,
    GoodDetail,
    Titles,
    ShopList
  }
}
</script>
<style lang="less">
 @import '../../assets/less/bargain/bargain';
</style>
