import { fecthDatabaseConfig, mssqlGetClientInventory } from '@/utils/db/localdb'
import { sycnInventory } from '@/utils/api/inventory'
import store from '@/store'

export function globalConfig (globalId) {
  return new Promise((resolve, reject) => {
    fecthDatabaseConfig(globalId).then(response => {
      store.dispatch('saveDatabaseConfig', response)
      store.dispatch('avialableDatabases', response.dataBaseName)
      store.dispatch('saveSyncSchedule', response.cron)
      resolve()
    })
  })
}

export function saveGlobalConfig (globalId) {
  return new Promise((resolve, reject) => {
    fecthDatabaseConfig(globalId).then(response => {
      store.dispatch('saveDatabaseConfig', response)
      store.dispatch('avialableDatabases', response.dataBaseName)
      store.dispatch('saveSyncSchedule', response.cron)
      resolve()
    })
  })
}
export function syncIventory () {
  console.log('Here!')
  return new Promise((resolve, reject) => {
    mssqlGetClientInventory(store.state.config, store.state.config.options.database).then(response => {
      sycnInventory(response).then(response => {
        console.log(response)
      })
    })
    resolve()
  })
}
