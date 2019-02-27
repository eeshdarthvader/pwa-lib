import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class TabWrapper extends PureComponent {
  render() {
    const classList = classNames('tabs--content', this.props.className)
    return <div className={classList}>{this.props.children}</div>
  }
}

TabWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

TabWrapper.defaultProps = {
  children: null,
  className: ''
}

export default TabWrapper
