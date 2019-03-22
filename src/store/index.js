import Vue from 'vue'
import Vuex from 'vuex'
import markdown from './markdown/markdown.model'
import article from './article/article.model'
import user from './user/user.model'
import banners from './banners/banners.model'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    markdown,
    article,
    user,
    banners
  }
})
