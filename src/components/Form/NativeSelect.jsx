import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { safeInvoke } from 'Utils'
import Label from './Label'

class NativeSelect extends PureComponent {
  _handleChange = event => {
    const { onChange, name } = this.props
    const valueFromEvent = event.target.value

    // propagate to store and therefore to the input
    if (onChange) {
      onChange(valueFromEvent, name, event)
    }
  }

  refHandlers = {
    select: ref => {
      this.selectRef = ref
      safeInvoke(this.props.elementRef, ref)
    }
  }

  _createSelectElem = () => {
    const {
      wrapper,
      wrapperClassName,
      labelClassName, // eslint-disable-line no-unused-vars
      value,
      selectClassName,
      disabled,
      name,
      label,
      elementRef, // eslint-disable-line no-unused-vars
      hasError,
      ...others
    } = this.props
    const labelElementProps = {
      className: classNames(labelClassName, {
        'c-red': hasError,
        'c-black-90': !hasError
      }),
      key: 'label',
      label
    }
    const selectElementProps = {
      ...others,
      className: classNames('input--select', selectClassName),
      onChange: this._handleChange,
      ref: this.refHandlers.select,
      name,
      disabled,
      value
    }

    return [
      <Label key="select-label" {...labelElementProps} />,
      <select key="select-element" {...selectElementProps} />
    ]
  }

  render() {
    const { wrapper: Wrapper, wrapperClassName } = this.props
    const selectElem = this._createSelectElem()
    if (React.isValidElement(Wrapper)) {
      return React.cloneElement(
        Wrapper,
        {
          className: classNames(wrapperClassName, {
            'has-error': this.props.hasError
          })
        },
        selectElem
      )
    }
    return (
      <Wrapper
        className={classNames(wrapperClassName, {
          'has-error': this.props.hasError
        })}
      >
        {selectElem}
      </Wrapper>
    )
  }
}

NativeSelect.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  elementRef: PropTypes.func,
  hasError: PropTypes.bool,
  wrapper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  wrapperClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  autoComplete: PropTypes.string
}

NativeSelect.defaultProps = {
  children: null,
  onChange: value => {},
  className: '',
  value: '',
  elementRef: null,
  hasError: false,
  wrapper: <div />,
  wrapperClassName: '',
  labelClassName: '',
  selectClassName: '',
  disabled: false,
  label: '',
  autoComplete: ''
}

export default NativeSelect
