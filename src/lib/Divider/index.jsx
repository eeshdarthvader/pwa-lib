import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Or from './or.svg'

const Divider = props => {
  return (
    <div className={classnames('divider', props.className)}>
      <div className="divider__line" />
      <div className="divider__svg-cont">
        <Or class="divider__svg" />
      </div>
    </div>
  )
}

Divider.propTypes = {
  className: PropTypes.string
}

Divider.defaultProps = {
  className: ''
}

Divider.displayName = 'Divider'

export default Divider
