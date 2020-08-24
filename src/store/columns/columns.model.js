import Axios from '../../utils/axios';

export default {
  namespace: 'columns',

  actions: {
    async ['columns/createColumns']({ commit}, payload) {
      const res = await Axios('/v1/api/columns', {
        method: 'POST',
        body: payload
      });
      return res;
    },
    async ['columns/createColumns']({ commit}, payload) {
      const res = await Axios('/v1/api/columns', {
        method: 'POST',
        body: payload
      });
      return res;
    }
  }
}
