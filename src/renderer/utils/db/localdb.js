import db from '@/datastore'
import q from 'q'
import store from '@/store'

export function fecthDatabaseConfig (id) {
  var deferred = q.defer()
  db.findOne({ _id: id }, function (err, doc) {
    if (err) {
      deferred.resolve(err)
    } else {
      deferred.resolve(doc)
    }
  })
  return deferred.promise
}

export function updateDatabaseConfig (id, data) {
  var deferred = q.defer()
  db.update({_id: id}, data, {}, function (err, numReplaced) {
    if (err) {
      deferred.resolve(err)
      console.log(err)
    } else {
      store.dispatch('saveDatabaseConfig', data)
      deferred.resolve(numReplaced)
    }
  })
  return deferred.promise
}

export function insertDatabaseConfig (data) {
  var deferred = q.defer()
  data._id = '905cf401-c38f-4f72-8df4-662cb8ff621e'
  db.insert(data, function (err, newDoc) {
    if (err) {
      deferred.resolve(err)
      console.log(err)
    } else {
      store.dispatch('saveDatabaseConfig', data)
      deferred.resolve(newDoc)
    }
  })
  return deferred.promise
}

export function resetDatabase () {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    if (err) {
      console.log(err)
    } else {
      console.log(numRemoved)
    }
  })
}

export function saveDatabaseConfig (id, data) {
  return new Promise((resolve, reject) => {
    fecthDatabaseConfig(id).then(response => {
      if (response === null) {
        insertDatabaseConfig(data).then(response => {
          console.log(response)
        })
      } else {
        updateDatabaseConfig(id, data).then(response => {
          console.log(response)
        })
      }
    })
    resolve()
  })
}
