import Vue from 'vue'
import VueResource from 'vue-resource'

let GoogleAuth
const YOUTUBE_API_KEY = 'AIzaSyC8srmOeZZNbvHECiOx00zYqL9fZk6yYO8'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  listVideos() {
    return new Promise()
  }
}
