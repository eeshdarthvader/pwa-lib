import { path } from 'Utils'

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
export const FULL_NAMES_OF_DAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

export const TRAIN_CLASS = [
  { code: 'SL', value: 'Sleeper' },
  { code: '1A', value: 'AC First Class' },
  { code: '2A', value: 'AC 2 Tier' },
  { code: '3A', value: 'AC 3 Tier' },
  { code: 'CC', value: 'AC Chair Car' },
  { code: 'FC', value: 'First Class' },
  { code: 'EC', value: 'Exec. Chair Car' },
  { code: '2S', value: 'Second Sitting' },
  { code: '3E', value: 'AC 3 Economy' }
]

export const FLIGHT_CLASS = [
  { code: 'Economy', value: 'Economy' },
  { code: 'Business', value: 'Business' },
  { code: 'First', value: 'First' },
  { code: 'Premium Economy', value: 'Premium Economy' }
]

export const FLIGHT_FARE_REFUNDABLE = 'Refundable'

export const FLIGHT_FARE_NON_REFUNDABLE = 'Non Refundable'

export const FLIGHT_DEPART_FILTER_HEADING = [
  'Onward Departure Time',
  'Return Departure Time'
]

export const FLIGHT_DEPART_FILTER_LABEL = {
  '0_8': { text: 'Early morning', time: '12am - 8am' },
  '8_12': { text: 'Morning', time: '8am - 12pm' },
  '12_16': { text: 'Mid-day', time: '12pm - 4pm' },
  '16_20': { text: 'Evening', time: '4pm - 8pm' },
  '20_24': { text: 'Night', time: '8pm - 12pm' }
}

export const FLIGHT_ITINERARY_SC_DATE_FORMAT = 'YYYY-MM-DD\\THH:mm:ss' // Itinerary incoming Search criteria date format

export const DOM_RT_QUERY = 'iOSB2CAirSearch_dom_rt'
export const DOM_OW_QUERY = 'iOSB2CAirSearch_dom_ow'
export const INTL_RT_QUERY = 'iOSB2CAirSearch_intl_rt'
export const INTL_OW_QUERY = 'iOSB2CAirSearch_intl_ow'

export const GTM_METASOURCE_EXPIRY_DAYS = 30

export const PAYMENT_CARDINFO_MIN_CHARS = 6

let hostname
let langPrefix = ''
let lang = 'en'
export const ARABIC_LANG = 'arbeta'

try {
  hostname = path(['location', 'hostname'], window)
  let [, ln = lang] = path(['location', 'pathname'], window).split('/')
  if (ln === ARABIC_LANG) {
    langPrefix = `/${ARABIC_LANG}`
    lang = ln
  }
  if (process.env.arbeta) {
    lang = ARABIC_LANG
  }
} catch (e) {
  hostname = '0.0.0.0'
}

export const DOMAIN =
  process.env.NODE_ENV === 'production' ? '' : `http://${hostname}:3001`

export const GQL_SUB_DOMAIN = process.env.PWA_ENV === 'qa' ? 'qa-gql' : 'gql'
export const appLangPrefix = langPrefix || '/'
export const appRoutePrefix = `${langPrefix}/m`
export const HOST = hostname
export const language = lang
