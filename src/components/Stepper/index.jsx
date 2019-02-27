import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const _renderSteps = (steps, activeStep) => {
  return Array(steps)
    .fill()
    .map((x, index) => {
      const step = index + 1
      const stepperClass = classnames('Stepper__item', {
        'Stepper__item--active': step <= activeStep
      })

      return (
        <li className={stepperClass} key={index}>
          <Choose>
            <When condition={step < activeStep}>
              <span className="Stepper__count">✓</span>
            </When>
            <Otherwise>
              <span className="Stepper__count">{step}</span>
            </Otherwise>
          </Choose>
        </li>
      )
    })
}

const Stepper = ({ steps, activeStep }) => {
  return <ul className="Stepper">{_renderSteps(steps, activeStep)}</ul>
}

Stepper.propTypes = {
  steps: PropTypes.number.isRequired,
  activeStep: PropTypes.number
}

Stepper.defaultProps = {
  activeStep: 1
}

Stepper.displayName = 'Stepper'

export default Stepper
