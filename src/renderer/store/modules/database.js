const state = {
  config: {
    userName: '',
    password: '',
    server: '',
    options: {
      database: '',
      rowCollectionOnDone: true
    }
  },
  databases: []
}

const mutations = {
  DATABASE_CONFIG (state, data) {
    state.config = Object.assign({}, data)
  },
  AVIALABLE_DATABASES (state, data) {
    state.databases.splice(0, state.database)
    state.databases = data
  }
}

const actions = {
  saveDatabaseConfig ({ commit }, data) {
    delete data._id
    commit('DATABASE_CONFIG', data.config)
  },
  avialableDatabases ({ commit }, data) {
    console.log(data)
    commit('AVIALABLE_DATABASES', data)
  }
}

export default {
  state,
  mutations,
  actions
}
