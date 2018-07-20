const state = {
  cron: '',
  timer: '',
  task: {}
}

const mutations = {
  CRON_TIMER (state, data) {
    state.cron = data
  },
  TASK_TIMER (state, data) {
    let hours = data.hours === '00' ? '' : `${data.hours} hora(s)`
    let minutes = data.minutes === '00' ? '' : `${data.minutes} minuto(s)`
    state.task = hours !== '' ? `La Aplicacion se sicronizara cada ${minutes} de cada ${hours}` : `La Aplicacion se sicronizara cada ${minutes}`
  },
  TIMER (state, data) {
    state.timer = data
  }
}

const actions = {
  saveSyncSchedule ({ commit }, data) {
    let hours = data.hours === '00' ? '*' : '*/' + data.hours
    let minutes = (data.minutes === '00' || data.minutes === '01') ? '*' : '*/' + data.minutes
    let cron = `${minutes} ${hours} * * *`
    // let timer = `${data.hours}:${data.minutes}`
    commit('CRON_TIMER', cron)
    commit('TASK_TIMER', data)
    commit('TIMER', data)
  }
}

export default {
  state,
  mutations,
  actions
}
