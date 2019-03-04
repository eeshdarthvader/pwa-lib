/* eslint-disable */
import { createSelector } from 'reselect'
import { path } from 'Utils'
import { unmapQueryToSrpURL } from 'Utils/hotels'

const getQuery = ({ routing }) => {
  return path(['locationBeforeTransitions', 'query'], routing)
}

export const getSRPQueryParamsSelector = createSelector(
  [getQuery],
  queryFromUrl => {
    return unmapQueryToSrpURL(queryFromUrl)
  }
)

const getTraveller = ({ data, user }) => {
  const traveller = path(['hotels', 'traveller'], data);
  return {
    traveller,
    user
  }
}

export const getTravellerDetailsSelector = createSelector(
  [getTraveller],
  ({traveller, user}) => {
    const emailFromLoginCookie = path(["emailId"], user)
    let contactInfoFromTravellers = path(['contactInfo'], traveller)
    contactInfoFromTravellers = contactInfoFromTravellers || {};
    if (!contactInfoFromTravellers.email) {
      contactInfoFromTravellers.email = emailFromLoginCookie;
    }
    return {
      travellersDetails: path(['travellerDetails'], traveller) || {},
      contactInfo: contactInfoFromTravellers,
      gst: path(['gst'], traveller) || {},
      password: path(['password'], traveller) || '',
      isTravellerDataValid: path(['isTravellerDataValid'], traveller) || false,
      travellerValidationState:
        path(['travellerValidationState'], traveller) || {},
      isContactInfoValid: path(['isContactInfoValid'], traveller) || false,
      contactValidationState: path(['contactValidationState'], traveller) || {},
      isGSTValid: path(['isGSTValid'], traveller) || false,
      gstValidationState: path(['gstValidationState'], traveller) || {},
      isPasswordValid: path(['isPasswordValid'], traveller) || false,
      passwordValidationState:
        path(['passwordValidationState'], traveller) || {},
      isLoading: path(['isLoading'], traveller) || false
    }
  }
)
