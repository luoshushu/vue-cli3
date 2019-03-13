import request from '@/utlis/request'


// 登录
export function login(params ) {
  return request({
    url: '/v1/login',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 退出登录
export function loginOut(params ) {
  return request({
    url: '/v1/loginOut',
    method: 'GET',
    data: params,
  })
}
// 注册
export function registerUser(params ) {
  return request({
    url: '/v1/registerUser',
    method: 'POST',
    data: params,
  })
}


export function getUsers(params) {
  return request({
    url: '/getUsers',
    method: 'GET',
    data: params,
  })
}
export function mockData(params ) {
  return request({
    url: '/api/index',
    method: 'POST',
    data: params,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}

