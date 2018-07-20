import _ from 'lodash'
import store from '@/store'
import { smartPharma, efficasis } from './helpers/schemas.js'

var Connection = require('tedious').Connection
var Request = require('tedious').Request
var q = require('q')

export function mssqlServerConnection (config) {
  var result = []
  var deferred = q.defer() // create a promise
  var connection = new Connection(config)
  connection.on('connect', function (err) {
    if (err) {
      deferred.resolve(err)
    } else {
      var request = new Request('sp_databases', function (err, rowCount) {
        if (err) {
          deferred.resolve(err)
        } else {
          deferred.resolve(result) // resolve promise
        }
      })
      request.on('doneInProc', function (rowCount, more, rows) {
        rows.forEach(columns => {
          var rowObject = {}
          columns.forEach(column => {
            rowObject[column.metadata.colName] = column.value
          })
          result.push(rowObject)
        })
      })
      connection.execSql(request)
    }
  }
  )
  return deferred.promise // return the promise for future
}

export function mssqlConectDataBase (config) {
  var schema = []
  var deferred = q.defer() // create a promise
  var connection = new Connection(config)
  connection.on('connect', function (err) {
    if (err) {
      deferred.resolve(false)
    } else {
      var request = new Request('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS GROUP BY TABLE_NAME', function (err, rowCount) {
        if (err) {
          deferred.resolve(err)
        } else {
          var isValid = _.isEqual(schema.sort(), efficasis.schema.sort()) ? {schema: 'Efficasis', valid: true} : _.isEqual(schema.sort(), smartPharma.schema.sort()) ? {schema: 'SmartPharma', valid: true} : {schema: 'NS', valid: false}
          deferred.resolve(isValid)
        }
      })
      request.on('doneInProc', function (rowCount, more, rows) {
        rows.forEach(columns => {
          columns.forEach(column => {
            schema.push(column.value)
          })
        })
      })
      connection.execSql(request)
    }
  })
  return deferred.promise // return the promise for future
}

export function mssqlGetClientInventory (config, database) {
  var result = {
    id_pharmacy: store.state.user.pharmacy.id,
    // id_pharmacy_branch: 'c8a72ed0-0add-11e8-bbbc-f7ade388ac6c',
    id_pharmacy_branch: store.state.user.pharmacy.idBranch,
    inventory: []
  }
  var deferred = q.defer() // create a promise
  var connection = new Connection(config)
  connection.on('connect', function (err) {
    if (err) {
      deferred.resolve(err)
    } else {
      var query = database === 'Efficasis' ? efficasis.query : database === 'SmartPharma' ? smartPharma.query : false
      var request = new Request(query, function (err, rowCount) {
        if (err) {
          deferred.resolve(err)
        } else {
          // console.log(result)
          deferred.resolve(result)
        }
      })
      request.on('doneInProc', function (rowCount, more, rows) {
        rows.forEach(columns => {
          var rowObject = {}
          rowObject.generic = true
          columns.forEach(column => {
            rowObject[column.metadata.colName] = column.value
          })
          result.inventory.push(rowObject)
        })
      })
      connection.execSql(request)
    }
  })
  return deferred.promise
}
