import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Shake = ({ className, children, animate }) => {
  const classes = classnames('animate', className, {
    shake: animate
  })

  return <div className={classes}>{children}</div>
}

Shake.propTypes = {
  animate: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
}

Shake.defaultProps = {
  animate: false,
  children: null,
  className: ''
}

Shake.displayName = 'Animate(Shake)'

export default Shake
