import {
  FLIGHT_FARE_REFUNDABLE,
  FLIGHT_FARE_NON_REFUNDABLE,
  DOM_OW_QUERY,
  DOM_RT_QUERY,
  INTL_OW_QUERY,
  INTL_RT_QUERY
} from 'Constants'
import { path, isEmpty, mapOnObject } from './'

export const prepareFlightData = rawData => {
  const { fare, content, mapping, jsons } = rawData //eslint-disable-line
  const flightData = []
  mapping.onward.map((item, i) => {
    const flight = {}
    const flights = []
    item.c.map((f, j) => {
      const flightDetails = content[f]
      const [, flightNo, departDate, departTime] = flightDetails.fk.split('_')
      const [day, month, century, shortYear] = departDate.match(/.{1,2}/g)
      const date = new Date(`${day}/${month}/${century}${shortYear}`)
      const [hours, minutes] = departTime.split(':')
      date.setHours(hours)
      date.setMinutes(minutes)
      const airline = jsons.airline_names[flightNo.split('-')[0]]
      flights.push({ ...flightDetails, airline, flightNo, depart: date })
      return f
    })
    flight.list = flights
    flight.stops = flights.length - 1
    flight.fare_details = fare[item.f]
    const { dfd } = flight.fare_details
    flight.isRefundable = dfd === 'R'
    flight.fare = flight.fare_details[dfd]
    flightData.push(flight)
    return item
  })
  return flightData
}

export const getPopularCities = () => {
  const domain = path(['location', 'hostname'], window) // window.location.hostname;
  switch (domain) {
    case 'www.cleartrip.ae':
    case 'bh.cleartrip.com':
    case 'om.cleartrip.com':
    case 'kw.cleartrip.com':
    case 'www.cleartrip.sa':
    case 'qa.cleartrip.com':
      return [
        {
          code: 'AUH',
          airport: 'Abu Dhabi, AE - Abu Dhabi International Airport'
        },
        { code: 'BAH', airport: 'Bahrain, BH - Bahrain' },
        { code: 'DMM', airport: 'Dammam, SA - King Fahad' },
        { code: 'DOH', airport: 'Doha, QA - Doha' },
        { code: 'DXB', airport: 'Dubai, AE - Dubai International Airport' },
        { code: 'JED', airport: 'Jeddah, SA - Jeddah' },
        { code: 'KWI', airport: 'Kuwait, KW - Kuwait' },
        { code: 'MCT', airport: 'Muscat, OM - Seeb' },
        { code: 'MED', airport: 'Madinah, SA - Prince Mohammad Bin Abdulaziz' },
        { code: 'RUH', airport: 'Riyadh, SA - King Khaled' },
        { code: 'SHJ', airport: 'Sharjah, AE - Sharjah' }
      ]
    default:
      return [
        {
          code: 'BLR',
          airport: 'Bangalore, IN - Kempegowda International Airport'
        },
        { code: 'BOM', airport: 'Mumbai, IN - Chatrapati Shivaji Airport' },
        {
          code: 'CCU',
          airport: 'Kolkata, IN - Netaji Subhas Chandra Bose Airport'
        },
        { code: 'DEL', airport: 'New Delhi, IN - Indira Gandhi Airport' },
        { code: 'DXB', airport: 'Dubai, AE - Dubai International Airport' },
        { code: 'GOI', airport: 'Goa, IN - Dabolim Airport' },
        { code: 'HYD', airport: 'Hyderabad, IN - Rajiv Gandhi International' },
        { code: 'KTM', airport: 'Kathmandu, NP - Tribuvan' },
        { code: 'MAA', airport: 'Chennai, IN - Chennai Airport' },
        { code: 'SFO', airport: 'San Francisco, US - San Francisco' },
        { code: 'SIN', airport: 'Singapore, SG - Changi' }
      ]
  }
}

export const getTravellersCategory = category => {
  switch (category) {
    case 'adults':
      return 'Adult'
    case 'children':
      return 'Child'
    case 'infants':
      return 'Infant'
    default:
      return category
  }
}

export const getWarnings = (failure, place = 'SEAT_SELL_1') => {
  if (!isEmpty(failure)) {
    const { pr: { otf, ntf } = {}, sc, fnf } = failure
    const warnings = []
    // Price Change
    if (failure.pr && otf && ntf) {
      if (ntf > otf) {
        warnings.push({ type: 'PRICE_CHANGE_INCREASED', data: { ntf, otf } })
      } else if (otf > ntf) {
        warnings.push({ type: 'PRICE_CHANGE_DECREASED', data: { ntf, otf } })
      }
    }
    // Schedule Change
    if (sc) {
      warnings.push({ type: 'SCHEDULE_CHANGE' })
    }
    // Flight not available
    if (fnf) {
      warnings.push({ type: 'FLIGHT_NOT_AVAILABLE' })
    }
    return warnings
  }
  return null
}

export function nbAirportsWarnings(flightDetails, searchQuery, nbAirportsList) {
  try {
    if (!nbAirportsList || !nbAirportsList.length) {
      return null
    }
    const airports = []
    mapOnObject(flightDetails, (flight, flightIndex) => {
      const flightSegment = flight[0]
      const lastSegment = flight[flight.length - 1]
      airports.push({
        iata: flightSegment.departAirportIata,
        airport: flightSegment.departAirport.split(', ')[1]
      })
      airports.push({
        iata: lastSegment.arrivalAirportIata,
        airport: lastSegment.arrivalAirport.split(', ')[1]
      })
    })
    const { source, destination, sourceHeader, destinationHeader } = searchQuery
    const [, sourceAirport] = sourceHeader.split('- ')
    const [, destAirport] = destinationHeader.split('- ')
    const searchAirports = [
      {
        iata: source,
        airport: sourceAirport
      },
      {
        iata: destination,
        airport: destAirport
      },
      {
        iata: destination,
        airport: destAirport
      },
      {
        iata: source,
        airport: sourceAirport
      }
    ]
    const messages = []
    const nearBy = nbAirportsList.map(port => port.iata)
    airports.forEach((airport, i) => {
      if (
        nearBy.indexOf(airport.iata) > -1 &&
        airport.iata !== searchAirports[i].iata
      ) {
        let type = 'from'
        let typeLabel = 'departing'
        let type2 = 'from'
        if (i % 2 === 1) {
          type = 'to'
          typeLabel = 'landing'
          type2 = 'at'
        }
        messages.push(`You searched for flights ${type} ${
          searchAirports[i].airport
        }\
        but selected a flight ${typeLabel} ${type2} ${airport.airport}.`)
      }
    })
    return messages.length ? messages : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getFareType = (miniRuleSector, flightDetail) => {
  if (
    !miniRuleSector ||
    miniRuleSector.MR === 'N' ||
    miniRuleSector.Refund === 'N'
  ) {
    let label = FLIGHT_FARE_NON_REFUNDABLE
    if (flightDetail && (!miniRuleSector || miniRuleSector.Refund !== 'N')) {
      let allRefundableSegment = true
      flightDetail.forEach(segment => {
        if (segment.fareType !== 'REFUNDABLE') {
          allRefundableSegment = false
        }
      })
      if (allRefundableSegment) {
        label = FLIGHT_FARE_REFUNDABLE
      }
    }
    return { label, dataAvailable: miniRuleSector && miniRuleSector.ADT }
  } else if (miniRuleSector && miniRuleSector.Refund === 'Y') {
    return { label: FLIGHT_FARE_REFUNDABLE, dataAvailable: miniRuleSector.ADT }
  }
  return {}
}

export const getPricingSummary = pricing => {
  const summary = {
    baseFare: Math.round(
      (pricing.inft || 0) + (pricing.chdt || 0) + (pricing.adtt || 0)
    ),
    totalTaxes: Math.round(pricing.totc + pricing.svcf),
    discount: -pricing.ds || 0,
    total: Math.round(pricing.tpr)
  }
  return summary
}

export const getMerchandisingQuery = (isIntl, isRT) => {
  const type = isIntl ? 'international' : 'domestic'
  switch (type) {
    case 'international':
      if (isRT) {
        return INTL_RT_QUERY
      }
      return INTL_OW_QUERY
    default:
      if (isRT) {
        return DOM_RT_QUERY
      }
      return DOM_OW_QUERY
  }
}

export const getUTMData = data => {
  const utmData = {}
  Object.keys(data).forEach(key => {
    if (key.includes('utm_')) {
      utmData[key] = data[key]
    }
  })
  return utmData
}
