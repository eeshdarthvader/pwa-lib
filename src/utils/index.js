import querystring from 'querystring'
import { browserHistory } from 'Utils/history'

import { DAYS, MONTHS, TRAIN_CLASS, language } from 'Constants'

import { CLAMP_MIN_MAX } from 'Constants/errors'

export const typeOf = obj => {
  let detv = typeof obj
  const isObject = value => value === 'object'
  const isArray = value =>
    Object.prototype.toString.call(value) === '[object Array]'

  if (isObject(detv)) {
    if (obj) {
      if (isArray(obj)) {
        detv = 'array'
      }
    } else {
      detv = 'null'
    }
  }
  return detv
}

export const isValidEmail = email => {
  const pattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
  return pattern.test(email)
}

export const gstValidator = (number, expression) => {
  const regex = new RegExp(expression)
  let matched = false
  if (number.length === 15) {
    matched = regex.test(number) // eslint-disable-line
  }
  return matched
}

export const vatValidator = (number, expression) => {
  const regex = new RegExp(expression)
  let matched = false
  matched = regex.test(number) // eslint-disable-line
  return matched
}

export const pad = s => {
  return s < 10 ? `0${s}` : s
}

export const convertDate = (date, separator = '-') => {
  // Accepts "Thu Aug 10 2017 00:00:00 GMT+0530 (IST)"
  // Returns 10-08-2017
  if (date) {
    const d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
      separator
    )
  }
}
export const getformattedDate = date => {
  // Accepts 10-08-2017
  // Returns Wed, 10 Aug
  const nDate = new Date(date)
  return `${DAYS[nDate.getDay()]}, ${nDate.getDate()} ${
    MONTHS[nDate.getMonth()]
  }`
}

export const getTimeHM = time => {
  // Accepts 23:45:00
  // Return 23:45
  const tm = time.split(':')
  return `${tm[0]}:${tm[1]}`
}

export const formatDate = date => {
  const type = typeOf(date)
  let nDate
  if (type === 'number') {
    nDate = new Date(date)
  } else if (type === 'string') {
    nDate = new Date(parseInt(date, 10))
  } else {
    nDate = date
  }
  return `${DAYS[nDate.getDay()]}, ${pad(nDate.getDate())} ${
    MONTHS[nDate.getMonth()]
  }`
}

export const isEmpty = obj => {
  if (obj instanceof Date) {
    return false
  }
  // null and undefined are "empty"
  if (obj == null) {
    return true
  }

  const isNumber = value =>
    Object.prototype.toString.call(value) === '[object Number]'
  const isNaN = value => isNumber(value) && value.toString() === 'NaN'

  if (isNumber(obj)) {
    return isNaN(obj)
  }

  /** Assume if it has a length property with a non-zero value
   * that that property is correct.
   */
  if (obj.length > 0) {
    return false
  }
  if (obj.length === 0) {
    return true
  }

  /** If it isn't an object at this point
   * it is empty, but it can't be anything *but* empty
   * Is it empty?  Depends on your application.
   */
  if (typeof obj !== 'object') {
    return true
  }

  /**  Otherwise, does it have any properties of its own?
   * Note that this doesn't handle
   * toString and valueOf enumeration bugs in IE < 9
   */
  const keys = Object.keys(obj)
  for (let i = 0, key = keys[i]; i < keys.length; i += 1) {
    if (hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

export const getTimeInSeconds = time => {
  let timeInSeconds = 0
  if (!isEmpty(time)) {
    const timeArray = time.split(' ')
    for (let index = 0; index < timeArray.length; index += 1) {
      const timeItem = timeArray[index]
      const type = timeItem.charAt(timeItem.length - 1)
      const value = timeItem.substring(0, timeItem.length - 1)
      switch (type) {
        case 'd':
          timeInSeconds += value * 86400
          break
        case 'h':
          timeInSeconds += value * 3600
          break
        case 'm':
          timeInSeconds += value * 60
          break
        default:
          timeInSeconds += value
      }
    }
  }
  return timeInSeconds
}

export const path = (p, o) => {
  const reducerFunction = (xs, x) => {
    return xs && xs[x] ? xs[x] : null
  }
  return p.reduce(reducerFunction, o)
}

export const getFormattedTime = (totalSeconds, stringFormat = false) => {
  if (typeof totalSeconds !== 'string') {
    let seconds = totalSeconds
    const days = Math.floor(seconds / 86400)
    seconds %= 86400
    const hours = Math.floor(seconds / 3600)
    seconds %= 3600
    const minutes = Math.floor(seconds / 60)
    seconds %= 60
    if (stringFormat) {
      return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${
        minutes > 0 ? `${minutes}m` : ''
      }`
    }
    return { days, hours, minutes, seconds }
  } else {
    return totalSeconds
  }
}

export const escapeRegExp = str =>
  new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')) // eslint-disable-line no-useless-escape

export const toQueryString = (object, sep = '&', eq = '=') => {
  return querystring.stringify(object, sep, eq)
}

export const fromQueryString = (queryString, sep = '&', eq = '=') => {
  return querystring.parse(queryString, sep, eq)
}

export const getDayDiff = day => {
  const DAY_DIFF = {
    '-1': 'yesterday',
    0: '',
    1: 'tomorrow'
  }
  let dayDiff = DAY_DIFF[day]
  if (!dayDiff && dayDiff !== '') {
    if (day < 0) {
      dayDiff = `${Math.abs(day)} days ago`
    } else {
      dayDiff = `${day} day`
    }
  }
}

/** Clamps the given number between min and max values.
 * Returns value if within range, or closest bound.
 */
export const clamp = (val, min, max) => {
  if (max < min) {
    throw new Error(CLAMP_MIN_MAX)
  }
  return Math.min(Math.max(val, min), max)
}

/** Returns whether the value is a function. Acts as a type guard. */
export const isFunction = value => {
  return typeof value === 'function'
}

/**
 * Safely invoke the function with the given arguments,
 * if it is indeed a function, and return its value.
 */
export const safeInvoke = (func = undefined, ...args) => {
  return isFunction(func) && func(...args)
}

export const isNodeEnv = env => {
  return (
    typeof process !== 'undefined' &&
    process.env &&
    process.env.NODE_ENV === env
  )
}

export const getTrainsTravellerText = travellers => {
  const type = ['adults', 'children', 'srMen', 'srWomen']
  const data = []
  for (let i = 0; i < type.length - 1; i += 1) {
    const current = type[i]
    const count = travellers[current]
    let text = ''
    if (count > 0 || current === 'srMen') {
      if (current === 'adults') {
        text = `${count} Adult${count > 1 ? 's' : ''}`
      } else if (current === 'children') {
        text += `${count} Child${count > 1 ? 'ren' : ''}`
      } else {
        const srCount = count + travellers[type[i + 1]]
        if (srCount > 0) {
          text = `${srCount} Sr. Adult${srCount > 1 ? 's' : ''}`
        }
      }
      if (text) {
        data.push(text)
      }
    }
  }
  return data.join(', ')
}

export const getFlightsTravellersText = travellers => {
  const types = ['adults', 'children', 'infants']
  const data = []
  types.forEach(type => {
    const count = travellers[type]
    let text = ''
    if (count > 0) {
      if (type === 'adults') {
        text = `${count} Adult${count > 1 ? 's' : ''}`
      } else if (type === 'children') {
        text += `${count} Child${count > 1 ? 'ren' : ''}`
      } else {
        text += `${count} Infant${count > 1 ? 's' : ''}`
      }
    }
    if (text) {
      data.push(text)
    }
  })
  return data.join(', ')
}

export const trainClassMap = classCode => {
  return TRAIN_CLASS.find(tClass => {
    return tClass.code === classCode
  })
}

export const reduceObjectToArray = obj => {
  if (isEmpty(obj)) {
    return []
  }
  return Object.keys(obj).map(key => {
    const o = obj[key]
    o.id = key
    return o
  })
}

export const toProperCase = str => {
  return (
    str &&
    str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  )
}

export const getCardType = type => {
  switch (type) {
    case 'visa':
      return 1
    case 'mastercard':
      return 2
    case 'amex':
      return 3
    case 'maestro':
      return 5
    default:
      return 4
  }
}

export const openInNewTab = url => {
  const win = window.open(url, '_blank')
  win.focus()
}

export const addDaysToDate = (initialDate, days) => {
  const date = new Date(initialDate.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export const softClone = data => {
  if (Array.isArray(data)) {
    return data.slice(0)
  }
  if (data) {
    return Object.create(data)
  }
}

export const getCurrency = (currency = 'INR') => {
  const langMeta = getLanguageMeta()
  currency = langMeta.currency
  return currency
}

export const getLocaleByCurrency = (currency = 'INR') => {
  const locales = {
    INR: 'en-IN',
    AED: 'en-IN',
    OMR: 'en-IN',
    KWD: 'en-IN',
    BHD: 'en-IN',
    SAR: 'en-IN'
  }
  return locales[currency]
}

export function convertNumberLanguage(num) {
  return num.toLocaleString(`${language}`, {
    style: 'decimal',
    minimumFractionDigits: 0
  })
}

export const formatCurrency = (value, currency) => {
  if (!currency) {
    currency = getCurrency()
  }

  const locale = getLocaleByCurrency(currency)
  const formatted = parseInt(value, 10).toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  })
  return formatted
}

export const flightStops = stop => {
  // to be moved to flights utils or multi-lingual support
  return stop === 0 ? 'non-stop' : `${stop} stop${stop > 1 ? 's' : ''}`
}

export const stripTags = str => {
  // Some api error message throwing in html tags
  if (!str || str === '') {
    return ''
  }
  const newStr = str.toString()
  return newStr.replace(/<[^>]*>/g, '\n')
}

export const constructSearchQueryUrl = searchQuery => {
  const urlParams = {
    from: searchQuery.source,
    to: searchQuery.destination,
    from_header: searchQuery.sourceHeader,
    to_header: searchQuery.destinationHeader,
    depart_date: searchQuery.departDate,
    adults: searchQuery.travellers.adults,
    childs: searchQuery.travellers.children,
    infants: searchQuery.travellers.infants,
    class: searchQuery.flightClass
  }
  if (searchQuery.returnDate) {
    urlParams.return_date = searchQuery.returnDate
  }
  return urlParams
}

export const reduceStringToArray = str => {
  try {
    if (isEmpty(str)) {
      return []
    } else if (typeof str === 'string') {
      return JSON.parse(str)
    }
    return str
  } catch (e) {
    return []
  }
}

export const convertToBoolean = value => {
  if (typeof value === 'boolean') {
    return value
  }
  return value === 'true'
}

export const mapOnObject = (object, iteratee) => {
  const mapValues = []
  for (const [name, value] of Object.entries(object)) {
    mapValues.push(iteratee(value, name))
  }
  return mapValues
}

export const removeFromArray = (array, value) => {
  const index = array.indexOf(value)
  const newArray = array.slice()
  if (index > -1) {
    newArray.splice(index, 1)
    return newArray
  }
  return array
}

export const pluralize = (value, text, suffix = 's') =>
  +value === 1 ? text : `${text}${suffix}`

export const sortCollection = (data, key) => {
  const newData = data.slice()
  return newData.sort((a, b) => a[key].localeCompare(b[key]))
}

export const getProductType = () => {
  const location = browserHistory.getCurrentLocation()
  const pathName = path(['pathname'], location)
  const isFlights = pathName.includes('flights')
  const isTrains = pathName.includes('trains')
  const isHotels = pathName.includes('hotels')
  if (isFlights) {
    return 'Flights'
  } else if (isTrains) {
    return 'Trains'
  } else if (isHotels) {
    return 'Hotels'
  }
  return ''
}

export const isValidDate = date => {
  return date && !isNaN(date.getTime())
}

export const isValidDob = (type, dob) => {
  let selectedDate = new Date(dob)
  selectedDate.setHours(0, 0, 0)
  selectedDate = selectedDate.getTime()
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0)
  currentDate = currentDate.getTime()
  let minYears = 12
  let maxYears = 120
  if (type === 'children') {
    minYears = 2
    maxYears = 12
  } else if (type === 'infants') {
    minYears = 0
    maxYears = 2
  }
  const age = (currentDate - selectedDate) / (1000 * 60 * 60 * 24 * 365)
  return maxYears >= age && age > minYears
}

export const calculateImageHeight = width => {
  const aspectRatio = 4.0 / 3.0
  return Math.round(width / aspectRatio)
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', 'BlackBerry', 'ChromeOS' or 'unknown'.
 *
 * @returns {String}
 */
export const detectOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Windows Phone must come first because its UA also contains "Android"
  if (/IEMobile|Windows Phone/i.test(userAgent)) {
    return 'Windows Phone'
  }

  if (/BlackBerry|BB|PlayBook/i.test(userAgent)) {
    return 'BlackBerry'
  }

  if (/\bCrOS\b/.test(navigator.userAgent)) {
    return 'ChromeOS'
  }

  if (/Android/i.test(userAgent)) {
    return 'Android'
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'
  }

  return 'unknown'
}

export const getLanguageMeta = () => {
  const domain = path(['location', 'hostname'], window) // window.location.hostname;
  switch (domain) {
    case 'www.cleartrip.ae':
    case 'qa2.cleartrip.ae':
      return { locale: 'AE', currency: 'AED', country: 'UAE' }
    case 'bh.cleartrip.com':
      return { locale: 'BH', currency: 'BHD', country: 'BHR' }
    case 'om.cleartrip.com':
      return { locale: 'OM', currency: 'OMR', country: 'OMN' }
    case 'kw.cleartrip.com':
      return { locale: 'KW', currency: 'KWD', country: 'KWT' }
    case 'qa.cleartrip.com':
      return { locale: 'QA', currency: 'QAR', country: 'QAT' }
    case 'www.cleartrip.sa':
    case 'qa2.cleartrip.sa':
      return { locale: 'SA', currency: 'SAR', country: 'KSA' }
    case 'qa2.cleartrip.com':
      return { locale: 'IN', currency: 'INR', country: 'IN' }
    case 'me.cleartrip.com':
      return { locale: 'ME', currency: 'USD', country: 'ME' }
    case 'www.cleartrip.me':
      return { locale: 'US', currency: 'USD', country: 'ME' }
    case 'www.cleartrip.eu':
      return { locale: 'EU', currency: 'EUR', country: 'EUR' }
    case 'www.cleartrip.pl':
      return { locale: 'EU', currency: 'EUR', country: 'EUR' }
    default:
      return { locale: 'IN', currency: 'INR', country: 'IN' }
  }
}

export const isMEDomain = () => {
  const domain = path(['location', 'hostname'], window)
  switch (domain) {
    case 'qa2.cleartrip.ae':
    case 'www.cleartrip.ae':
    case 'bh.cleartrip.com':
    case 'qa.cleartrip.com':
    case 'om.cleartrip.com':
    case 'kw.cleartrip.com':
    case 'www.cleartrip.sa':
    case 'qa2.cleartrip.sa':
    case 'me.cleartrip.com':
    case 'www.cleartrip.me':
      return true
    default:
      return false
  }
}

export const writeCookie = (k, v, expiryInDays) => {
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd) {
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

export function getCookie(name) {
  if (document.cookie.indexOf(name) > -1) {
    return document.cookie
      .split(name)[1]
      .split('; ')[0]
      .substr(1)
  } else {
    return ''
  }
}

export const readParam = (name, options = {}) => {
  const queryString = window.location.search.split('?')
  const urlHash = fromQueryString(queryString[1] ? queryString[1] : '')
  const params = urlHash ? urlHash : {}

  const cookieValue = getCookie(name || options.alias)
  const value = params[name] || params[options.alias]

  // if value present in param then return that, otherwise check in cookie
  if (value) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    writeCookieUtm(name, value, options.expiry || 1)
    return value
  } else {
    if (cookieValue) {
      return cookieValue
    }
  }
}

export function indianDateFormat(date) {
  var date = new Date(date)
  return (
    (date.getDate() + '').padStart(2, '0') +
    '-' +
    (date.getMonth() + 1 + '').padStart(2, '0') +
    '-' +
    date.getFullYear()
  )
}

export const getFormattedExpiryDate = date => {
  let [month, year] = date.split('/')
  month = month && parseInt(month, 10)
  if (year) {
    year = `20${year}`
    year = year && parseInt(year, 10)
  }
  return { month, year }
}
