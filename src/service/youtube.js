import Vue from 'vue'
import VueResource from 'vue-resource'

const YOUTUBE_USERNAME = 'artyomkocharyan'
const YOUTUBE_API_KEY = 'AIzaSyC8srmOeZZNbvHECiOx00zYqL9fZk6yYO8'
const YOUTUBE_PLAYLIST_ID = 'UUn4nBQq7UFd8pVbWl9RUzzA'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  listUser() {
    return new Promise((resolve, reject) => {
      Vue.http.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=' + YOUTUBE_USERNAME + '&key=' + YOUTUBE_API_KEY + '').then(
        response => {
          resolve(response.body)
        },
        response => {
          reject()
        }
      )
    })
  },
  listVideos() {
    return new Promise((resolve, reject) => {
      Vue.http.get('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' + YOUTUBE_PLAYLIST_ID + '&key=' + YOUTUBE_API_KEY + '&fields=items&part=snippet&maxResults=50').then(
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
