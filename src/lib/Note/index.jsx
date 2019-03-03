import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import InfoIcon from './icons/info.svg'

const Note = props => {
  const btnClass = classnames('pl-16, pr-16', props.className)
  const iconClass = classnames('Note__icon', {
    'mr-5': !props.isRTL,
    'ml-5': props.isRTL
  })
  return (
    <div className={btnClass}>
      <div className="Note br1 p-relative pl-10 pr-10 pt-10 pb-10">
        <h2 className="Note__head fs-12 lh-copy c-black-50 fw-600 tt-u p-absolute pl-8 pr-8 d-ib">
          <InfoIcon className={iconClass} fill="#36c" />
          {props.heading}
        </h2>
        <p className="Note__body lh-title fs-13">{props.body}</p>
      </div>
    </div>
  )
}

Note.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  className: PropTypes.string,
  isRTL: PropTypes.bool
}

Note.defaultProps = {
  className: '',
  isRTL: false
}

Note.displayName = 'Note'

export default Note
