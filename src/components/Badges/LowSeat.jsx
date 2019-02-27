import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const LowSeat = ({
  lowSeatLabel,
  className,
  label,
  labelPlural,
  labelCount
}) => {
  const lowSeatLabelText = parseInt(lowSeatLabel, 10) > 1 ? label : labelPlural
  return (
    <p className={classnames('LowSeat', className)}>
      {labelCount} {lowSeatLabelText}
    </p>
  )
}

LowSeat.propTypes = {
  className: PropTypes.string,
  lowSeatLabel: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelPlural: PropTypes.string,
  labelCount: PropTypes.string
}

LowSeat.defaultProps = {
  className: '',
  label: 'seat left at',
  labelPlural: 'seats left at',
  labelCount: '1'
}

LowSeat.displayName = 'LowSeat'

export default LowSeat
