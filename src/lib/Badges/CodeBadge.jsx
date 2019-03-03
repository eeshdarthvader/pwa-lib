import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const CodeBadge = ({ label, className, size, type }) => {
  const badgeClass = classnames(
    'codeBadge',
    className,
    `codeBadge--${size}`,
    `codeBadge--${type}`
  )

  return <p className={badgeClass}>{label}</p>
}

CodeBadge.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['tiny', 'small', 'regular']).isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'info', 'danger'])
}

CodeBadge.defaultProps = {
  type: 'info',
  className: ''
}

CodeBadge.displayName = 'CodeBadge'

export default CodeBadge
