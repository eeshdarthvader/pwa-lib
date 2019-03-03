import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ResultsHeader = ({ children, className, size, color }) => {
  const classList = classNames(
    className,
    size === 'large' ? 'fs-13' : 'fs-12',
    color === 'dark' ? 'c-black-80' : 'c-black-50',
    'fw-400',
    'pl-16',
    'ta-c'
  )
  return <p className={classList}>{children}</p>
}

ResultsHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
  color: PropTypes.oneOf(['dark', 'light'])
}

ResultsHeader.defaultProps = {
  children: null,
  className: '',
  size: 'small',
  color: 'light'
}

ResultsHeader.displayName = 'ResultsHeader'

export default ResultsHeader
