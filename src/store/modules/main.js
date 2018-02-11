import wp from '../../service/wp'
import yt from '../../service/youtube'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  posts: [],
  single: [],
  burial: {
    videos: [],
    channel: {}
  }
}

const actions = {
  async [actionTypes.GET_POSTS]({commit, state}) {
    commit(mutationTypes.SET_POSTS, await wp.getPosts())
  },
  async [actionTypes.GET_SINGLE_EXHIBITION]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_EXHIBITION, await wp.getSingleExhibition(slug))
  },
  async [actionTypes.GET_VIDEOS]({commit, state}) {
    commit(mutationTypes.SET_VIDEOS, await yt.listVideos())
  },
  async [actionTypes.GET_BURIAL]({commit, state}) {
    commit(mutationTypes.SET_BURIAL, await yt.listUser())
  }
}

const mutations = {
  [mutationTypes.SET_POSTS](state, data) {
    state.posts = data
  },
  [mutationTypes.SET_SINGLE_EXHIBITION](state, data) {
    state.single = data
  },
  [mutationTypes.SET_VIDEOS](state, data) {
    state.burial.videos = data
  },
  [mutationTypes.SET_BURIAL](state, data) {
    state.burial.channel = data
  }
}

export default {
  state,
  actions,
  mutations
}
