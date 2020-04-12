import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 1000

const accountList = (options) => {
  const parameters = getQueryParameters(options)
  console.log(parameters, 'para')
  const result = []
  const pageNo = parseInt(parameters.pageIndex)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = pageNo * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      seller: Mock.mock('@name'),
      price: Mock.mock('@integer(1, 999)'),
      amount: Mock.mock('@integer(100, 1000)'),
      updatedAt: Mock.mock('@datetime'),
      ...Mock.mock({
        'service|1': parameters.services || ['Google', 'Facebook', 'Amazon'],
      }),
    })
  }

  return builder({
    total: totalCount,
    results: result,
  })
}

Mock.mock(/\/accounts/, 'get', accountList)
