import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Sticky extends PureComponent {
  render() {
    const classNames = `Sticky Sticky--${this.props.position}`
    return (
      <div>
        <div className="Sticky__fake">{this.props.children}</div>
        <div className={classNames}>{this.props.children}</div>
      </div>
    )
  }
}

Sticky.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
  children: PropTypes.node
}

Sticky.defaultProps = {
  position: 'top',
  children: null
}

export default Sticky
