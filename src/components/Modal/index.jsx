import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import Info from './icons/info.svg'
import Warning from './icons/warning.svg'

class Modal extends PureComponent {
  _handlePrimaryAction = () => {
    this.props.onPrimaryAction()
  }

  _handleSecondaryAction = () => {
    this.props.onSecondaryAction()
  }

  render() {
    const { type, primaryButton, secondaryButton } = this.props
    return (
      <div className="Modal">
        <div className="Modal__content">
          <Choose>
            <When condition={type === 'info'}>
              <Info width="26px" height="26px" fill="#36c" className="mb-15" />
            </When>
            <When condition={type === 'warning'}>
              <Warning
                width="26px"
                height="26px"
                fill="#36c"
                className="mb-15"
              />
            </When>
          </Choose>
          <h1 className="Modal__heading">{this.props.title}</h1>
          <p className="Modal__copy">{this.props.message}</p>
        </div>

        <div className="Modal__actions">
          <If condition={primaryButton}>
            <a
              className="Modal__action Modal__action--primary"
              onClick={this._handlePrimaryAction}
            >
              {primaryButton}
            </a>
          </If>
          <If condition={secondaryButton}>
            <a className="Modal__action" onClick={this._handleSecondaryAction}>
              {secondaryButton}
            </a>
          </If>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  onPrimaryAction: PropTypes.func,
  onSecondaryAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['info', 'warning', 'error']),
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string
}

Modal.defaultProps = {
  type: 'info',
  onPrimaryAction: () => {},
  onSecondaryAction: () => {},
  title: '',
  message: '',
  primaryButton: '',
  secondaryButton: ''
}

export default Modal
