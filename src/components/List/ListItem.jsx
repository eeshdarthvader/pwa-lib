import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Ripple from 'Lib/Animate/Ripple/'
import Arrow from './rightarr.svg'

class ListItem extends PureComponent {
  render() {
    return (
      <Ripple enableRipple={this.props.enableRipple}>
        {(rippleProps, RippleContent) => {
          return (
            <li
              style={this.props.style}
              role="menuitem"
              className={classNames(`Datalist__item ${this.props.className}`, {
                'has-error': this.props.hasError
              })}
              onClick={this.props.onClick}
              {...rippleProps}
            >
              {this.props.children}
              <If condition={this.props.arrow}>
                <Arrow className="Datalist__arrow" />
              </If>
              {RippleContent}
            </li>
          )
        }}
      </Ripple>
    )
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  arrow: PropTypes.bool,
  onClick: PropTypes.func,
  enableRipple: PropTypes.bool,
  hasError: PropTypes.bool,
  style: PropTypes.object
}

ListItem.defaultProps = {
  children: null,
  className: '',
  arrow: false,
  onClick: event => {},
  enableRipple: false,
  hasError: false,
  style: {}
}

export default ListItem
