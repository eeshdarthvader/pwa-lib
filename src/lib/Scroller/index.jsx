import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { calculateHeight } from 'Utils/html'

class Scroller extends Component {
  state = {
    height: '100vh'
  }
  componentDidMount() {
    const { delay } = this.props
    const { onMount } = this
    if (delay) {
      setTimeout(() => {
        onMount()
      }, delay)
    } else {
      onMount()
    }
    window.addEventListener('resize', onMount)
  }

  componentWillUnmount = () => {
    const { onMount } = this
    window.removeEventListener('resize', onMount)
  }

  onMount = () => {
    const height = calculateHeight(this.scrollableRef)
    if (height) {
      this.setState({ height: `${height}px` })
    }
  }

  refHandlers = {
    scrollable: node => {
      this.scrollableRef = node
    }
  }

  render() {
    const classList = classNames('Scrollable', this.props.className)
    const { height } = this.state
    const style = { height }
    return (
      <div
        style={style}
        className={classList}
        ref={this.refHandlers.scrollable}
      >
        {this.props.children}
      </div>
    )
  }
}

Scroller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  delay: PropTypes.number
}

Scroller.defaultProps = {
  className: '',
  delay: 0
}

export default Scroller
