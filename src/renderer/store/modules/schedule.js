const state = {
  timer: ''
}

const mutations = {
  CRON_TIMER (state, data) {
    state.timer = data
    console.log(state.timer)
  }
}

const actions = {
  saveSyncSchedule ({ commit }, data) {
    let hours = data.hours === '00' ? '*' : '*/' + data.hours
    let minutes = (data.minutes === '00' || data.minutes === '01') ? '*' : '*/' + data.minutes
    let cron = `${minutes} ${hours} * * *`
    console.log(cron)
    commit('CRON_TIMER', cron)
  }
}

export default {
  state,
  mutations,
  actions
}
