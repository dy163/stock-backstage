import request from '@/utils/request'

/**
 * 1、后台登录
 * @param { userLogin } formData
 */
export const userLogin = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/login',
    data: formData
  })
}

/**
 * 2、添加后台管理员
 * @param { userAdd } formData
 */
export const userAdd = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/add',
    data: formData
  })
}

/**
 * 3、获取后台管理员列表
 * @param { userGetList } formData
 */
export const userGetList = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/getList',
    data: formData
  })
}

/**
 * 4、修改管理员账号状态
 * @param { userUpdate } formData
 */
export const userUpdate = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/update',
    data: formData
  })
}
/**
 * 5、获取前台用户
 * @param { adminUserList } formData
 */
export const adminUserList = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/getUserList',
    data: formData
  })
}

/**
 * 6、审核前台用户
 * @param { userVerityUser } formData
 */
export const userVerityUser = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/verityUser',
    data: formData
  })
}

/**
 * 7、后台管理员退出登录
 * @param { userExit } formData
 */
export const userExit = formData => {
  return request({
    method: 'POST',
    url: '/master/adminUser/exit',
    data: formData
  })
}
