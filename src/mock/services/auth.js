import Mock from 'mockjs2'

import { builder, getBody } from '../util'

const username = ['admin']
const password = ['123456']

const login = (options) => {
  const body = getBody(options)

  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({
      success: false,
      message: 'Wrong username or password',
    })
  }

  return builder({
    success: true,
    token: '4291d7da9005377ec9aec4a71ea837f',
    message: '',
  })
}

const register = () => {
  return builder({
    success: true,
    token: '4291d7da9005377ec9aec4a71ea837f',
    message: '',
  })
}

const getMe = () => {
  const userInfo = {
    username: 'admin',
    role: 2,
    apiKey: 'FTJVRlWCmittcIstwtOk9T17DsXDTi9Ao6jnsWlHv0wv',
    ballance: 0.0,
    isBanned: false,
    userProfile: {
      userId: 1,
      email: 'admin@sendsms.com',
      name: 'Admin',
      phoneNumber: '0777423918',
      id: 1,
      guid: 'fcafe78f',
      created: '2020-04-04T16:34:08.6094061',
      updated: '2020-04-04T16:34:08.6094071',
      createdBy: null,
      updatedBy: null,
    },
    accounts: null,
    prices: null,
    id: 1,
    guid: '4019307c',
    created: '2020-04-04T16:34:08.6094044',
    updated: '2020-04-04T16:34:08.6094058',
    createdBy: null,
    updatedBy: null,
  }

  return builder(userInfo)
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/register/, 'post', register)
Mock.mock(/\/auth\/me/, 'get', getMe)
