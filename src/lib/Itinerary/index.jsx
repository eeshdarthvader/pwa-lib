import React from 'react'
import PropTypes from 'prop-types'

import Clock from './clock.svg'

const Itinerary = props => {
  return (
    <div className="flex flex-center flex-top pt-15 pb-15">
      <div className="ta-r flex-1">
        <p className="fs-20 mb-5">
          {props.originCode} <span className="fw-700">{props.originTime}</span>
        </p>
        <p className="fs-15 c-black-60 mb-5">{props.originDate}</p>
        <p className="fs-11 c-black-60 mb-5 lh-title">{props.origin}</p>
      </div>
      <div className="ta-c ml-15 mr-15">
        <div>
          <Clock fill="#929292" />
        </div>
        <span className="fs-11 c-black-40">{props.duration}</span>
      </div>
      <div className="ta-l flex-1">
        <p className="fs-20 mb-5">
          <span className="fw-700">{props.destinationTime}</span>{' '}
          {props.destinationCode}
        </p>
        <p className="fs-15 c-black-60 mb-5">{props.destinationDate}</p>
        <p className="fs-11 c-black-60 mb-5 lh-title">{props.destination}</p>
      </div>
    </div>
  )
}

Itinerary.propTypes = {
  origin: PropTypes.string.isRequired,
  originCode: PropTypes.string.isRequired,
  originDate: PropTypes.string.isRequired,
  originTime: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  destinationCode: PropTypes.string.isRequired,
  destinationDate: PropTypes.string.isRequired,
  destinationTime: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
}

Itinerary.displayName = 'Itinerary'

export default Itinerary
