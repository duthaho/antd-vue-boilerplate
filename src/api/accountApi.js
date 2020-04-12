import { axios } from '@utils/request'

const api = {
  list: '/accounts',
}

export default api

export function getAccountList(params) {
  return axios({
    url: api.list,
    method: 'get',
    params,
  })
}
