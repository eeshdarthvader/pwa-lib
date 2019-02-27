import React, { Component } from 'react'
import { string, oneOfType, node } from 'prop-types'

class SetInnerHTML extends Component {
  render() {
    const { component: Component, innerHTML } = this.props
    if (React.isValidElement(Component)) {
      return React.cloneElement(Component, {
        className: this.props.className,
        dangerouslySetInnerHTML: { __html: innerHTML }
      })
    }
    return (
      <Component
        className={this.props.className}
        dangerouslySetInnerHTML={{ __html: innerHTML }}
      />
    )
  }
}

SetInnerHTML.propTypes = {
  innerHTML: string,
  component: oneOfType([string, node]),
  className: string
}

SetInnerHTML.defaultProps = {
  component: 'div'
}

export default SetInnerHTML
