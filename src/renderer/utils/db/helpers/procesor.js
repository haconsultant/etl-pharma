import { fecthDatabaseConfig } from '@/utils/db/localdb'

import store from '@/store'

export function globalConfig (globalId) {
  return new Promise((resolve, reject) => {
    fecthDatabaseConfig(globalId).then(response => {
      console.log(response)
      store.dispatch('saveDatabaseConfig', response)
      store.dispatch('avialableDatabases', response.dataBaseName)
      store.dispatch('saveSyncSchedule', response.cron)
      store.dispatch('currentDatabaseType', response.dataBaseType)
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
