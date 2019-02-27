import React from 'react'
import PropTypes from 'prop-types'
import Button from 'Lib/Buttons'

import Warning from './icons/warning.svg'

const Status = props => {
  return (
    <div className="flex flex-wrap flex-center flex-middle mt-50 pl-16 pr-16">
      <div className="w-100p ta-c mb-15">
        <Warning width="34" height="34" fill="#FFBA00" />
      </div>
      <div className="ta-c pb-20">
        <h2 className="fs-17 fw-500 mb-15 c-black-90">{props.body}</h2>
        <Button type="tertiary" size="medium" onClick={props.onClick}>
          {props.action}
        </Button>
      </div>
    </div>
  )
}

Status.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string,
  action: PropTypes.string,
  onClick: PropTypes.func
}

Status.defaultProps = {
  body: 'Error',
  action: '',
  onClick: () => {}
}

Status.displayName = 'Status'

export default Status
