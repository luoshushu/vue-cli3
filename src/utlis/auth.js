import Cookies from 'js-cookie'
const TokenKey = 'token'
export function getToken (params) {
  return Cookies.get(TokenKey)
}
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken (TokenKey) {
  return Cookies.remove(TokenKey)
}
