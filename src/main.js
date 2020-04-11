import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import App from './App.vue'

process.env.VUE_APP_USE_MOCK_API && require('./mock')

import bootstrap from '@core/bootstrap'
import '@core/plugins'
import '@router/permission'

import '@components/global.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: (h) => h(App),
}).$mount('#app')
