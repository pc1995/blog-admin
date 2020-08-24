import Axios from "../../utils/axios";

export default {
  namespace: 'tag',
  state: {
    tagList: []
  },

  mutations: {
    ['tag/updateTagList'](state, list) {
      state.tagList = list;
    }
  },
  actions: {
    async ['tag/getTagList']({commit, state}, payload) {
      const res = await Axios('/v1/api/tags', payload)
      commit('tag/updateTagList', res.data)
      return res
    },
  }
}
