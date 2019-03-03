import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Facebook from './icons/facebook.svg'

class SocialButton extends PureComponent {
  _onClick = event => {
    this.props.onClick(event)
  }

  render() {
    const btnClass = classnames('SocialButton', this.props.className, {
      'SocialButton--facebook': this.props.type === 'facebook',
      'is-disabled': this.props.disabled === true
    })

    return (
      <button className={btnClass} onClick={this._onClick}>
        {this.props.type === 'facebook' && (
          <Facebook className="SocialButton__icon" />
        )}
        {this.props.children}
      </button>
    )
  }
}

SocialButton.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['facebook']).isRequired,
  onClick: PropTypes.func
}

SocialButton.defaultProps = {
  disabled: false,
  children: 'Button',
  type: 'facebook',
  className: '',
  onClick: () => {}
}

export default SocialButton
