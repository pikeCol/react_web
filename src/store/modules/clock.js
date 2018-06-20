// initial state
const state = {
  clock_time: 999999,
  end: false
}

// getters
const getters = {
  clock_time: state => state.clock_time,
  end: state => state.end
}

// actions
const actions = {
  setTime ({ commit, state }, data) {
    commit('changeTime', data.time)
  },
  reduceTime ({commit, state}) {
    commit('redTime')
  }
}

// mutations
const mutations = {
  changeTime (state, time) {
    if (time === 0) {
      state.end = true
    }
    state.clock_time = time
  },
  redTime (state, time) {
    state.clock_time = state.clock_time - 1
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
