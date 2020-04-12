import { axios } from '@utils/request'

const api = {
  login: '/auth/login',
  register: '/auth/register',
  getMe: '/auth/me',
}

export default api

export function login(data) {
  return axios({
    url: api.login,
    method: 'post',
    data,
  })
}

export function register(data) {
  return axios({
    url: api.register,
    method: 'post',
    data,
  })
}

export function getMe() {
  return axios({
    url: api.getMe,
    method: 'get',
  })
}
