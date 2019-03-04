/*eslint-disable*/
import ClevertapReact from 'clevertap-react'

const { CLEVERTAP_KEY } = process.env.keys

class Analytics {
  constructor() {
    this.enabled = false
    if (CLEVERTAP_KEY) {
      this.enabled = true
      ClevertapReact.initialize(CLEVERTAP_KEY)
    }
  }
  event = (name, payload = {}) => {
    if (this.enabled) {
      payload.platform = 'm-web-pwa'
      ClevertapReact.event(name, payload)
    }
  }
  profile = payload => {
    if (this.enabled) {
      ClevertapReact.profile(payload)
    }
  }
  logout = () => {
    if (this.enabled) {
      ClevertapReact.logout()
    }
  }
}

const AnalyticsObject = new Analytics()
export default AnalyticsObject
