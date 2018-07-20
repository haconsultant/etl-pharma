import request from './helpers/request'

export function logUser (...params) {
  return request({
    baseURL: 'http://pharma-login-process-api.us-e2.cloudhub.io/api/',
    url: `/login?user=${params[0]}&password=${params[1]}`,
    method: 'get'
  })
}

export function getPharmacyBranches (id) {
  return request({
    baseURL: 'http://pharma-pharmacies-system-api.cloudhub.io/api/',
    url: `/pharmacy?id_user=${id}`,
    method: 'get'
  })
}
