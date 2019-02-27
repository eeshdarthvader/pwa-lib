import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'Lib/List'
import className from 'classnames'

import Checked from './icons/checked.svg'
import Unchecked from './icons/unchecked.svg'

class RadioItem extends Component {
  _handleCheck = event => {
    this.props.onClick(this.props.value, event)
  }

  _renderCheckBox = () => {
    const checkBoxClassName = className('', {
      'mr-10': !this.props.isRTL,
      'ml-10': this.props.isRTL
    })
    if (this.props.selected) {
      return <Checked className={checkBoxClassName} fill="#36c" />
    }
    return <Unchecked className={checkBoxClassName} fill="#bbb" />
  }

  render() {
    const CheckBox = this._renderCheckBox()
    const classList = className(this.props.className, {
      'is-active': this.props.selected
    })
    return (
      <ListItem
        className={classList}
        onClick={this._handleCheck}
        enableRipple={this.props.enableRipple}
      >
        <div>{CheckBox}</div>
        {this.props.children(this.props.selected)}
      </ListItem>
    )
  }
}

RadioItem.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  enableRipple: PropTypes.bool,
  isRTL: PropTypes.bool
}

RadioItem.defaultProps = {
  className: '',
  value: '',
  selected: false,
  onClick: (value, event) => {},
  children: null,
  enableRipple: true,
  isRTL: false
}

export default RadioItem
