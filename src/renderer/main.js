import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify, {
  theme: {
    primary: '#80DEEA',
    secondary: '#B9F6CA',
    accent: '#C5E1A5',
    error: '#FF5252',
    warning: '#FDD835',
    info: '#BDBDBD',
    success: '#4caf50'
  }
})
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
