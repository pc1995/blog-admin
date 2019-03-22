import Axios from '../../utils/Axios'
export default {
  namespace: 'banners',

  actions: {
    async ['banners/banners']({commit}, payload) {
      const res = await Axios('/v1/api/banner/', payload)
      return res
    }
  }
}
