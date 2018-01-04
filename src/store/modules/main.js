import api from '../../service/wp'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  posts: [],
  single: [],
  burial_artyomovich: {}
}

const actions = {
  async [actionTypes.GET_POSTS]({commit, state}) {
    commit(mutationTypes.SET_POSTS, await api.getPosts())
  },
  async [actionTypes.GET_SINGLE_EXHIBITION]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_EXHIBITION, await api.getSingleExhibition(slug))
  },
  async [actionTypes.GET_BURIAL]({commit, state}) {
    commit(mutationTypes.SET_BURIAL, await api.getBurial())
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
