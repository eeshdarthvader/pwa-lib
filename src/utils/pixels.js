/* eslint-disable */
import { writeCookie, readCookie } from 'Utils/loginCookie'
import { fromQueryString, path } from 'Utils'

const { OM, BH, AE, SA, QA, KW, DEFAULT_GA_ACCOUNT_ID } = process.env.keys

//  Branch.io snippet
export const initiateBranchIOPixel = () => {
  ;((b, r, a, n, c, h, _, s, d, k) => {
    if (!b[n] || !b[n]._q) {
      for (; s < _.length; ) c(h, _[s++])
    }
  })(
    window,
    document,
    'script',
    'branch',
    (b, r) => {
      b[r] = () => {
        b._q.push([r, arguments])
      }
    },
    {
      _q: [],
      _v: 1
    },
    'addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent'.split(
      ' '
    ),
    0
  ) // eslint-disable-line
}

//  GTM snippet
export const includeGATagManager = () => {
  ;((w, d, s, l) => {
    w[l] = w[l] || []
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })
  })(window, document, 'script', 'dataLayer')
  window.dataLayer.unshift({
    'Travel-Type': 'Value',
    'From-Location': 'Value',
    'To-Location': 'Value',
    'Travel-Dates': 'Value',
    Cost: 'Value',
    'Hotel-ID': 'Value',
    'Hotel-Rating': 'Value',
    'Rooms-No': 'Value',
    'People-No': 'Value',
    'Hotel-Name': 'Value',
    'Vehicle-ID': 'Value',
    'Date-Search': 'Value',
    'Day-Search': 'Value',
    Trip_ID: 'Value',
    Reserved1: 'Value',
    Reserved2: 'Value',
    Currency: 'Value',
    'AirLine-Code': 'Value',
    'Tripadvisor-Rating': 'Value',
    'Flight-Return-OneWay': 'Value',
    Product: 'Value',
    Device: 'Mobile',
    'Payment-Mode': 'Value'
  })
}

/*
  * Capture the values if it comes
  * from paid channels. utm_* is present only
  * on paid channels.
*/
export const paidChannelTracker = function() {
  const utmCookie = {}

  if (document.referrer != '') {
    var __utmz = (readCookie('__utmz') || '').split('|')
    for (var i = 0; i < __utmz.length; i++) {
      var kv = __utmz[i].split('=')
      if (__utmz[i].indexOf('utmcsr') != -1) {
        utmCookie['utmcsr'] = kv[1]
      } else {
        utmCookie[kv[0]] = kv[1]
      }
    } // end of for loop.

    var utmSource = utmCookie['utmcsr'],
      utmCampaign = utmCookie['utmccn'],
      utmMedium = utmCookie['utmcmd'],
      utmContent = utmCookie['utmcct'],
      _cookies = [
        'source_firstpaidsource',
        'medium_firstpaidsource',
        'campaign_firstpaidsource',
        'content_firstpaidsource',
        'lastchannel'
      ]

    // extract source_firstpaid cookie.
    var sourceFirstPaid = readCookie('source_firstsource')

    // if doesn't exist, either its first time
    // or 30day window has elapsed.
    if (!sourceFirstPaid) {
      // first_source
      if (utmSource) writeCookie('source_firstsource', utmSource, 30)
      if (utmCampaign) writeCookie('campaign_firstsource', utmCampaign, 30)
      if (utmMedium) writeCookie('medium_firstsource', utmMedium, 30)
      if (utmContent) writeCookie('content_firstsource', utmContent, 30)

      for (var i = 0; i < _cookies.length; i++) writeCookie(_cookies[i], '')
    }

    // regular cookie setting.
    // firstpaid_source
    if (utmSource) writeCookie('source_firstpaidsource', utmSource)
    if (utmMedium) writeCookie('medium_firstpaidsource', utmMedium)
    if (utmCampaign) writeCookie('campaign_firstpaidsource', utmCampaign)
    if (utmContent) writeCookie('content_firstpaidsource', utmContent)

    writeCookie('noncleartrip', 'true')
  } else {
    writeCookie('noncleartrip', 'false')
  }
}

export const confirmationPageTracking = function(
  tripId,
  price,
  travellersCount
) {
  try {
    window._gaq = window._gaq || []
    window._gaq.push([
      '_addTrans',
      tripId, // Transaction ID. Required
      '',
      price, // Total. Required
      '', // Tax
      '', // Shipping
      '', // City
      '', // State or Province
      '' // Country
    ])
    window._gaq.push([
      '_addItem',
      tripId, // Transaction ID. Required
      'Flights', // Product name
      '', //category
      price, // Unit price. Required
      travellersCount // Quantity. Required
    ])
    window._gaq.push(['_trackTrans'])
  } catch (e) {
    console.log(e)
  }
}

export const setGAAccountID = () => {
  let hostUrl = path(['location', 'hostname'], window) || '0.0.0.0'
  hostUrl = hostUrl.split('.')
  window._gaq = window._gaq || []
  try {
    //  In case of White Label
    if (window.wlGaAccountId && window.wlGaAccountDomain) {
      window._gaq.push(['_setAccount', wlGaAccountId])
      window._gaq.push(['_setDomainName', wlGaAccountDomain])
    } else {
      if (hostUrl[1] === 'cleartrip') {
        if (hostUrl[0] === 'www' && hostUrl[2] === 'com') {
          window._gaq.push(['_setAccount', DEFAULT_GA_ACCOUNT_ID])
          window._gaq.push(['_setDomainName', '.cleartrip.com'])
        } else if (hostUrl[0] === 'om' && hostUrl[2] === 'com') {
          window._gaq.push(['_setAccount', OM.GA_ACCOUNT_ID])
        } else if (hostUrl[0] === 'qa' && hostUrl[2] === 'com') {
          window._gaq.push(['_setAccount', QA.GA_ACCOUNT_ID])
        } else if (hostUrl[0] === 'bh' && hostUrl[2] === 'com') {
          window._gaq.push(['_setAccount', BH.GA_ACCOUNT_ID])
        } else if (hostUrl[0] === 'kw' && hostUrl[2] === 'com') {
          window._gaq.push(['_setAccount', KW.GA_ACCOUNT_ID])
        } else if (hostUrl[0] === 'www' && hostUrl[2] === 'sa') {
          window._gaq.push(['_setAccount', SA.GA_ACCOUNT_ID])
        } else if (hostUrl[0] === 'www' && hostUrl[2] === 'ae') {
          window._gaq.push(['_setAccount', AE.GA_ACCOUNT_ID])
        }
      }
    }
  } catch (e) {}
  window._gaq.push(['_setAllowLinker', true])
  window._gaq.push(['_trackPageview'])
}

const paidAffiliateTracker = urlHash => {
  const affiliateutmExpiryDays = window.affiliateutmExpiryDays
    ? parseInt(window.affiliateutmExpiryDays)
    : 30
  const params = urlHash ? urlHash : {},
    utmSource = params['utm_source'],
    utmCampaign = params['utm_campaign'],
    utmMedium = params['utm_medium'],
    utmTerm = params['utm_term'],
    utmUid = params['uid']
  //extract expiryDate of cookie
  const affiliateutmExpiryDate = readCookie('affiliate_expdate')

  const storeAffiliateInformation = () => {
    if (utmSource)
      writeCookie(
        'source_affiliatefirstsource',
        utmSource,
        affiliateutmExpiryDays
      )
    if (utmCampaign)
      writeCookie(
        'campaign_affiliatefirstsource',
        utmCampaign,
        affiliateutmExpiryDays
      )
    if (utmMedium)
      writeCookie(
        'medium_affiliatefirstsource',
        utmMedium,
        affiliateutmExpiryDays
      )
    if (utmTerm)
      writeCookie('term_affiliatefirstsource', utmTerm, affiliateutmExpiryDays)
    if (utmUid)
      writeCookie('uid_affiliatefirstsource', utmUid, affiliateutmExpiryDays)
  }
  if (!affiliateutmExpiryDate) {
    storeAffiliateInformation()
    writeCookie(
      'affiliate_expdate',
      new Date().toDateString(),
      affiliateutmExpiryDays
    )
  } else {
    if (window.lastStepAttribution) {
      storeAffiliateInformation()
    } else {
    }
  }
}

export const affiliateTracker = isConfirmation => {
  if (isConfirmation) {
    const gtmcookies = [
      'source_affiliatefirstsource',
      'campaign_affiliatefirstsource',
      'medium_affiliatefirstsource',
      'term_affiliatefirstsource',
      'uid_affiliatefirstsource'
    ]
    for (let i = 0; i < gtmcookies.length; i++) {
      const val = readCookie('affiliate_expdate')
        ? readCookie(gtmcookies[i])
        : 'Organic'
      window.dataLayer[0][gtmcookies[i]] = val
    }
  } else {
    const urlHash = fromQueryString(window.location.search)
    paidAffiliateTracker(urlHash)
  }
}

export const getCountry = hostname => {
  if (RegExp('(.).ae$/').test(hostname)) {
    return 'ae'
  } else if (
    RegExp('/^om((.)*).cleartrip.com$/').test(hostname) ||
    RegExp('/^betaom((.)*).cleartrip.com$/').test(hostname)
  ) {
    return 'om'
  } else if (
    RegExp('/^me((.)*).cleartrip.com$/').test(hostname) ||
    RegExp('/^betame((.)*).cleartrip.com$/').test(hostname)
  ) {
    return 'me'
  } else if (
    RegExp('/^kw((.)*).cleartrip.com$/').test(hostname) ||
    RegExp('/^betakw((.)*).cleartrip.com$/').test(hostname)
  ) {
    return 'kw'
  } else if (
    RegExp('qa2.cleartrip.com').test(hostname) ||
    RegExp('/^qa((.)*).cleartrip.com$/').test(hostname) ||
    RegExp('/^betaqa((.)*).cleartrip.com$/').test(hostname)
  ) {
    return 'in'
  } else if (
    RegExp('/^bh((.)*).cleartrip.com$/').test(hostname) ||
    RegExp('/^betabh((.)*).cleartrip.com$/').test(hostname)
  ) {
    return 'bh'
  } else if (
    RegExp('/^sa((.)*).cleartrip.com$/').test(hostname) ||
    RegExp('/(.).sa$/').test(hostname) ||
    RegExp('phonesalessa.cleartripforbusiness.com').test(hostname)
  ) {
    return 'sa'
  }
  return 'in'
}
