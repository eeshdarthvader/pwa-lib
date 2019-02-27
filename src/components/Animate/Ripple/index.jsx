import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TouchRipple from './RippleGroup'
import createRippleHandler from './createRippleHandler'

class Ripple extends Component {
  constructor(props) {
    super(props)
    const rippleProps = {
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchMove: this.handleTouchMove,
      onTouchStart: this.handleTouchStart
    }
    this.rippleProps = props.enableRipple ? rippleProps : {}
  }

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start')

  handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop')

  handleTouchStart = createRippleHandler(this, 'TouchStart', 'start')

  handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop')

  handleTouchMove = createRippleHandler(this, 'TouchEnd', 'stop')

  handleBlur = createRippleHandler(this, 'Blur', 'stop')

  render() {
    const RippleContent = (
      <If condition={this.props.enableRipple}>
        <TouchRipple
          ref={node => {
            this.ripple = node
          }}
        />
      </If>
    )
    return this.props.children(this.rippleProps, RippleContent)
  }
}

Ripple.propTypes = {
  children: PropTypes.func,
  enableRipple: PropTypes.bool
}

Ripple.defaultProps = {
  enableRipple: false,
  children: () => {}
}

export default Ripple
