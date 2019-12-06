import Axios from '../../utils/Axios'
export default {
  namespace: 'article',
  state: {
    articleList: []
  },
  mutations: {
    ['article/getArticleList'](state, article) {
      state.articleList = article
    }
  },
  actions: {
    async ['article/article']({commit, state}, payload) {
      const res = await Axios('/v1/api/articles', payload)
      return res
    },
    async ['article/upload']({commit, state}, payload) {
      const res = await Axios('/v1/api/upload', {
        method: 'POST',
        body: payload
      })
      return res
    },
    async ['article/category']({commit, state}, payload) {
      const res = await Axios('/v1/api/category', payload)
      return res
    },
  }
}
