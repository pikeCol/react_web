// initial state
const state = {
  bargainInstanceId: '',
  contentId: 0, // 活动实例id
  tenantId: '', // 租户id
  phone: '', // 电话
  openId: '', // 微信openid
  nickname: '', // 微信openid
  sex: '', // 微信openid
  contactId: '', // 如果有contactId 就一定是会员  在微信端会返回微信openid
  contactFlag: '' // bargainContentVO.contactFlag  是否本人发起 0-否 1-是 ,   立即砍价  自己砍一刀
}

// getters
const getters = {
  contentId: state => state.contentId,
  tenantId: state => state.tenantId
}

// actions
const actions = {
  setData ({ commit, state }, data) {
    commit('changeData', data)
  }
}

// mutations
const mutations = {
  changeData (state, data) {
    state = Object.assign(state, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
