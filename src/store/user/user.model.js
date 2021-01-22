import Axios from '../../utils/axios'
export default {
  namespace: 'user',
  state: {
    user: {
      token: '',
      username: '',
      user_id: null,
      isLogin: !!localStorage.getItem('token')
    },
    info: null
  },
  mutations: {
    ['update/userInfo'](state, info) {
      state.info = info
    }
  },
  actions: {
    async ['user/login']({commit}, payload) {
      const res = await Axios('/v1/api/login/', {
        method: 'POST',
        body: {
          username: payload.username,
          password: payload.password
        }
      })
      saveUserInfo(res)
      return res
    },
    async ['user/info']({commit}, payload) {
      const res = await Axios('/v1/api/user_info/', {
        method: 'get',
      })
      if (res.data) {
        commit('update/userInfo', res.data)
      }
      return res
    },
    async ['user/register']({commit}, payload) {
      const res = await Axios('/v1/api/register/', {
        method: 'POST',
        body: {
          username: payload.username,
          password: payload.password
        }
      })
      saveUserInfo(res)
      return res
    },
    async ['user/code']({commit}, payload) {
      const res = await Axios('/v1/api/verify')
      console.log('res')
      return res
    }
  }
}

const saveUserInfo = (res) => {
  if (res.state === 0) {
    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('user_id', res.data.user_id)
      console.log('res.data.is_super_user', res.data.is_super_user)
      localStorage.setItem('is_super', res.data.is_super_user)
    }
  }
}
