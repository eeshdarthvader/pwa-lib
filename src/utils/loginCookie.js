import { isEmpty, mapOnObject, path } from 'Utils'
import { eraseStorage } from 'Utils/storage'

export const writeCookie = (k, v, expiryInDays) => {
  const isProd = process.env.NODE_ENV === 'production'
  if (!isProd) {
    if (expiryInDays > 0) {
      const now = new Date()
      const time = now.getTime()
      const secondsInDay = 24 * 3600 * 1000
      const expireTime = time + secondsInDay * expiryInDays
      now.setTime(expireTime)
      document.cookie = `${k}=${v};path="/";`
      document.cookie = `expires=${now.toGMTString()};path="/";`
    } else if (!expiryInDays || expiryInDays === '') {
      document.cookie = `${k}=${v};path="/";`
    }
  }
  return null
}

export const readCookie = (k = 'userid') => {
  const nameEQ = `${k}=`
  let ca = document.cookie
  if (isEmpty(ca)) {
    return null
  }
  ca = ca.split(';')
  const getExpiresCookie = element => element.indexOf('expires') !== -1
  const expiresCookie = ca.find(getExpiresCookie)
  const getUserIdCookie = element => element.indexOf('userid') !== -1
  let userIdCookie = ca.find(getUserIdCookie)
  const getUserMiscCookie = element => element.indexOf('usermisc') !== -1
  let userMiscCookie = ca.find(getUserMiscCookie)
  let userStatus = ''
  if (!isEmpty(userMiscCookie)) {
    ;[userMiscCookie] = decodeURIComponent(userMiscCookie.trim()).split('|')
    ;[, userStatus] = userMiscCookie.split('=')
  }
  if (expiresCookie) {
    const expiryTime = new Date(
      expiresCookie.substring(expiresCookie.indexOf('=') + 1)
    ).getTime()
    let now = new Date()
    now = now.getTime()
    if (expiryTime < now) {
      eraseStorage()
      return null
    }
  }
  if (userIdCookie && userStatus === 'SIGNED_IN') {
    userIdCookie = userIdCookie.substring(
      userIdCookie.indexOf('userid'),
      userIdCookie.length
    )
    if (userIdCookie.indexOf(nameEQ) === 0) {
      let userId = decodeURIComponent(
        userIdCookie.substring(nameEQ.length, userIdCookie.length)
      )
      const separatorIndex = userId.indexOf('|')
      if (separatorIndex) {
        userId =
          separatorIndex > 6
            ? (userId = userId.substr(0, separatorIndex))
            : userId
      }
      return userId
    }
  }
  return null
}

export function getABTestData(prefix = '') {
  let abCookies = getCookie('ct-ab')
  if (!abCookies) {
    return {}
  }
  abCookies = JSON.parse(decodeURIComponent(abCookies))
  const data = {}
  mapOnObject(abCookies, (value, key) => {
    data[`${prefix}${key}`] = value
  })
  return data
}

export function getCookie(name) {
  const getByName = element => element.indexOf(`${name}=`) === 0
  const value = document.cookie.split('; ').find(getByName) || ''
  return path([1], value.split('='))
}
