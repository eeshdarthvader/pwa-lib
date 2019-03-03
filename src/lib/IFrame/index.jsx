import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pageloader from 'Lib/Pageloader'
import Sheet from 'Lib/Sheet'

class IFrame extends Component {
  state = {
    isLoading: true
  }
  componentDidMount() {
    if (this.iframe) {
      this.iframe.onload = () => {
        this.setState({ isLoading: false })
      }
    }
  }
  style = { width: '100%', height: '100%' }

  _handleRef = frame => {
    this.iframe = frame
  }

  render() {
    return (
      <div style={this.style}>
        <If condition={this.state.isLoading}>
          <Pageloader title="Hang On" message={this.props.message} />
        </If>
        <Sheet
          isOpen={this.props.isOpen}
          title={this.props.sheetTitle}
          onClose={this.props.onClose}
        >
          <iframe
            style={this.style}
            title={this.props.title}
            src={this.props.URL}
            ref={this._handleRef}
          >
            {this.props.children}
          </iframe>
        </Sheet>
      </div>
    )
  }
}

IFrame.propTypes = {
  URL: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  sheetTitle: PropTypes.string,
  onClose: PropTypes.func
}

IFrame.defaultProps = {
  URL: '',
  title: '',
  message: '',
  children: null,
  isOpen: false,
  sheetTitle: '',
  onClose: () => {}
}

export default IFrame
