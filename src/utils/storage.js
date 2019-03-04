import localforage from 'localforage'

let trainsDB
let paymentDB
let userDB
let flightsDB
let hotelsDB
let analyticsDB

export const configStorage = () => {
  localforage.config({
    version: 1.0,
    description: 'Cleartrip DB'
  })
  trainsDB = localforage.createInstance({
    name: 'ct-trains',
    storeName: 'trains'
  })
  paymentDB = localforage.createInstance({
    name: 'ct-payment',
    storeName: 'payment'
  })
  userDB = localforage.createInstance({
    name: 'ct-user',
    storeName: 'user'
  })
  flightsDB = localforage.createInstance({
    name: 'ct-flights',
    storeName: 'flights'
  })
  hotelsDB = localforage.createInstance({
    name: 'ct-hotels',
    storeName: 'hotels'
  })
  analyticsDB = localforage.createInstance({
    name: 'ct-analytics',
    storeName: 'analytics'
  })
}

export const getItem = (db, item) => db.getItem(item)

export const setItem = (db, item, value) => db.setItem(item, value)

export const removeItem = (db, item) => db.removeItem(item)

export const getTrainsItem = item => getItem(trainsDB, item)

export const setTrainsItem = (item, value) => setItem(trainsDB, item, value)

export const removeTrainsItem = item => removeItem(trainsDB, item)

export const getPaymentItem = item => getItem(paymentDB, item)

export const setPaymentItem = (item, value) => setItem(paymentDB, item, value)

export const removePaymentItem = item => removeItem(paymentDB, item)

export const getUserItem = item => getItem(userDB, item)

export const setUserItem = (item, value) => setItem(userDB, item, value)

export const removeUserItem = item => removeItem(userDB, item)

export const getFlightsItem = item => getItem(flightsDB, item)

export const setFlightsItem = (item, value) => setItem(flightsDB, item, value)

export const removeFlightsItem = item => removeItem(flightsDB, item)

export const getHotelsItem = item => getItem(hotelsDB, item)

export const setHotelsItem = (item, value) => setItem(hotelsDB, item, value)

export const removeHotelsItem = item => removeItem(hotelsDB, item)

export const getAnalyticsItem = item => getItem(analyticsDB, item)

export const setAnalyticsItem = (item, value) =>
  setItem(analyticsDB, item, value)

export const eraseStorage = () => {
  removeUserItem('userData')
  removePaymentItem('payment')
  removePaymentItem('gatewayParams')
  removeTrainsItem('itineraryData')
  removeTrainsItem('selectedTrain')
  removeTrainsItem('travellerGst')
  removeTrainsItem('travellersDetails')
  removeTrainsItem('contactInfo')
  removeTrainsItem('travellerGstState')
  removeTrainsItem('travellersResponse')
}
