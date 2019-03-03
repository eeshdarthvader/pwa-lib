/* eslint jsx-a11y/href-no-hash: 0 */
// ^ Turn this off after hooking up data

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import SafeIcon from './icons/secure.svg'

class Footer extends PureComponent {
  render() {
    const currentYear = new Date().getFullYear()
    return (
      <footer className="footer mt-20 mb-15">
        <section className="footer__account centered mb-10">
          <p className="fs-14 c-black-70 fw-600 t-antialiased mr-15">
            <span> {this.props.loginId} </span>
          </p>
        </section>
        <nav className="footer__menu centered mb-10">
          <ul className="list list--inline">
            <If condition={this.props.loginEnabled}>
              <li>
                <Choose>
                  <When condition={this.props.loginId}>
                    <a target="_self" onClick={this.props.signOutUser}>
                      <p className="fs-13 c-blue mr-15">
                        {this.props.textSignOut}
                      </p>
                    </a>
                  </When>
                  <Otherwise>
                    <a onClick={this.props.handleSignIn}>
                      <p className="fs-13 c-blue mr-15">
                        {this.props.textSignIn}
                      </p>
                    </a>
                  </Otherwise>
                </Choose>
              </li>
            </If>
            <li>
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                <p className="fs-13 c-blue mr-15">
                  {this.props.textTermsOfUse}
                </p>
              </a>
            </li>
            <li>
              <a href="/privacy/" target="_blank" rel="noopener noreferrer">
                <p className="fs-13 c-blue">{this.props.textPrivacyPolicy}</p>
              </a>
            </li>
          </ul>
        </nav>
        <section className="footer__marker centered mb-5">
          <SafeIcon fill="#36c" width="16" />
          <p className="fs-13 c-black-70">
            {this.props.textSecuredTransaction}
          </p>
        </section>
        <div className="footer__copyright centered">
          <p className="fs-11 c-black-40">
            © 2006–{currentYear} {this.props.textCompanyName}
          </p>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  loginId: PropTypes.node,
  signOutUser: PropTypes.func,
  handleSignIn: PropTypes.func,
  loginEnabled: PropTypes.bool,
  textCompanyName: PropTypes.string,
  textSecuredTransaction: PropTypes.string,
  textPrivacyPolicy: PropTypes.string,
  textTermsOfUse: PropTypes.string,
  textSignIn: PropTypes.string,
  textSignOut: PropTypes.string
}

Footer.defaultProps = {
  loginId: null,
  signOutUser: () => {},
  handleSignIn: () => {},
  loginEnabled: true,
  textCompanyName: 'Cleartrip Private Limited',
  textSecuredTransaction: 'Completely safe and secure transaction',
  textPrivacyPolicy: 'Privacy Policy',
  textTermsOfUse: 'Terms of use',
  textSignIn: 'Sign In',
  textSignOut: 'Sign Out'
}

export default Footer
