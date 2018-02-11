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
import akMain from './views/ak-main'
import akSingle from './views/ak-single'
import akBurial from './views/ak-burial'
import akSvg from './views/ak-svg'

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
      components: {
        lower: akMain,
        upper: false
      }
    },
    {
      path: '/burial/',
      name: 'burial',
      components: {
        lower: akMain,
        upper: akBurial
      }
    },
    {
      path: '/single/:slug/',
      name: 'single',
      components: {
        lower: akMain,
        upper: akSingle
      }
    },
    {
      path: '/svg/',
      name: 'svg',
      components: {
        lower: akMain,
        upper: akSvg
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
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
