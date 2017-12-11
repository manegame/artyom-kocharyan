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
  getCategories() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'categories').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject()
        }
      )
    })
  }
}