import { browserHistory as newBrowserHistory } from 'react-router'
import createMemoryHistory from 'history/createMemoryHistory'
import { appRoutePrefix } from 'Constants'
import { isEmpty } from './'

export const browserHistory = process.env.BROWSER
  ? newBrowserHistory
  : createMemoryHistory()

export const goBack = (state = { pathname: `${appRoutePrefix}/` }) => {
  if (!window) {
    return
  }
  const { history } = window
  if (history.length > 2) {
    browserHistory.goBack()
  } else {
    browserHistory.push(state)
  }
}
