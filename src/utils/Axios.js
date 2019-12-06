import axios from 'axios'
import {
  apiHost
} from "./environment"

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
    return config
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response;
  }
);


const Axios = async (url, options = {}) => {
  let api = url.includes('http') ? url : `${apiHost}${url}`;
  const method = (options.method || 'GET').toLocaleLowerCase()
  let res = null
  if (method === 'get') {
    const opt = {
      params: options.body
    }
    if (options.headers) {
      opt.headers = options.headers
    }
    console.log('opt', opt)
    res = await axios.get(api, opt)
  } else if (method === 'post') {
    res = await axios.post(api, options.body, options.config || {})
  } else if (method === 'patch') {
    api += `/${options.body.id}`
    const body = options.body
    delete body.id
    res = await axios.patch(api, body)
  } else if (method === 'delete') {
    res = await axios.delete(`${api}/${options.params.id}`)
  }
  return new Promise((resolve, reject) => {
    if (res && res.status >= 200 && res.status < 300) {
      return resolve(res.data)
    } else {
      return reject(res)
    }
  })
}

export default Axios
