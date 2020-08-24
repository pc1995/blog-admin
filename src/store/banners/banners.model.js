import Axios from '../../utils/axios'
export default {
  namespace: 'banners',

  actions: {
    async ['banners/banners']({commit}, payload) {
      const res = await Axios('/v1/api/banners', payload)
      return res
    }
  }
}
