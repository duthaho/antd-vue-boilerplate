import api from './index'
import { axios } from '@utils/request'

export function login(data) {
  return axios({
    url: api.Login,
    method: 'post',
    data,
  })
}

export function register(data) {
  return axios({
    url: api.Register,
    method: 'post',
    data,
  })
}

export function getMe() {
  return axios({
    url: api.GetMe,
    method: 'get',
  })
}
