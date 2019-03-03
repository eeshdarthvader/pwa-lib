import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Slide } from 'Lib/Animate'
import classNames from 'classnames'

import Close from './icons/close.svg'
import Warn from './icons/warning.svg'

class Toast extends PureComponent {
  _onClick = event => {
    this.props.onCancel(event)
  }

  render() {
    const types = {
      warning: <Warn className="Toast__icon" />,
      normal: null
    }
    return (
      <Slide
        in={this.props.isVisible}
        timeout={{ enter: 250, exit: 250 }}
        mountOnEnter={true}
        unmountOnExit={true}
        appear={true}
      >
        <div className={classNames('Toast', this.props.containerClass)}>
          {types[this.props.messageType]}
          <div className="Toast__body">
            <p className={classNames(this.props.messageClass)}>
              {this.props.message}
            </p>
          </div>
          {/* eslint-disable jsx-a11y/href-no-hash */}
          <If condition={this.props.showCloseButton}>
            <a href="#" className="Toast__closeLink" onClick={this._onClick}>
              <Close className="Toast__close" />
            </a>
          </If>
        </div>
      </Slide>
    )
  }
}

Toast.propTypes = {
  messageType: PropTypes.string,
  isVisible: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  message: PropTypes.string,
  onCancel: PropTypes.func,
  messageClass: PropTypes.string,
  containerClass: PropTypes.string
}

Toast.defaultProps = {
  messageType: 'warning',
  message: '',
  isVisible: false,
  showCloseButton: true,
  onCancel: () => {},
  messageClass: '',
  containerClass: ''
}

export default Toast
