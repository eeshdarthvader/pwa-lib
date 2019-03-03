import React from 'react'
import PropTypes from 'prop-types'

const Label = props => {
  return (
    <label htmlFor={props.for} className={props.className}>
      {props.label}
    </label>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  for: PropTypes.string
}

Label.defaultProps = {
  className: '',
  label: '',
  for: ''
}

Label.displayName = 'Label'

export default Label
