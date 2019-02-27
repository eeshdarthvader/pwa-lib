import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import SetInnerHTML from 'Lib/SetInnerHTML'
import DealIcon from './icons/deal.svg'

const Deal = props => {
  return (
    <div
      className={classnames('Deal pl-16 pr-16', props.className)}
      onClick={props.onClick}
    >
      <div className="Deal__logo">
        <DealIcon className="Deal__icon" />
      </div>
      <SetInnerHTML className="Deal__copy" innerHTML={props.message} />
    </div>
  )
}

Deal.displayName = 'Deal'

Deal.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClick: PropTypes.func
}

Deal.defaultProps = {
  className: '',
  message: '',
  onClick: () => {}
}

export default Deal
