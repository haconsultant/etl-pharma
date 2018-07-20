import request from './helpers/request'

export function sycnInventory (data) {
  return request({
    baseURL: 'http://pharma-inventories-receiver-experience-api.us-e2.cloudhub.io/api',
    url: '/inventory',
    method: 'post',
    data
  })
}
