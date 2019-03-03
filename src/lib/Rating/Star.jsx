import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import Star from './icons/star.svg'

class StarRating extends PureComponent {
  render() {
    const { rating, total, size, activeColor, emptyColor } = this.props
    const starSize = `${size}`
    return (
      <Fragment>
        {Array(rating)
          .fill()
          .map((value, index) => (
            <Star
              fill={activeColor}
              width={starSize}
              height={starSize}
              key={`active-${index}`}
            /> // eslint-disable-line react/no-array-index-key
          ))}
        {Array(total - rating)
          .fill()
          .map((value, index) => (
            <Star
              fill={emptyColor}
              width={starSize}
              height={starSize}
              key={`empty-${index}`}
            /> // eslint-disable-line react/no-array-index-key
          ))}
      </Fragment>
    )
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  total: PropTypes.number,
  size: PropTypes.number,
  activeColor: PropTypes.string,
  emptyColor: PropTypes.string
}

StarRating.defaultProps = {
  total: 5,
  size: 15,
  activeColor: '#fec22d',
  emptyColor: '#e2e2e2'
}

export default StarRating
