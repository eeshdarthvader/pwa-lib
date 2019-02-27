import React, { Component } from 'react'
import PropTypes from 'prop-types'
import elementClass from 'element-class'

import Close from '../Sheet/close.svg'

class LightBox extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      elementClass(document.body).add('Sheet--open')
    } else if (this.props.isOpen && !nextProps.isOpen) {
      elementClass(document.body).remove('Sheet--open')
    }
  }
  componentWillUnmount() {
    elementClass(document.body).remove('Sheet--open')
  }

  render() {
    const { isOpen, onClose, children, title, subtitle } = this.props
    return (
      <If condition={isOpen}>
        <div className="LightBox">
          {
            <div className="LightBox__header">
              <span role="button" className="LightBox__close" onClick={onClose}>
                <Close width="16" height="16" fill="#fff" />
              </span>
              <div className="ta-c c-white">
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>
            </div>
          }
          <div className="LightBox__content">{children}</div>
        </div>
      </If>
    )
  }
}

LightBox.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default LightBox
