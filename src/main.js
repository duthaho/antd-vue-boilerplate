import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import App from './app.vue'

import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
