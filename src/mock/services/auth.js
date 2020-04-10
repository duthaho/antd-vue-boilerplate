import Mock from 'mockjs2'

import { builder, getBody } from '../util'

const username = ['admin']
const password = ['123456']

const login = (options) => {
  const body = getBody(options)

  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, 'Incorrect username or password', 401)
  }

  return builder(
    {
      id: Mock.mock('@guid'),
      user: {
        name: Mock.mock('@name'),
        username: 'admin',
        role: 'admin',
      },
      token: '4291d7da9005377ec9aec4a71ea837f',
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}

Mock.mock(/\/auth\/login/, 'post', login)
