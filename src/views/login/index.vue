<template>
<form class="form-wrap">
	<div class="form-inline hairline">
		<div class="form-cell"><span>手机</span></div>
		<div class="form-value">
			<input type="text" placeholder="请填写手机号码" maxlength="11" name="" v-model="phone" focus>
		</div>
	</div>
	<div class="form-inline hairline">
		<div class="form-cell"><span @click="getCapture"><img :src="'data:image/png;base64,'+captureUrl" /></span></div>
		<div class="form-value">
			<input type="text" placeholder="请输入验证码" maxlength="4" name="" v-model="capture">
		</div>
	</div>
	<div class="form-inline hairline">
		<div class="form-cell"><span>验证码</span></div>
		<div class="form-value">
			<input type="text" v-model="code" placeholder="请填写验证码" name="">
			<span>|</span>
			<label for="" :class="{'enable-lable':getting}" @click="sendCode">{{getting?(time+'s'):'获取验证码'}}</label>
		</div>
	</div>
	<button type="button" name="button" @click="login">会员登录</button>
</form>
</template>
<script>
import ip from 'ip'
export default {
  data () {
    return {
      code: '',
      timer: null,
      time: 60,
      phone: '',
      capture: '',
      captureUrl: '',
      captchaToken: '',
      getting: false,
      url: ''
    }
  },
  methods: {
    login () {
      if (!this.check()) {
        return
      }
      if (!this.code) {
        this.$toast('请输入验证码')
        // return
      }
      this.$Http.login.post({
        authToken: this.authToken,
        phoneNumber: this.phone,
        phoneCode: this.code,
        tenantId: this.$store.state.user.tenantId,
        weixinOpenId: this.$store.state.user.weixinOpenId
      }, true)
        .then((res) => {
          if (res.httpcode === 200) {
            localStorage.setItem('contactId', res.contactId)
            localStorage.setItem('phone', this.phone)
            this.$store.dispatch('setData', { phone: this.phone })
            history.back()
          } else {
            this.$toast(res.httpmsg)
          }
        })
    },
    check: function () {
      var reg = /^1[34578]\d{9}$/
      if (!reg.test(this.phone)) {
        this.$toast('请输入正确的电话号码')
        return false
      }
      if (!this.capture) {
        this.$toast('请输入验证码')
        return false
      }

      return true
    },
    getCapture: function () {
      this.$Http.captcha.post({
        clientIp: ip.address(),
        tenantId: 12818
      }, true)
        .then((res) => {
          if (res.httpcode === 200) {
            this.captureUrl = res.captchaImage
            this.captchaToken = res.captchaToken
          } else {
            this.$toast(res.httpmsg)
          }
        })
    },
    sendCode () {
      if (!this.check()) {
        return
      }
      if (this.time < 60) {
        return
      }
      this.getting = true
      this.$Http.phoneCode.post({
        phone: this.phone,
        captcha: this.capture,
        captchaToken: this.captchaToken
      }, true)
        .then((res) => {
          if (res.httpcode === 200) {
            this.getCode()
            this.authToken = res.authToken
          } else {
            this.$toast(res.httpmsg)
            this.getCapture()
          }
        })
    },
    getCode () {
      var self = this
      self.timer = setInterval(function () {
        self.time--
        if (self.time === 0) {
          clearInterval(self.timer)
          self.getting = false
          self.time = 60
        }
      }, 1000)
    }
  },
  mounted () {
    this.getCapture()
  }
}
</script>
<style lang="less">
 @import '../../assets/less/login/login';
</style>
