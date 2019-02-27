import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { List } from 'Lib/List'
import { removeFromArray } from 'Utils'

class RadioList extends PureComponent {
  _isSelectedRadio = selectedValue => {
    const { multi, value } = this.props
    if (multi) {
      return value.includes(selectedValue)
    }
    return value === selectedValue
  }

  _handleTouchTap = (selectedValue, event) => {
    const isSelectedRadio = this._isSelectedRadio(selectedValue)
    const { multi, value } = this.props
    if (multi) {
      if (isSelectedRadio) {
        const newValue = removeFromArray(value, selectedValue)
        this.props.onChange(newValue, event)
      } else {
        const newValue = value.concat([selectedValue])
        this.props.onChange(newValue, event)
      }
    }
    if (!multi && !isSelectedRadio) {
      this.props.onChange(selectedValue, event)
    }
  }

  render() {
    const { children, className } = this.props

    const classList = classNames('radioList', className)

    const radioList = []

    Children.map(children, radioItem => {
      const isSelectedRadio = this._isSelectedRadio(radioItem.props.value)
      const child = React.cloneElement(radioItem, {
        key: radioItem.props.value,
        selected: isSelectedRadio,
        onClick: this._handleTouchTap
      })
      radioList.push(child)
      return null
    })

    return <List className={classList}>{radioList}</List>
  }
}

RadioList.propTypes = {
  /**
   * Should be used to pass `Radio` components.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Called when the selected value change.
   */
  onChange: PropTypes.func,
  /**
   * Selects the tab whose value prop matches this prop.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  /**
   * Indicates whether the Radio List is multi select.
   */
  multi: PropTypes.bool
}

RadioList.defaultProps = {
  children: null,
  className: '',
  onChange: () => {},
  value: '',
  multi: false
}

export default RadioList
