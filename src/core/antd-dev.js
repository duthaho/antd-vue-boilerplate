import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

Vue.use(Antd)

process.env.NODE_ENV !== 'production' &&
  console.warn('WARNING: Antd now use fulled imported.')
