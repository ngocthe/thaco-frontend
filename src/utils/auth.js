import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setLang(lang) {
  localStorage.setItem('lang', lang)
  window.location.reload()
}
export function getLang() {
  return localStorage.getItem('lang') || 'en'
}
