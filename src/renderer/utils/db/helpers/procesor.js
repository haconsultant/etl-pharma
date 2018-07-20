import { fecthDatabaseConfig } from '@/utils/db/localdb'

import store from '@/store'

export function globalConfig (globalId) {
  let isStored = false
  return new Promise((resolve, reject) => {
    fecthDatabaseConfig(globalId).then(response => {
      console.log(response)
      store.dispatch('saveDatabaseConfig', response)
      store.dispatch('avialableDatabases', response.dataBaseName)
      store.dispatch('saveSyncSchedule', response.cron)
      store.dispatch('currentDatabaseType', response.dataBaseType)
      store.dispatch('pharmacyInfo', response.user.pharmacy)
    })
    resolve(isStored)
  })
}
