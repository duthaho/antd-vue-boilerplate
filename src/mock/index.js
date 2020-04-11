if (process.env.NODE_ENV !== 'production') {
  const Mock = require('mockjs2')

  require('./services/auth')

  Mock.setup({
    timeout: 800, // setter delay time
  })
  console.log('mock mounted')
}
