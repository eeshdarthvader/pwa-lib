import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import Ripple from 'Lib/Animate/Ripple/'

const valueBlock = (value, valueClassList, showEmptyValue) => {
  if (!value && showEmptyValue) {
    return <p className="fs-70 lh-none h-48">...</p>
  }
  return <p className={valueClassList}>{value}</p>
}

class InputBlock extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.value !== nextProps.value ||
      this.props.hasError !== nextProps.hasError ||
      this.props.label !== nextProps.label
    )
  }

  render() {
    const labelClassList = className(
      'TouchAndGo__label',
      this.props.labelClass,
      {
        'c-red': this.props.hasError,
        'c-black-40': !this.props.hasError
      }
    )
    const fieldClassList = className('TouchAndGo__field', this.props.fieldClass)
    const valueClassList = className('TouchAndGo__value', this.props.valueClass)
    return (
      <Ripple enableRipple={this.props.enableRipple}>
        {(rippleProps, RippleContent) => {
          return (
            <div
              role="button"
              className={fieldClassList}
              onClick={this.props.onClick}
              {...rippleProps}
            >
              <p className={labelClassList}>{this.props.label}</p>
              {valueBlock(
                this.props.value,
                valueClassList,
                this.props.showEmptyValue
              )}
              {RippleContent}
            </div>
          )
        }}
      </Ripple>
    )
  }
}

InputBlock.propTypes = {
  hasError: PropTypes.bool,
  fieldClass: PropTypes.string,
  labelClass: PropTypes.string,
  valueClass: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  showEmptyValue: PropTypes.bool,
  enableRipple: PropTypes.bool
}

InputBlock.defaultProps = {
  hasError: false,
  fieldClass: '',
  labelClass: '',
  valueClass: '',
  label: '',
  value: '',
  onClick: event => {},
  showEmptyValue: false,
  enableRipple: true
}

export default InputBlock
