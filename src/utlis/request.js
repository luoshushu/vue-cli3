import { Message, MessageBox } from 'element-ui'

import axios from 'axios'
import qs from 'qs'
import store from '@/store'
const PROMISE = new Promise(() => {
})
const CancelToken = axios.CancelToken
const requestMap = new Map()
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // 请求超时
})
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
// axios.defaults.timeout = 5000
// request拦截器 请求前置拦截器
service.interceptors.request.use(
  config => {
    console.log(config)
    // 防重复提交
    const keyString = qs.stringify(Object.assign({}, { url: config.url, method: config.method }, config.data))
    console.log(keyString)

    if (requestMap.get(keyString)) {
      // 取消当前请求
      config.cancelToken = new CancelToken((cancel) => {
        cancel('请不要重复提交')
      })
    }
    requestMap.set(keyString, true)
    Object.assign(config, { _keyString: keyString })

    // 这里可以自定义一些config 配置
    if (config.method.toLowerCase() === 'post' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
    if (/application\/x-www-form-urlencoded/.test(config.headers['Content-Type']) && typeof config.data === 'object') {
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    }

    return config
  },
  error => {
    //  这里处理一些请求出错的情况
    console.log(error)
  

    Promise.reject(error)
  }
)

/**
 * respone拦截器 数据相应拦截
 */
service.interceptors.response.use(
  response => {
    // 重置requestMap
    // const config: any = res.config
    console.log(response)

    requestMap.set(response.config._keyString, false)

    // 这里处理一些response 正常返回时的逻辑
    const res = response.data
    if (res.code != 200) {
      console.error('出错了===>', res.msg)
    }
    // 500:服务器错误;  401: Token无效
    if (res.code === 500 || res.code === 401) {
      MessageBox.confirm(res.msg, '确定', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }

    return res
  },
  error => {


    return Promise.reject(error)
  }
)
// console.log(service)
export default service

// export default async (requestOptions, options) => {
//   let type = Object.prototype.toString.call(options).toLowerCase()
//   let loading = true
//   if (type === '[object object]') {
//     if (options.loading === false) loading = false
//     // 取消拦截，释放数据统一处理的权限
//     if (options.intercept === false) return axios({ ...requestOptions, _noLoading: !loading, _noInterceptor: true })
//   }
//   // 拦截数据，统一处理
//   try {
//     let { data } = await axios({...requestOptions,_noLoading: !loading,_noInterceptor: false})
//     // 这种情况在axis.interceptor里做了统一处理，返回Promise但不执行relove，目的是挂起业务逻辑
//     if (data.stat != 1) return PROMISE
//     return data
//   } catch (e) {
//     console.warn(e)
//   }
// }
