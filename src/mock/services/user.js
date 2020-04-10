import Mock from 'mockjs2'

import { builder } from '../util'

const info = () => {
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: 'Duthaho',
    username: 'admin',
    role: 'admin',
  }

  return builder(userInfo)
}

Mock.mock(/\/api\/user\/info/, 'get', info)
