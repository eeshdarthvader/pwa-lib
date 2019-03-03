import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CTLogo from './ct_logo.colored.svg'
import Close from './close.svg'

class Header extends PureComponent {
  _redirectToHome = () => {
    window.location.href = this.props.menuLink
  }
  render() {
    const { props } = this
    return (
      <div className="Header clearfix">
        <If condition={props.menu}>
          <div className="Header__menu">
            <Choose>
              <When condition={props.menu === 'active'}>
                <span className="Header__menuClose">
                  <Close className="Header__closeIcon" />
                </span>
              </When>
              <Otherwise>
                <span
                  className="Header__menuText"
                  onClick={this._redirectToHome}
                >
                  {props.menuTitle}
                </span>
              </Otherwise>
            </Choose>
          </div>
        </If>
        <div onClick={this._redirectToHome}>
          <CTLogo className="Header__logo" />
        </div>
      </div>
    )
  }
}

Header.displayName = 'Header'

Header.propTypes = {
  menu: PropTypes.bool,
  menuTitle: PropTypes.string,
  menuLink: PropTypes.string
}

Header.defaultProps = {
  menu: false,
  menuTitle: 'Menu',
  menuLink: '/'
}

export default Header
