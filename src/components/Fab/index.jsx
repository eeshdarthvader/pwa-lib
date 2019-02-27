import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Ripple from 'Lib/Animate/Ripple/'

import Filter from './icons/filter.svg'
import FabActiveIcon from './icons/fab-active.svg'

class Fab extends PureComponent {
  render() {
    const classes = this.props.positionFlag ? 'Fab Fab-default' : 'Fab'
    const btnClass = classnames(classes, this.props.className)

    return (
      <Ripple enableRipple={this.props.enableRipple}>
        {(rippleProps, RippleContent) => {
          return (
            <button
              className={btnClass}
              onClick={this.props.onClick}
              {...rippleProps}
            >
              <Choose>
                <When condition={this.props.filter}>
                  <div>
                    <Filter className="Fab__icon" />
                    <FabActiveIcon
                      width="20"
                      height="20"
                      fill="#339900"
                      className="Fab__icon--active"
                    />
                  </div>
                </When>
                <Otherwise>
                  <Filter className="Fab__icon" />
                </Otherwise>
              </Choose>
              {this.props.children}
              {RippleContent}
            </button>
          )
        }}
      </Ripple>
    )
  }
}

Fab.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  filter: PropTypes.bool,
  onClick: PropTypes.func,
  enableRipple: PropTypes.bool,
  positionFlag: PropTypes.bool
}

Fab.defaultProps = {
  children: 'Button',
  filter: false,
  className: '',
  onClick: () => {},
  enableRipple: true,
  positionFlag: false
}

export default Fab
