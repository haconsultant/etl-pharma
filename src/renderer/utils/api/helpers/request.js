import Axios from 'axios'

// create an axios instance
const services = Axios.create({
  baseURL: 'http://pharma-inventories-receiver-experience-api.us-e2.cloudhub.io/api',
  mode: 'no-cors',
  headers: {
    'crossDomain': true
  }
  // headers: {'X-Custom-Header': 'foobar'}
})
// request interceptor
services.interceptors.request.use(config => {
  /* Before request is sent */
  return config
}, error => {
  // Do something with request error
  console.error(error)
  Promise.reject(error)
})
// respone interceptor
services.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ETIMEOUT') {
      console.log('Server TIMEOUT')
    }
    return Promise.reject(error)
  }
)
export default services
