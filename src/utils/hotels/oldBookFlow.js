import axios from 'axios'
import { path, toQueryString } from 'Utils'
import { HOTEL_ITINERARY } from 'Constants/api/hotels'

export default async function initiateBooking(inputData) {
  const {
    currency,
    hotelId,
    roomtypecode,
    bookingCode,
    countryCode,
    state,
    city,
    starRating,
    chkInDate,
    chkOutDate,
    travellers,
    searchInstanceID
  } = inputData
  console.log(inputData)

  const payloadData = {
    mobile_src: 'MOBILE',
    bookingCode: `${bookingCode}|si-${searchInstanceID}`,
    roomtypecode,
    scr: currency,
    sct: countryCode,
    pahCCRequired: true,
    rateChannelType: 'B2C',
    isCheapestRate: true,
    state,
    city,
    dest_code: city,
    country_code: countryCode,
    country: countryCode,
    NonResident2: false,
    hotelid: hotelId,
    ct_hotelid: hotelId,
    num_children: travellers.childs,
    num_adults: travellers.adults,
    chk_in: chkInDate,
    chk_out: chkOutDate,
    topLevelRateRules: {},
    ...travellers
  }
  const payload = toQueryString(payloadData)

  const responseData = await axios.post(HOTEL_ITINERARY, payload, {
    headers: {
      Accept: 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  window.location.href = responseData.request.responseURL
}
