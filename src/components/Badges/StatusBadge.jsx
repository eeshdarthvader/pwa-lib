import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const StatusBadge = ({ label, className }) => {
  return <p className={classnames('statusBadge', className)}>{label}</p>
}

StatusBadge.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired
}

StatusBadge.defaultProps = {
  className: ''
}

StatusBadge.displayName = 'StatusBadge'

export default StatusBadge
