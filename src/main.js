import Vue from 'vue'
import 'babel-polyfill'
import VueRouter from 'vue-router'
import VueHead from 'vue-head'
// --- GOOGLE ANALYTICS
// import ga from 'vue-ga'
// --- ERROR TRACKING
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'
import App from './App'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueCookie from 'vue-cookie'
import dragscroll from 'dragscroll'
import store from './store'
import main from './views/main'
import single from './views/single'

Vue.use(VueRouter)
Vue.use(VueHead)
Vue.use(VueCookie)
Vue.use(VueYouTubeEmbed)
Vue.use(dragscroll)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/:slug',
      name: 'single',
      component: single
    },
    {
      path: '/:slug/info',
      name: 'info',
      component: single
    }
  ]
})

// Raven
//     .config('https://---0@sentry.io/---')
//     .addPlugin(RavenVue, Vue)
//     .install()

// ga(router, 'UA-XXXXX')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
