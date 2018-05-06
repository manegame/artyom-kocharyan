import wp from '../../service/wp'
import yt from '../../service/youtube'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  posts: [],
  fields: [],
  fieldsSet: false,
  single: [],
  svg: [],
  burial: {
    videos: [],
    channel: {}
  }
}

const actions = {
  [actionTypes.SET_ACTIVE]({commit, state}, slug) {
    commit(mutationTypes.SET_ACTIVE, slug)
  },
  [actionTypes.SET_FIELD]({commit, state}, post) {
    commit(mutationTypes.SET_FIELD, post)
  },
  [actionTypes.FIELDS_SET]({commit, state}) {
    commit(mutationTypes.FIELDS_SET)
  },
  async [actionTypes.GET_POSTS]({commit, state}) {
    commit(mutationTypes.SET_POSTS, await wp.getPosts())
  },
  async [actionTypes.GET_SINGLE_EXHIBITION]({commit, state}, slug) {
    commit(mutationTypes.SET_SINGLE_EXHIBITION, await wp.getSingleExhibition(slug))
  },
  async [actionTypes.GET_SVGS]({commit, state}) {
    commit(mutationTypes.SET_SVGS, await wp.getSVGs())
  },
  async [actionTypes.GET_VIDEOS]({commit, state}) {
    commit(mutationTypes.SET_VIDEOS, await yt.listVideos())
  },
  async [actionTypes.GET_BURIAL]({commit, state}) {
    commit(mutationTypes.SET_BURIAL, await yt.listUser())
  },
  async [actionTypes.CLEAR_SINGLE_EXHIBITION]({commit, state}) {
    commit(mutationTypes.CLEAR_SINGLE_EXHIBITION)
  }
}

const mutations = {
  [mutationTypes.SET_ACTIVE](state, slug) {
    let field = state.fields.filter(field => { return field.post.slug === slug })[0]
    field.height = '100vh'
    field.width = '100vw'
    field.zIndex = '999'
  },
  [mutationTypes.SET_FIELD](state, data) {
    if (!data.active) {
      state.fields.push({
        id: data.id,
        post: data,
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    } else {
      state.fields.push({
        id: data.id,
        post: data,
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      })
    }
  },
  [mutationTypes.FIELDS_SET](state) {
    state.fieldsSet = true
  },
  [mutationTypes.SET_POSTS](state, data) {
    state.posts = data
  },
  [mutationTypes.SET_SINGLE_EXHIBITION](state, data) {
    state.single = data
  },
  [mutationTypes.SET_SVGS](state, data) {
    state.svg = data.acf.svgs
  },
  [mutationTypes.SET_VIDEOS](state, data) {
    state.burial.videos = data
  },
  [mutationTypes.SET_BURIAL](state, data) {
    state.burial.channel = data
  },
  [mutationTypes.CLEAR_SINGLE_EXHIBITION](state, data) {
    state.single = []
  }
}

export default {
  state,
  actions,
  mutations
}
