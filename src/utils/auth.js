import moment from 'moment'

import axios from 'Utils/axios'
import { path } from 'Utils'
import { SIGN_IN } from 'Constants/api/user'
import Analytics from 'Utils/Analytics'
import { getABTestData } from 'Utils/loginCookie'

export default async function loginUser(inputData) {
  const { id, pwd } = inputData
  const payload = `card_details=true&responseType=json&password=${pwd}&travellers=true&
  consolidated_list=false&recently_booked_travellers=true&username=${id}`
  const responseData = await axios.post(SIGN_IN, payload, {
    headers: {
      Accept: 'text/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const userData = path(['data', 'user'], responseData) || {}
  const { username } = userData
  if (username) {
    sendProfileInfoToAnalytics(userData)
  }
  return userData
}

export function logoutUser() {
  Analytics.logout()
}

export function sendProfileInfoToAnalytics(userData) {
  setTimeout(() => {
    // non blocking
    try {
      const {
        username,
        id,
        photo_file_path: photo,
        contact_data: { phone_numbers: phoneNumbers },
        personal_data: {
          first_name: firstName,
          last_name: lastName,
          title,
          date_of_birth: DOB
        }
      } = userData
      const [mobilePhoneData] = phoneNumbers
      const {
        country_code: countryCode,
        mobile_number: mobile
      } = mobilePhoneData
      let genderValue
      if (['Mr', 'Mstr'].indexOf(title) > -1) {
        genderValue = 'M'
      } else if (['Mrs', 'Miss'].indexOf(title) > -1) {
        genderValue = 'F'
      }
      // send undefined when values are not present.
      Analytics.profile({
        Email: username,
        Identity: id,
        Photo: photo ? `https://www.cleartrip.com${photo}` : undefined,
        Gender: genderValue,
        Name: `${title} ${firstName} ${lastName}`,
        DOB: DOB ? new Date(DOB) : undefined,
        Phone: mobile ? `+${countryCode}${mobile}` : undefined,
        Age: DOB ? moment().diff(DOB, 'years') : undefined,
        ...getABTestData('ab_')
      })
    } catch (e) {
      console.error(e)
    }
  })
}
