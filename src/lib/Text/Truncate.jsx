import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Truncate = ({ children, className, width }) => {
  const classList = classNames('t-truncate', className)
  const styles = {
    width: typeof width === 'number' ? `${width}px` : `${width}`
  }
  return (
    <p className={classList} style={styles}>
      {children}
    </p>
  )
}

Truncate.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
}

Truncate.defaultProps = {
  width: '100%',
  className: '',
  children: null
}

Truncate.displayName = 'Truncate'

export default Truncate
