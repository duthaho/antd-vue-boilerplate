export const builder = (data, message, code = 0, headers = {}) => {
  if (message !== undefined && message !== null) {
    data.message = message
  }
  if (code !== undefined && code !== 0) {
    data.code = code
    data._status = code
  }
  if (
    headers !== null &&
    typeof headers === 'object' &&
    Object.keys(headers).length > 0
  ) {
    data._headers = headers
  }
  data.timestamp = new Date().getTime()
  return data
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
