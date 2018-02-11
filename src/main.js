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
import store from './store'
import akMain from './views/ak-main'
import akSingle from './views/ak-single'
import empty from './views/empty'
import svgViewer from './components/svg-viewer'

Vue.use(VueYouTubeEmbed)
Vue.use(VueRouter)
Vue.use(VueHead)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        a: akMain,
        b: empty
      }
    },
    {
      path: '/single/:slug/',
      name: 'single',
      components: {
        a: akMain,
        b: akSingle
      }
    },
    {
      path: '/svg/',
      name: 'svg',
      components: {
        a: svgViewer,
        b: empty
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
