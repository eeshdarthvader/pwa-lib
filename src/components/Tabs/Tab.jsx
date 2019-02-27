import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import Ripple from 'Lib/Animate/Ripple/'

class Tab extends Component {
  _handleTouchTap = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.value, event, this)
    }
  }

  render() {
    const classList = classNames('Tabs__item', this.props.className, {
      'is-active': this.props.selected
    })
    return (
      <Ripple enableRipple={this.props.enableRipple}>
        {(rippleProps, RippleContent) => {
          return (
            <div
              className={classList}
              label={this.props.label}
              value={this.props.value}
              selected={this.props.selected}
              onClick={this._handleTouchTap}
              {...rippleProps}
            >
              <p>
                {this.props.label}
                {RippleContent}
              </p>
            </div>
          )
        }}
      </Ripple>
    )
  }
}

Tab.propTypes = {
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Sets the text value of the tab item to the string specified.
   */
  label: PropTypes.node,
  /**
   * Fired when the active tab changes by touch or tap.
   * Use this event to specify any functionality when an active tab changes.
   * This function will always recieve the active tab as it\'s first argument.
   * This will be triggered from the parent component.
   */
  onActive: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  /**
   * @ignore
   * This property is overriden by the Tabs component.
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   * Defines if the current tab is selected or not.
   * The Tabs component is responsible for setting this property.
   */
  selected: PropTypes.bool,
  /**
   * If value prop passed to Tabs component, this value prop is also required.
   * It assigns a value to the tab so that it can be selected by the Tabs.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enableRipple: PropTypes.bool
}

Tab.defaultProps = {
  className: '',
  label: '',
  onActive: activeTab => {},
  onClick: event => {},
  selected: false,
  value: '',
  enableRipple: true
}

export default Tab
