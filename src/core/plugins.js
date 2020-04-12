import Vue from 'vue'
import VueStorage from 'vue-ls'
import { VueAxios } from '@utils/request'
import appConfig from '@config/app.config'

if (process.env.NODE_ENV === 'development') {
  require('./antd-prod')
} else {
  require('./antd-dev')
}

Vue.use(VueStorage, appConfig.storageOptions)
Vue.use(VueAxios)
