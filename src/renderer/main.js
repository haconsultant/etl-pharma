import Vue from 'vue'
import VueBus from 'vue-bus'
import axios from 'axios'
import _ from 'lodash'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'
import cron from 'node-cron'
import db from './datastore'

Vue.prototype.$_ = _
Vue.prototype.$db = db
Vue.prototype.$cron = cron

Vue.use(VueBus)
Vue.use(Vuetify, {
  theme: {
    primary: '#00E5FF',
    secondary: '#00B8D4',
    accent: '#00ACC1',
    error: '#E53935',
    warning: '#FFE57F',
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
