import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class AvailabiltyBadge extends PureComponent {
  classMap = {
    Available: 'success',
    Waitlist: 'danger',
    'R.A.C': 'primary'
  }
  render() {
    const { type } = this.props
    let { count } = this.props
    count = count || '-'
    const badgeClass = classNames('availabiltyBadge', this.classMap[type])

    return (
      <div className={badgeClass}>
        <span className="availabiltyBadge__label">{type}</span>
        <span className="availabiltyBadge__count">{count}</span>
      </div>
    )
  }
}

AvailabiltyBadge.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['N/A', 'Available', 'Waitlist', 'R.A.C', 'Closed', ''])
    .isRequired
}

AvailabiltyBadge.defaultProps = {
  count: '-'
}

export default AvailabiltyBadge
