/*eslint-disable*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'Utils/history'
import Modal from 'Lib/Modal'
import Overlay from 'Lib/Overlay'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
  }

  hideErrorModal = () => {
    this.setState({ hasError: false })
    browserHistory.replace('/')
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <Overlay>
          <Modal
            type="error"
            title="Oops"
            message="Something went wrong. Please try again after sometime."
            primaryButton="Okay"
            onPrimaryAction={this.hideErrorModal}
          />
        </Overlay>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
