import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Ripple from 'Lib/Animate/Ripple/'

class Button extends PureComponent {
  _handleClick = event => {
    event.preventDefault()
    this.props.onClick(event)
  }
  render() {
    const btnClass = classnames(
      'Button',
      this.props.className,
      `Button--${this.props.size}`,
      `Button--${this.props.type}`,
      {
        'is-disabled': this.props.disabled === true
      }
    )

    return (
      <Ripple enableRipple={!this.props.disabled && this.props.enableRipple}>
        {(rippleProps, RippleContent) => {
          return (
            <button
              className={btnClass}
              onClick={this._handleClick}
              {...rippleProps}
            >
              {this.props.children}
              {RippleContent}
            </button>
          )
        }}
      </Ripple>
    )
  }
}

Button.propTypes = {
  /**
   * Whether the button is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Label for the Button.
   */
  children: PropTypes.node,
  /**
   * Specifies size of the Button.
   */
  size: PropTypes.oneOf(['small', 'full', 'medium', 'large', 'inline']),
  /**
   * Specifies type of the Button.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  /**
   * Specifies classnames for the Button.
   */
  className: PropTypes.string,
  /**
   * Event handler for on click event of the Button.
   */
  onClick: PropTypes.func,
  /**
   * Specifies whether to enable the ripple effect for Button.
   */
  enableRipple: PropTypes.bool
}

Button.defaultProps = {
  disabled: false,
  children: 'Button',
  size: 'full',
  type: 'primary',
  className: '',
  onClick: () => {},
  enableRipple: true
}

export default Button
