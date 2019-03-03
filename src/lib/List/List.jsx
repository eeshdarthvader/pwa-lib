/* eslint-disable */
import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class List extends Component {
  _renderItems() {
    return Children.map(this.props.children, item => {
      if (item === null || item === undefined) return item
      return React.cloneElement(item)
    })
  }

  render() {
    return (
      <ul
        className={classnames('Datalist', this.props.className)}
        onClick={this.props.onClick}
      >
        {this._renderItems()}
      </ul>
    )
  }
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
}

List.defaultProps = {
  children: null,
  className: '',
  onClick: () => {}
}

export default List
