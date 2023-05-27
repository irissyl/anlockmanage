import Vue from 'vue'
import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  invalidCode,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
  tokenRequestName,
  loginInterception,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { isArray } from '@/utils/validate'

let loadingInstance

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  console.log(code, 'code')
  switch (code) {
    case invalidCode:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
      store.dispatch('user/resetAccessToken').catch(() => {})
      if (loginInterception) {
        location.reload()
      }
      break
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {})
      break
    default:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
      break
  }
}

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      config.headers[tokenRequestName] =
        'bearer ' + store.getters['user/accessToken']
    }
    //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    if (config.data)
      config.data = Vue.prototype.$baseLodash.pickBy(
        config.data,
        Vue.prototype.$baseLodash.identity
      )
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    if (debounce.some((item) => config.url.includes(item)))
      loadingInstance = Vue.prototype.$baseLoading()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close()
    const { data, config } = response
    // console.log(data, config, 'response')

    const { resultCode, message } = data
    // console.log(resultCode, message, 'data')

    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(resultCode)) {
      return data
    } else {
      handleCode(resultCode)
      return Promise.reject(
        '请求异常拦截:' +
          JSON.stringify({ url: config.url, resultCode, message }) || 'Error'
      )
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
      return Promise.reject(error)
    }
  }
)

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
instance.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[proxyApi/]前缀做代理拦截!
  //return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? 'proxyApi/' : process.env.VUE_APP_URL) + actionName
  if (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY) {
    return `${actionName}`
  } else {
    return process.env.VUE_APP_URL + actionName
  }
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
instance.adornParams = (params = {}, openDefultParams = false) => {
  var defaults = {
    t: new Date().getTime(),
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
instance.adornData = (
  data = {},
  openDefultdata = false,
  contentType = 'json'
) => {
  var defaults = {
    t: new Date().getTime(),
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

instance.get = (url, query) => {
  return http({
    // url: http.adornUrl(url),
    url: url,
    method: 'get',
    params: query,
  })
}

instance.post = (url, data) => {
  return http({
    // url: http.adornUrl(url),
    url: url,
    method: 'post',
    data: data,
  })
}

instance.put = (url, data) => {
  return http({
    // url: http.adornUrl(url),
    url: url,
    method: 'PUT',
    data: data,
  })
}

instance.del = (url, query) => {
  return http({
    // url: http.adornUrl(url),
    url: url,
    method: 'delete',
    params: query,
  })
}

instance.formData = (url, data) => {
  return http({
    // url: http.adornUrl(url),
    url: url,
    method: 'post',
    data: qs.stringify(data),
  })
}

instance.upload = (url, data, flag) => {
  return http({
    // url: http.adornUrl(url),
    url: url,
    method: 'post',
    data: data,
    flag,
  })
}

instance.body = (url, data) => {
  if (data.id) {
    return http({
      url: http.adornUrl(url),
      method: 'PUT',
      data: qs.stringify(data),
    })
  } else {
    return http({
      url: http.adornUrl(url),
      method: 'post',
      data: qs.stringify(data),
    })
  }
}

instance.addOrEdit = (url, data) => {
  if (data.id) {
    return http({
      url: http.adornUrl(url),
      method: 'PUT',
      data: data,
    })
  } else {
    return http({
      url: http.adornUrl(url),
      method: 'post',
      data: data,
    })
  }
}
export default instance
