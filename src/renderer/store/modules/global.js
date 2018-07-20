const state = {
  id: ''
}

const mutations = {
  GLOBAL_ID (state, data) {
    state.id = data
  }
}

const actions = {
  globalId ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('GLOBAL_ID', data)
      resolve(data)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
