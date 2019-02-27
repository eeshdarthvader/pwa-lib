import React from 'react'
import PropTypes from 'prop-types'
import { pathType } from 'Constants/types'
import { goBack } from 'Utils/history'

import Back from './icons/back.svg'

const PageTitle = ({ title, backButton, backNavigationParams }) => {
  const handleBackNavigation = () => {
    goBack(backNavigationParams)
  }

  return (
    <section className="PageTitle centered">
      <If condition={backButton}>
        <a onClick={handleBackNavigation} className="PageTitle__back">
          <Back />
        </a>
      </If>
      <h2 className="PageTitle__heading c-black-80">{title}</h2>
    </section>
  )
}

PageTitle.displayName = 'PageTitle'

PageTitle.propTypes = {
  title: PropTypes.node.isRequired,
  backButton: PropTypes.bool,
  backNavigationParams: pathType
}

PageTitle.defaultProps = {
  backButton: true,
  backNavigationParams: {}
}

export default PageTitle
