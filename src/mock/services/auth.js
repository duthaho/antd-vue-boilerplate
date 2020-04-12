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
    ballance: Mock.mock('@integer(100,900)'),
    isBanned: false,
    userProfile: {
      userId: 1,
      email: Mock.mock('@email'),
      name: Mock.mock('@name'),
      phoneNumber: '0777423918',
      id: 1,
      guid: Mock.mock('@guid'),
      created: Mock.mock('@datetime'),
      updated: Mock.mock('@datetime'),
    },
    id: 1,
    guid: Mock.mock('@guid'),
    created: Mock.mock('@datetime'),
    updated: Mock.mock('@datetime'),
  }

  return builder(userInfo)
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/register/, 'post', register)
Mock.mock(/\/auth\/me/, 'get', getMe)
