// initial state
const state = {
  showall: '',
  shopArr: []
}

// getters
const getters = {
  showall: state => state.showall,
  shopArr: state => state.shopArr
}

// actions
const actions = {
  setArr ({ commit, state }, data) {
    commit('changeArr', data)
  }
}

// mutations
const mutations = {
  changeArr (state, {data}) {
    console.log(data)
    if (data) {
      state.shopArr = data
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
