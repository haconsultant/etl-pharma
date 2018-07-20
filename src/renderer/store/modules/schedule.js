const state = {
  cron: '',
  timer: '',
  task: {}
}

const mutations = {
  CRON_TIMER (state, data) {
    state.cron = data
    console.log(state.cron)
  },
  TASK_TIMER (state, data) {
    let hours = data.hours === '00' ? '' : `${data.hours} hora(s)`
    console.log(hours)
    let minutes = data.minutes === '00' ? '' : `${data.minutes} minuto(s)`
    state.task = hours !== '' ? `La Aplicacion se sicronizara cada ${minutes} de cada ${hours}` : `La Aplicacion se sicronizara cada ${minutes}`
    console.log(state.task)
  },
  TIMER (state, data) {
    state.timer = data
    console.log(state.timer)
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
