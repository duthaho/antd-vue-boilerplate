import router from './index'

import NProgress from 'nprogress'
import '@components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
