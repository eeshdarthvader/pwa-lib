import React from 'react'
import PropTypes from 'prop-types'

import { pathType } from 'Constants/types'
import { goBack } from 'Utils/history'
import Stepper from 'Lib/Stepper'

import Back from './icons/back.svg'
import Logo from './icons/logo.colored.svg'

const PageMarker = ({
  steps,
  activeStep,
  backButton,
  logo,
  backNavigationParams,
  logoLink = '/'
}) => {
  const handleBackNavigation = () => {
    goBack(backNavigationParams)
  }
  const redirectToHome = () => {
    window.location.href = logoLink
  }
  return (
    <section className="PageTitle PageTitle--summary centered">
      <If condition={backButton}>
        <a onClick={handleBackNavigation} className="PageTitle__back">
          <Back />
        </a>
      </If>
      <If condition={logo}>
        <Logo className="PageTitle__logo" onClick={redirectToHome} />
      </If>
      <Stepper steps={steps} activeStep={activeStep} />
    </section>
  )
}

PageMarker.propTypes = {
  steps: PropTypes.number.isRequired,
  activeStep: PropTypes.number,
  backButton: PropTypes.bool,
  logo: PropTypes.bool,
  backNavigationParams: pathType
}

PageMarker.defaultProps = {
  activeStep: 1,
  backButton: true,
  logo: false,
  backNavigationParams: {}
}

PageMarker.displayName = 'PageMarker'

export default PageMarker
