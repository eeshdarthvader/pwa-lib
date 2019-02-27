import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

/**
 * @ignore - internal component.
 */
class Ripple extends Component {
  state = {
    rippleVisible: false,
    rippleLeaving: false
  }

  handleEnter = () => {
    this.setState({
      rippleVisible: true
    })
  }

  handleExit = () => {
    this.setState({
      rippleLeaving: true
    })
  }

  render() {
    const {
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      ...other
    } = this.props
    const { rippleVisible, rippleLeaving } = this.state

    const className = classNames(
      'Ripple__wrapper',
      {
        'Ripple__wrapper--leaving': rippleLeaving,
        'Ripple__wrapper--pulsating': pulsate
      },
      classNameProp
    )

    const rippleClassName = classNames('Ripple__item', {
      'Ripple__item--visible': rippleVisible,
      'Ripple__item--fast': pulsate
    })

    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX
    }

    return (
      <Transition
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        {...other}
      >
        <span className={className}>
          <span className={rippleClassName} style={rippleStyles} />
        </span>
      </Transition>
    )
  }
}

Ripple.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string, // eslint-disable-line
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number, // eslint-disable-line
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number, // eslint-disable-line
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number // eslint-disable-line
}

Ripple.defaultProps = {
  pulsate: false
}

export default Ripple
