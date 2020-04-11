import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'

import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@state/types'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000,
})

const handleError = (error) => {
  if (error.response) {
    const { data, status } = error.response

    if (status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message,
      })
    }
    if (status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization failed',
      })
    }
  }
  return Promise.reject(error)
}

const handleResponse = (response) => {
  const { status, data } = response
  if (status === 200 && data.success === false) {
    return Promise.reject(new Error(data.message))
  }
  return data
}

service.interceptors.request.use((config) => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}, handleError)

service.interceptors.response.use(handleResponse, handleError)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  },
}

export { installer as VueAxios, service as axios }
