import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ReadMore extends Component {
  state = {
    showMore: false
  }

  handleShowMore = () => {
    this.setState({
      showMore: true
    })
  }

  render() {
    const className = classNames({
      ReadMore__content: !this.state.showMore
    })
    return (
      <div className="ReadMore" onClick={this.handleShowMore}>
        <div className={className}>{this.props.children}</div>
        <If condition={!this.state.showMore}>
          <p className="fs-13 c-blue ta-l mb-15 mt-5">Read more...</p>
        </If>
      </div>
    )
  }
}

export default ReadMore
