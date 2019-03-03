import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ListItem } from 'Lib/List'

import Subtract from './icons/subtract.svg'
import Add from './icons/add.svg'

class Count extends PureComponent {
  _decrementValue = () => {
    this.props.onDecrement(this.props.id, this.props.minValue)
  }

  _incrementValue = () => {
    this.props.onIncrement(this.props.id)
  }

  render() {
    const { totalValue, maxValue, minValue, value } = this.props
    const disableIncrement = totalValue === maxValue
    const disableDecrement = totalValue === minValue || value === minValue
    const getClassNames = flag => {
      return classNames({
        Counter__disabled: flag
      })
    }
    return (
      <ListItem
        className={classNames(
          'Counter__item h-56 flex flex-middle flex-between',
          this.props.className
        )}
      >
        <div className="Counter__label">
          {this.props.children(this.props.value)}
        </div>
        <div className="Counter__actions">
          <Subtract
            className={getClassNames(disableDecrement)}
            fill="#fff"
            onClick={this._decrementValue}
          />
          <p className="Counter__count">{this.props.value}</p>
          <Add
            className={getClassNames(disableIncrement)}
            fill="#fff"
            onClick={this._incrementValue}
          />
        </div>
      </ListItem>
    )
  }
}

Count.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.func,
  /**
   * @ignore - internal prop
   */
  value: PropTypes.number,
  /**
   * @ignore - internal prop
   */
  totalValue: PropTypes.number,
  /**
   * @ignore - internal prop
   */
  maxValue: PropTypes.number,
  /**
   * @ignore - internal prop
   */
  onIncrement: PropTypes.func, // (id)
  /**
   * @ignore - internal prop
   */
  onDecrement: PropTypes.func, // (id)
  minValue: PropTypes.number
}

Count.defaultProps = {
  id: '',
  className: '',
  value: 0,
  children: () => {},
  totalValue: 0,
  minValue: 0
}

export default Count
