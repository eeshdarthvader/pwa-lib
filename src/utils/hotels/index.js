/*eslint-disable */
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import { browserHistory } from 'Utils/history'
import { typeOf } from 'Utils'
import { DAYS, MONTHS } from 'Constants'
import { IMAGE_DOMAIN } from 'Constants/cloudinary'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { path } from '../'
import { startOfToday } from '../dates'

export const TA_RATING = [4.5,4,3.5,3]

export const getPopularDestinations = () => {
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
          city: 'Kolkata',
          country: 'India',
          state: 'West Bengal',
          countryCode: 'IN'
        },
        {
          city: 'Hyderabad',
          country: 'India',
          state: 'Telangana',
          countryCode: 'IN'
        },
        {
          city: 'Chennai',
          country: 'India',
          state: 'Tamil Nadu',
          countryCode: 'IN'
        }
      ]
    default:
      return [
        {
          city: 'Kolkata',
          country: 'India',
          state: 'West Bengal',
          countryCode: 'IN'
        },
        {
          city: 'Hyderabad',
          country: 'India',
          state: 'Telangana',
          countryCode: 'IN'
        },
        {
          city: 'Chennai',
          country: 'India',
          state: 'Tamil Nadu',
          countryCode: 'IN'
        }
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

export const constructImageUrl = (image, id, transformations) => {
  const wideImage = image.replace(/_tn./i, '_w.') // eslint-disable-line

  return `${IMAGE_DOMAIN(transformations)}/places/hotels/${id.substring(
    0,
    4
  )}/${id}/images/${wideImage}`
}

export const constructHotelDetailsImageUrl = (image, transformations) => {
  const wideImage = image.replace(/_tn./i, '_w.') // eslint-disable-line
  return `${IMAGE_DOMAIN(transformations)}/places/hotels${wideImage}`
}

export const constructHotelSearchQueryUrl = searchQuery => {
  const urlParams = {
    city: searchQuery.city,
    state: searchQuery.state,
    country: searchQuery.country,
    area: searchQuery.area,
    poi: searchQuery.poi,
    hotelId: searchQuery.hotelId,
    hotelName: searchQuery.hotelName,
    destCode: searchQuery.destCode,
    chkIn: searchQuery.chkIn,
    chkOut: searchQuery.chkOut,
    numRooms: searchQuery.numRooms,
    travellers: searchQuery.travellers,
    lowRate: searchQuery.lowRate,
    op: searchQuery.op,
    // pahCCRequired: searchQuery.pahCCRequired,
    filters: searchQuery.filters ? searchQuery.filters : {},
    sortBy: searchQuery.sortBy ? searchQuery.sortBy : {},
    roomAllocations: searchQuery.roomAllocations,
    name: searchQuery.name,
    destinationType: searchQuery.destinationType,
    latitude: searchQuery.latitude,
    longitude: searchQuery.longitude
  }
  return urlParams
}

export const constructTravellers = (travellers, childAgeMetaData = []) => {
  const room = {
    adults: {
      count: travellers.adults,
      metadata: []
    },
    children: {
      count: travellers.children,
      metadata: childAgeMetaData
    }
  }
  return room
}

export const formatHeaderDate = date => {
  // Accepts MM-DD-YYYY
  // Return
  const type = typeof date
  let nDate
  if (type === 'number') {
    nDate = new Date(date)
  } else if (type === 'string') {
    nDate = new Date(date)
  } else {
    nDate = date
  }
  return `${DAYS[nDate.getDay()]}, ${nDate.getDate()} ${
    MONTHS[nDate.getMonth()]
  }`
}

export const _isOldDate = dateValue => {
  const currDate = new Date()
  currDate.setHours(0, 0, 0, 0)
  return dateValue < currDate.getTime()
}

export const _getDate = date => {
  const type = typeof date
  let departDate
  if (type === 'number') {
    departDate = new Date(date)
  } else if (type === 'string') {
    departDate = date.split('/')
    departDate = new Date(`${departDate[1]}/${departDate[0]}/${departDate[2]}`)
  } else if (date instanceof Date) {
    departDate = date
  }
  return departDate
}

export const getTravelerParams = roomAllocations => {
  return roomAllocations.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return {
        ...accumulator,
        num_rooms: accumulator.num_rooms + 1,
        adults: accumulator.adults + currentValue.adults.count,
        childs: accumulator.childs + currentValue.children.count,
        [`adults${currentIndex + 1}`]: currentValue.adults.count,
        [`children${currentIndex + 1}`]: currentValue.children.count,
        [`ca${currentIndex + 1}`]: currentValue.children.metadata
          .map(child => child.age)
          .join(',')
      }
    },
    {
      num_rooms: 0,
      adults: 0,
      childs: 0
    }
  )
}

export const getRoomAllocationsForSrp = travellers => {
  const adultKey = 'adults'
  const childrenKey = 'children'
  const childrenAgeKey = 'ca'
  const roomAllocations = []
  const roomCount = Number(travellers.num_rooms)
  const getChildrenMetaData = currentRoomIndex => {
    const count = Number(travellers[`${childrenKey}${currentRoomIndex}`])
    const metaData = []
    let childrenAges = travellers[`${childrenAgeKey}${currentRoomIndex}`]
    childrenAges = childrenAges ? childrenAges.split(',') : []
    for (let mIndex = 0; mIndex < count; mIndex += 1) {
      metaData[mIndex] = {
        age: Number(childrenAges[mIndex])
      }
    }
    return metaData
  }
  for (let i = 0; i < roomCount; i += 1) {
    const roomIndex = i + 1
    const room = {
      adults: {
        count: Number(travellers[`${adultKey}${roomIndex}`]) || 1,
        metadata: []
      },
      children: {
        count: Number(travellers[`${childrenKey}${roomIndex}`]) || 0,
        metadata: getChildrenMetaData(roomIndex)
      }
    }
    roomAllocations.push(room)
  }
  return roomAllocations
}

export const mapQueryToSrpURL = ({
  roomAllocations,
  city,
  state,
  country,
  chkIn,
  chkOut,
  destCode,
  sortBy,
  locationSearchName,
  filters,
  latitude=undefined,
  longitude=undefined,
  area=""
}) => {
  let locationSearch = locationSearchName
  const travellers = getTravelerParams(roomAllocations)
  const sortByQuery = { key: 'featured', order: 'asc', metadata: null }

  const filterURLQuery = {}
  let minTAStarRating=""

  if (filters.payAtHotel) {
    filterURLQuery.payAtHotel = 'pah'
  }
  if (filters.tripAdvisorRating) {
    // if (filters.tripAdvisorRating !== 5) {
    //   filterURLQuery.taStarRating = `${filters.tripAdvisorRating}-${5}`
    // } else {
    //   filterURLQuery.taStarRating = 5
    // }

    
    if(typeOf(filters.tripAdvisorRating)==='array'){
       minTAStarRating = Math.min.apply(null,filters.tripAdvisorRating); 
    } else {
       minTAStarRating = filters.tripAdvisorRating; 
    }
 
    
    filterURLQuery.taStarRating = `${minTAStarRating}-${5}`
  }
  if (filters.starRating) {
    filterURLQuery.starFilter = filters.starRating
  }
  if (filters.priceRange) {
    filterURLQuery.price = `${filters.priceRange.min}-${filters.priceRange.max}`
  }

  if (filters.freeCancellation) {
    filterURLQuery.freeCancellation = 'fc'
  }
  if (filters.hotelWithDeals) {
    filterURLQuery.deals = 'deals'
  }

  if(area && latitude && longitude){
      sortByQuery.key = 'location'
      sortByQuery.order = 'asc'
      sortByQuery.metadata = {
        location:{
          latitude: latitude,
          longitude: longitude
        }
      }
      locationSearch = area
    
  }else{
    if (Object.keys(sortBy).length) {
      sortByQuery.key = sortBy.key
      sortByQuery.order = sortBy.order
      sortByQuery.metadata = sortBy.metadata
    }
  }
  

  return {
    city,
    area,
    state,
    country,
    chk_in: chkIn,
    chk_out: chkOut,
    dest_code: destCode,
    sort: sortByQuery.key,
    sort_order: sortByQuery.order,
    location_search: sortByQuery.metadata ? true : false,
    latitude: sortByQuery.metadata
      ? sortByQuery.metadata.location.latitude
      : null,
    longitude: sortByQuery.metadata
      ? sortByQuery.metadata.location.longitude
      : null,
    destinationName: locationSearch,
    locationSearchName,
    ...filterURLQuery,
    ...travellers
  }
}

export const mapQueryToDetailsURL = ({
  roomAllocations,
  chkIn,
  chkOut,
  city,
  state,
  country,
  destCode,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
  hotelID
}) => {
  const parsedCheckIn = chkIn.replace(/\//g, '')
  const parsedCheckOut = chkOut.replace(/\//g, '')
  const detailsRoomAllocationEncoder = () => {
    const room = []
    const getChildrenMetaData = index => {
      const childData = roomAllocations[index].children
      const { count } = childData
      const metaData = []
      for (let mIndex = 0; mIndex < count; mIndex += 1) {
        metaData[mIndex] = childData.metadata[mIndex].age
      }
      return metaData.length ? `-${metaData.join(',')}` : ''
    }
    for (let i = 0; i < roomAllocations.length; i += 1) {
      const roomData = roomAllocations[i]
      room[i] = `${roomData.adults.count},${roomData.children.count ||
        0}${getChildrenMetaData(i)}`
    }
    return room.join('|')
  }
  let data = {
    c: `${parsedCheckIn}|${parsedCheckOut}`,
    r: detailsRoomAllocationEncoder()
  }

  if (city) {
    data.city = city
  }
  if (state) {
    data.state = state
  }
  if (country) {
    data.country = country
  }
  if (destCode) {
    data.destCode = destCode
  }
  if (utm_source) {
    data.utm_source = utm_source
  }
  if (utm_medium) {
    data.utm_medium = utm_medium
  }
  if (utm_campaign) {
    data.utm_campaign = utm_campaign
  }
  if (utm_term) {
    data.utm_term = utm_term
  }
  if (utm_content) {
    data.utm_content = utm_content
  }
  if (hotelID) {
    data.hotelID = hotelID
  }
  return data
}

export const unmapQueryToSrpURL = query => {
  const {
    chk_in: chkIn,
    chk_out: chkOut,
    dest_code: destCode,
    city,
    state,
    country,
    area,
    price: priceRange,
    deals: hotelWithDeals,
    payAtHotel,
    freeCancellation,
    starFilter: starRating,
    sort_order: sortOrder,
    taStarRating: tripAdvisorRating,
    sort,
    latitude,
    longitude,
    destinationName: locationSearchName,
    ...travellers
  } = query

  const roomAllocations = getRoomAllocationsForSrp(travellers)

  const filters = {}
  const sortBy = { key: 'featured', order: 'asc', metadata: null }

  if (priceRange) {
    filters.priceRange = {
      min: Number(priceRange.split('-')[0]),
      max: Number(priceRange.split('-')[1])
    }
  }
  if (starRating) {
    filters.starRating = Array.isArray(starRating)
      ? starRating.map(Number)
      : [Number(starRating)]
  }
  if (sort && sortOrder) {
    sortBy.key = sort
    sortBy.order = sortOrder
    if (latitude && longitude) {
      sortBy.metadata = {
        location: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        }
      }
    }
  }
  if (hotelWithDeals) {
    filters.hotelWithDeals = true
  }
  if (payAtHotel) {
    filters.payAtHotel = true
  }
  if (freeCancellation) {
    filters.freeCancellation = true
  }
  if (tripAdvisorRating) {
    filters.tripAdvisorRating = Number(tripAdvisorRating.split('-')[0])
    //filters.tripAdvisorRating = tripAdvisorRating.split('-').map(Number)
  }



  const searchQueryToRedux = {
    city,
    state,
    country,
    destCode,
    chkIn,
    chkOut,
    sortBy,
    area,
    roomAllocations,
    locationSearchName,
    filters
  }

  return searchQueryToRedux
}

const detailsRoomAllocationDecoder = travellers => {
  const rooms = travellers ? travellers.split('|') : []

  const roomAllocations = []

  const getChildrenMetaData = (index, childrenAge, childrenCount) => {
    const metadata = []
    if (childrenCount) {
      const ages = childrenAge.split(',')
      for (let i = 0; i < ages.length; i += 1) {
        metadata.push({ age: Number(ages[i]) })
      }
    }

    return metadata
  }

  for (let i = 0; i < rooms.length; i += 1) {
    const [counts, childrenAge = ''] = rooms[i].split('-')

    let [adultsCount = 0, childrenCount = 0] = counts.split(',')

    adultsCount = Number(adultsCount)
    childrenCount = Number(childrenCount)

    roomAllocations.push({
      adults: {
        count: adultsCount,
        metadata: []
      },
      children: {
        count: childrenCount,
        metadata: getChildrenMetaData(i, childrenAge, childrenCount)
      }
    })
  }
  return roomAllocations
}

export const unmapQueryToDetailsURL = ({
  c = '',
  r = '',
  city = '',
  state = '',
  country = '',
  destCode = '',
  utm_source = '',
  utm_medium = '',
  utm_campaign = '',
  utm_term = '',
  utm_content = '',
  hotelID = ''
}) => {
  const roomAllocations = detailsRoomAllocationDecoder(r)

  let [chkIn, chkOut] = c.split('|')

  if (chkIn && (chkIn.length === 6 || chkOut.length === 6)) {
    chkIn = format(parse(chkIn, 'DDMMYY', startOfToday()), 'DD/MM/YYYY')
    chkOut = format(parse(chkOut, 'DDMMYY', startOfToday()), 'DD/MM/YYYY')
  } else {
    chkIn = format(parse(chkIn, 'DDMMYYYY', startOfToday()), 'DD/MM/YYYY')
    chkOut = format(parse(chkOut, 'DDMMYYYY', startOfToday()), 'DD/MM/YYYY')
  }

  const searchQueryForDetailsToRedux = {
    city,
    state,
    country,
    destCode,
    chkIn,
    chkOut,
    roomAllocations,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    hotelID
  }

  return searchQueryForDetailsToRedux
}

export const replaceQueryInUrl = searchQuery => {
  const currentUrl = browserHistory.getCurrentLocation()
  currentUrl.query = searchQuery
  browserHistory.replace(currentUrl)
}

export const resetFiltersInUrl = ({ query }) => {
  const searchQuery = constructHotelSearchQueryUrl(query)
  searchQuery.filters = {}
  const updatedSearchQuery = mapQueryToSrpURL(searchQuery)
  replaceQueryInUrl(updatedSearchQuery)
}

export const updateFiltersInUrl = query => {
  const updatedSearchQuery = mapQueryToSrpURL(query)
  replaceQueryInUrl(updatedSearchQuery)
}

export const setFilterArray = ({
  payAtHotel,
  freeCancellation,
  hotelWithDeals
}) => {
  const hotelPaymentOptions = []

  if (payAtHotel) {
    hotelPaymentOptions.push('pah')
  }
  if (freeCancellation) {
    hotelPaymentOptions.push('cancellation')
  }
  if (hotelWithDeals) {
    hotelPaymentOptions.push('deals')
  }
  return hotelPaymentOptions
}

export const setTAFilterArray = (
  tripAdvisorRating
) => {
  let hoteltripAdvisorRatingOptions = []

  if (tripAdvisorRating) {
    for(let i =0; i < TA_RATING.length;i++){
      if(TA_RATING[i] >= Number(tripAdvisorRating)){
        hoteltripAdvisorRatingOptions.push(TA_RATING[i] )
      }
      
    }
   
  }
 
  return hoteltripAdvisorRatingOptions
}

export const formatMeasurementUnit = distance => {
  let formattedValue = ''
  if (Number(distance) >= 1000) {
    formattedValue = `${(distance / 1000).toFixed(1)} km`
  } else {
    formattedValue = `${distance} m`
  }
  return formattedValue
}

export const readCookie = name => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export const getUTMData = data => {
  const utmData = {}
  Object.keys(data).forEach(key => {
    if (key.startsWith('utm_') && data[key]) {
      utmData[key.substr(4)] = data[key]
    }
  })
  return utmData
}

export const removeDuplicates= (myArr, prop)=> {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.node[prop]).indexOf(obj.node[prop]) === pos;
  });
}


export const getLatLngInfo = (address) => {
   let promise = geocodeByAddress(address)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        return {
          latitude: lat,
          longitude: lng,
          isGeocoding: false
        }
      })
      .catch(error => {
        console.log('error', error) // eslint-disable-line no-console
      })

      return promise
}