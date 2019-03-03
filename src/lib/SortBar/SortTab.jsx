import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Ripple from 'Lib/Animate/Ripple/'
import Arrow from './icons/arrow.svg'

class SortTab extends Component {
  _handleTouchTap = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.value, event, this)
    }
  }

  render() {
    const classList = classNames('Sortbar__item', this.props.className, {
      'is-active': this.props.selected,
      'is-asc': this.props.isAscending,
      'is-desc': !this.props.isAscending
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
                {this.props.label}{' '}
                {!this.props.disableDirection && (
                  <Arrow
                    fill={this.props.selected ? '#36c' : '#f3f9ff'}
                    className="Sortbar__arrow"
                  />
                )}
                {RippleContent}
              </p>
            </div>
          )
        }}
      </Ripple>
    )
  }
}

SortTab.propTypes = {
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Sets the text value of the tab item to the string specified.
   */
  label: PropTypes.node,
  /**
   * @ignore
   * This property is overriden by the SortBar component.
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   * Defines if the current tab is selected or not.
   * The SortBar component is responsible for setting this property.
   */
  selected: PropTypes.bool,
  /**
   * If value prop passed to SortBar component, this value prop is also required.
   * It assigns a value to the tab so that it can be selected by the SortBar.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAscending: PropTypes.bool,
  enableRipple: PropTypes.bool,
  disableDirection: PropTypes.bool
}

SortTab.defaultProps = {
  className: '',
  label: '',
  onClick: event => {},
  selected: false,
  value: '',
  isAscending: false,
  enableRipple: true,
  disableDirection: false
}

export default SortTab
