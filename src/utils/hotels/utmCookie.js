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

export const writeCookieUtm = (k, v, expiryInDays) => {
  if (expiryInDays > 0) {
    const now = new Date()
    const nextDate = now.setDate(now.getDate() + expiryInDays)
    const expiresDate = new Date(nextDate)
    document.cookie = `${k}=${v}; path=/; expires=` + expiresDate
  } else if (!expiryInDays || expiryInDays === '') {
    document.cookie = `${k}=${v};path="/";`
  }

  return null
}

export const getLanguageMeta = () => {
  const domain = path(['location', 'hostname'], window)
  const languageMeta = {
    currency: 'INR',
    locale: 'IN'
  }
  if (domain === 'www.cleartrip.ae') {
    languageMeta['currency'] = 'AED'
    languageMeta['locale'] = 'AE'
  }
  return languageMeta
}
