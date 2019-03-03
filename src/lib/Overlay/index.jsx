import React from 'react'
import PropTypes from 'prop-types'

const Overlay = props => {
  return (
    <div className="Overlay" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

Overlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

Overlay.defaultProps = {
  children: null,
  onClick: event => {}
}

Overlay.displayName = 'Overlay'

export default Overlay
