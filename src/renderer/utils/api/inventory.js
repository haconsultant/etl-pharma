import request from './helpers/request'

export function sycnInventory (data) {
  return request({
    url: '/inventory',
    method: 'post',
    data
  })
}
