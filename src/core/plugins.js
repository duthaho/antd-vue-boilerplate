import Vue from 'vue'
import VueStorage from 'vue-ls'
import Antd from 'ant-design-vue'
import { VueAxios } from '@utils/request'
import appConfig from '@config/app.config'

import 'ant-design-vue/dist/antd.less'

Vue.use(Antd)
Vue.use(VueStorage, appConfig.storage)
Vue.use(VueAxios)
