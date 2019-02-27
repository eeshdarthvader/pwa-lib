import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Timeline extends Component {
  _renderItems() {
    return Children.map(this.props.children, item => {
      if (item === null || item === undefined) return item
      return React.cloneElement(item)
    })
  }

  render() {
    return (
      <div className={classnames('Timeline', this.props.className)}>
        {this._renderItems()}
      </div>
    )
  }
}

Timeline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Timeline.defaultProps = {
  children: null,
  className: ''
}

export default Timeline
