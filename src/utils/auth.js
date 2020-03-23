const localStorage = window.localStorage
const USER_KEY = 'user_info'
const USER_NAME = 'user_name'

// 获取本地存储token
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

// 添加本地存储token
export function saveUser (data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

// 删除本地存储token
export function removeUser () {
  localStorage.removeItem(USER_KEY)
}

// 添加本地存储姓名
export function saveUserName (data) {
  localStorage.setItem(USER_NAME, JSON.stringify(data))
}

// 获取本地存储姓名
export function getUserName (data) {
  return JSON.parse(localStorage.getItem(USER_NAME))
}

// 删除本地存储
export function removeUserName () {
  localStorage.removeItem(USER_NAME)
}
