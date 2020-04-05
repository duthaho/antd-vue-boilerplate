import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'

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
    if (status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization failed',
      })
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use((config) => {
  const token = Vue.ls.get('ACCESS_TOKEN')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}, handleError)

service.interceptors.response.use((response) => response.data.handleError)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  },
}

export { installer as VueAxios, service as axios }
