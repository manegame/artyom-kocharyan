import Vue from 'vue'
import VueResource from 'vue-resource'

const API_ROOT = 'http://a-k.manusnijhoff.nl//wp-json/wp/v2/'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  getPosts() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'posts?per_page=90').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject()
        }
      )
    })
  },
  getSingleExhibition(slug) {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'posts?slug=' + slug + '&fields=title,slug,acf').then(
        response => {
          resolve(response.body[0])
        },
        response => {
          reject()
        }
      )
    })
  },
  getBurial() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'pages?slug="burial-artyomovich"&fields=title,slug,acf').then(
        response => {
          resolve(response.body[0])
        },
        response => {
          reject()
        }
      )
    })
  }
}
