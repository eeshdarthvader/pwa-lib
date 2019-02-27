import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { List } from 'Lib/List'
import { isEmpty } from 'Utils'

class Counter extends PureComponent {
  _decrementValue = (id, minValue) => {
    const { value } = this.props
    let currentValue = value[id]
    if (currentValue > minValue) {
      currentValue -= 1
      this._handleChange(id, currentValue)
    }
  }

  _incrementValue = id => {
    const { value } = this.props
    let currentValue = value[id]
    const { maxValue, totalValue } = this.props
    if (totalValue < maxValue) {
      currentValue += 1
      this._handleChange(id, currentValue)
    }
  }

  _handleChange = (id, currentValue) => {
    const { value } = this.props
    const data = { ...value }
    data[`${id}`] = currentValue
    this.props.onChange(data)
  }

  _renderItems() {
    const { value, maxValue, totalValue } = this.props
    return Children.map(this.props.children, item => {
      if (isEmpty(item)) {
        return item
      }
      return React.cloneElement(item, {
        maxValue,
        totalValue,
        value: value[item.props.id],
        onIncrement: this._incrementValue,
        onDecrement: this._decrementValue
      })
    })
  }

  render() {
    return (
      <List className={classnames('Counter', this.props.className)}>
        {this._renderItems()}
      </List>
    )
  }
}

Counter.propTypes = {
  children: PropTypes.node,
  maxValue: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.objectOf(PropTypes.number).isRequired,
  totalValue: PropTypes.number
}

Counter.defaultProps = {
  children: null,
  maxValue: 6,
  className: '',
  totalValue: 0
}

export default Counter
