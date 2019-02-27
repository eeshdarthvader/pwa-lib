import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Truncate } from 'Lib/Text'
import { pathType } from 'Constants/types'
import { goBack } from 'Utils/history'

import Back from './icons/back.svg'
import Logo from './icons/logo.colored.svg'

const redirectToHome = event => {
  window.location.href = '/'
}

const Summary = ({
  title,
  subtitle,
  backButton,
  logo,
  dark,
  backNavigationParams
}) => {
  const handleBackNavigation = () => {
    goBack(backNavigationParams)
  }

  return (
    <section className="SummaryHeader">
      <If condition={backButton}>
        <div className="SummaryHeader__menu">
          <a onClick={handleBackNavigation} className="SummaryHeader__back">
            <Back fill="#3366cc" />
          </a>
        </div>
      </If>
      <div className="SummaryHeader__content">
        <div>
          <Truncate className="fw-600 fs-14 d-ib lh-title c-black-80">
            {title}
          </Truncate>
          <Truncate className="fs-12 mt-3 c-black-40">{subtitle}</Truncate>
        </div>
      </div>
    </section>
  )
}

Summary.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  backButton: PropTypes.bool,
  logo: PropTypes.bool,
  dark: PropTypes.bool,
  backNavigationParams: pathType
}

Summary.defaultProps = {
  backButton: true,
  logo: false,
  dark: false,
  backNavigationParams: {}
}

Summary.displayName = 'Summary'

export default Summary
