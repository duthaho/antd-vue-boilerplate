import Vue from 'vue'
import NProgress from 'nprogress'

import store from '@state/store'
import { ACCESS_TOKEN } from '@state/types'
import router from './index'
import '@components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false })

const whiteList = ['Login', 'Register', 'Recover', 'Home']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      store
        .dispatch('user/GetMe')
        .then(() => {
          next()
        })
        .catch(() => {
          store.dispatch('user/Logout').then(() => {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
          })
        })
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
