const state = {
  info: {
    id: '',
    name: '',
    password: '',
    pharmacies: []
  }
}

const mutations = {
  SAVE_USER_DATA (state, data) {
    state.info = Object.assign({}, data)
    console.log(state.user)
  },
  REMOVE_USER_DATA (state) {
    state.info = {}
  }
}

const actions = {
  saveUserData ({ commit }, data) {
    commit('SAVE_USER_DATA', data)
  }
}

export default {
  state,
  mutations,
  actions
}
