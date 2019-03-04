import axios from 'axios'

const axiosMobileInstance = axios.create({
  timeout: 120000,
  headers: {
    X_CT_SOURCETYPE: 'MOBILE',
    'app-agent': 'PWA'
  }
})

export default axiosMobileInstance
