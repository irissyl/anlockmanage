//统一API管理
import request from '@/utils/request'

//三级联动请求接口
// url:/product/getBaseCategoryList get

//发请求:axios发请求返回结果promise对象
export function login(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data,
  })
}
