import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/Home').default
    },
    {
      path: '/connection/walkthrough',
      name: 'walkthrough',
      component: require('@/components/Connection/Walkthrough').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
