import api from '../../service/wp'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  posts: [],
  categories: []
}

const actions = {
  async [actionTypes.GET_POSTS]({commit, state}) {
    commit(mutationTypes.SET_POSTS, await api.getPosts())
  },
  async [actionTypes.GET_CATEGORIES]({commit, state}) {
    commit(mutationTypes.SET_CATEGORIES, await api.getCategories(1))
  }
}

const mutations = {
  [mutationTypes.SET_POSTS](state, data) {
    state.posts = data
  },
  [mutationTypes.SET_CATEGORIES](state, data) {
    state.categories = data.filter(category => category.name !== 'Uncategorized')
  }
}

export default {
  state,
  actions,
  mutations
}
