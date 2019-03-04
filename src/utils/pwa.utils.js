module.exports = {
  getManifestFile: buildNumber => {
    //genertated from flights repo
    return `<link rel="manifest" href="/pwa-manifest.json?_v=${buildNumber ||
      process.env.BITBUCKET_BUILD_NUMBER ||
      Math.random()}">`
  },
  serviceWorkerInstall: () => {
    return `if ('serviceWorker' in window.navigator) {
      window.addEventListener('load', function() {
        window.navigator.serviceWorker
          .register('/pwa-service-worker.js', {
            scope: '/',
            updateViaCache: 'none'
          })
          .then(function(registration) {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
            navigator.serviceWorker.addEventListener('message', function(event) {
              var url = event.data.url
              var pageId = event.data.pageId
              if (localStorage.ctPwaPageCacheHash) {
                var ctPwaPageCacheHash = JSON.parse(
                  localStorage.ctPwaPageCacheHash
                )
                if (ctPwaPageCacheHash[pageId]) {
                  var reloadFlag = false
                  if (ctPwaPageCacheHash[pageId] !== event.data.cacheHash) {
                    reloadFlag = true
                  }
                  ctPwaPageCacheHash[pageId] = event.data.cacheHash
                  localStorage.ctPwaPageCacheHash = JSON.stringify(
                    ctPwaPageCacheHash
                  )
                  if (reloadFlag && window.location.pathname === event.data.url) {
                    window.location.reload()
                  }
                } else {
                  ctPwaPageCacheHash[pageId] = event.data.cacheHash
                  localStorage.ctPwaPageCacheHash = JSON.stringify(
                    ctPwaPageCacheHash
                  )
                }
              } else {
                var ctPwaPageCacheHash = {}
                ctPwaPageCacheHash[pageId] = event.data.cacheHash
                localStorage.ctPwaPageCacheHash = JSON.stringify(
                  ctPwaPageCacheHash
                )
              }
            })
          })
          .catch(function(error) {
            console.error('ServiceWorker registration failed: ', error)
          })
        window.addEventListener('beforeinstallprompt', e => {
          if (window.clevertap) {
            clevertap.event.push('pwa lite', {
              language: 'en',
              domain: window.location.host,
              city: window.currentCity,
              installation: "prompted",
              page_name: 'flights',
              platform: 'm-web-pwa',
              'user location': window.currentCity
            })
          }
          var branchBanner = document.getElementById('branch-banner-iframe')
          if (branchBanner) {
            branchBanner.style.display = 'none'
          }
        })
        window.addEventListener('appinstalled', (evt) => {
          if (window.clevertap) {
            clevertap.event.push('pwa lite', {
              language: 'en',
              domain: window.location.host,
              city: window.currentCity,
              installation: "installed",
              page_name: 'flights',
              platform: 'm-web-pwa',
              'user location': window.currentCity
            })
          }
        });
        if (window.matchMedia('(display-mode: standalone)').matches) {
          window.sessionStorage.isLiteApp = "1"
        }
      })
    }`
  }
}
