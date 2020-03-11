import request from '@/utils/request'

/**
 * 8、设置开盘价
 * @param { setOpenPrice } formData
 */
export const setOpenPrice = formData => {
  return request({
    method: 'POST',
    url: '/master/setting/setOpenPrice',
    data: formData
  })
}

/**
 * 9、添加闭市时间
 * @param { closeDate } formData
 */
export const closeDate = formData => {
  return request({
    method: 'POST',
    url: '/master/closeDate/add',
    data: formData
  })
}

/**
 * 10、批量添加闭市时间
 * @param { batchAdd } JSON
 */
export const batchAdd = digitGroup => {
  return request({
    method: 'POST',
    url: '/master/closeDate/batchAdd',
    data: digitGroup
  })
}

/**
 * 11、获取闭市时间列表
 * @param { closeDateGetList } formData
 */
export const closeDateGetList = formData => {
  return request({
    method: 'POST',
    url: '/master/closeDate/getList',
    data: formData
  })
}

/**
 * 12、修改闭市时间备注
 * @param { closeDateEdit } formData
 */
export const closeDateEdit = formData => {
  return request({
    method: 'POST',
    url: '/master/closeDate/edit',
    data: formData
  })
}

/**
 * 13、删除闭市时间
 * @param { closeDateDelete } formData
 */
export const closeDateDelete = formData => {
  return request({
    method: 'POST',
    url: '/master/closeDate/delete',
    data: formData
  })
}

/**
 * 14、添加股票
 * @param { stockAdd } JSON
 */
export const stockAdd = increaseInline => {
  return request({
    method: 'POST',
    url: '/master/stock/add',
    data: increaseInline
  })
}

/**
 * 15、查询所有股票（包括退市的）
 * @param { stockGetAllList } formData
 */
export const stockGetAllList = formData => {
  return request({
    method: 'POST',
    url: '/master/stock/getAllList',
    data: formData
  })
}

/**
 * 16、更新股票信息（只有名称类信息）
 * @param { stockUpdate } JSON
 */
export const stockUpdate = ToUpdate => {
    return request({
      method: 'POST',
      url: '/master/stock/update',
      data: ToUpdate
    })
}

/**
 * 17、股票退市
 * @param { stockDelete } formData
 */
export const stockDelete = formData => {
  return request({
    method: 'POST',
    url: '/master/stock/delete',
    data: formData
  })
}
