if (process.env.VUE_APP_USE_MOCK_API === 'true') {
  const Mock = require('mockjs2')

  require('./services/auth')

  Mock.setup({
    timeout: 800, // setter delay time
  })
  console.log('mock mounted')
}
