import Vue from 'vue'
import Router from 'vue-router'

const main = () => import('@/views/main')

// let handleError = (err) => console.log('router is updating: ', err)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    }
  ]
})
