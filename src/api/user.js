import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  return request({
    url: '/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}

// // 获取菜单
export function listMenuItem() {
  return request({
    url: '/api/account/listMenuItem',
    method: 'post',
  })
}
