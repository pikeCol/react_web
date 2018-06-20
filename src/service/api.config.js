/**
 * Created with
 * Author:  方治刚
 * Version: 1.0.0
 * Date: 2018/05/15 下午3:40
 * Description:  API 配置中心
 * Copyright(C), 企加云北京分公司
 */

import { globalVariable } from '../config/app'

const demo = {
  host: globalVariable.url + '/',
  test: {
    method: 'get',
    url: 'users'
  }
}
const captcha = {
  host: globalVariable.baseurl + '/',
  post: {
    method: 'post',
    url: 'v1/basic/captcha'
  }
}
const phoneCode = {
  host: globalVariable.baseurl + '/',
  post: {
    method: 'post',
    url: 'v1/basic/kk_member/getPhoneCode'
  }
}
// 解析短链中的code
const deCodeSection = {
  host: globalVariable.baseurl + '/',
  get: {
    method: 'get',
    url: 'v1/basic/deCodeSection'
  }
}
// 短链变长链
const longUrl = {
  host: globalVariable.baseurl + '/',
  get: {
    method: 'get',
    url: 'v1/basic/longUrl'
  }
}
// 手淘通过混淆昵称判断是否会员
const getMemberByMixName = {
  host: globalVariable.baseurl + '/',
  get: {
    method: 'get',
    url: 'v1/basic/pointsToCoupon/getMemberByMixName'
  }
}

const getsignature = {
  host: globalVariable.baseurl + '/',
  post: {
    method: 'post',
    url: 'v1/wx/server/getTenantSignature'
  }
}
const getTenantAppid = {
  host: globalVariable.baseurl + '/',
  post: {
    method: 'post',
    url: 'v1/wx/server/getTenantAppid'
  }
}

// 杭州这边接口
const login = {
  host: globalVariable.url + '/',
  post: {
    method: 'post',
    url: 'v1/scene/login/registerAndLogin'
  }
}
const bargainContentDetail = {
  host: globalVariable.url + '/',
  get: {
    method: 'get',
    url: 'v1/scene/bargainDetail/bargainContentDetail'
  }
}
const startBargain = {
  host: globalVariable.url + '/',
  post: {
    method: 'post',
    url: 'v1/scene/bargainDetail/startBargain'
  }
}
const helpPersonBargain = {
  host: globalVariable.url + '/',
  post: {
    method: 'post',
    url: 'v1/scene/bargainDetail/helpPersonBargain'
  }
}
const lotteryContentDetail = {
  host: globalVariable.url + '/',
  get: {
    method: 'get',
    url: 'v1/scene/lotteryDetail/lotteryContentDetail'
  }
}
// v1/scene/lotteryDetail/bargainContentDetail?sourceId=56&memberId=264&tenantId=12818
// /v1/scene/bargainDetail/startBargain
// /v1/scene/bargainDetail/helpPersonBargain
export default {
  demo,
  captcha,
  phoneCode,
  deCodeSection,
  getsignature,
  login,
  longUrl,
  getTenantAppid,
  bargainContentDetail,
  startBargain,
  getMemberByMixName,
  helpPersonBargain,
  lotteryContentDetail
}
