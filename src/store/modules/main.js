import wp from '../../service/wp'
import yt from '../../service/youtube'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  posts: [],
  single: [],
  burial_artyomovich: {}
}

const actions = {
  async [actionTypes.GET_POSTS]({commit, state}) {
    commit(mutationTypes.SET_POSTS, await wp.getPosts())
  },
  async [actionTypes.GET_SINGLE_EXHIBITION]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_EXHIBITION, await wp.getSingleExhibition(slug))
  },
  async [actionTypes.GET_BURIAL]({commit, state}) {
    commit(mutationTypes.SET_BURIAL, await yt.listVideos())
  }
}

const mutations = {
  [mutationTypes.SET_POSTS](state, data) {
    state.posts = data
  },
  [mutationTypes.SET_SINGLE_EXHIBITION](state, data) {
    state.single = data
  },
  [mutationTypes.SET_BURIAL](state, data) {
    state.burial_artyomovich = data
  }
}

export default {
  state,
  actions,
  mutations
}
