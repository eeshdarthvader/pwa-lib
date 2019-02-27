import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { isEmpty } from 'Utils'
import Label from './Label'

class Input extends Component {
  constructor(props) {
    super(props)
    const uniqueId = `${this.props.name}-${Math.floor(Math.random() * 0xffff)}`
    this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '')
    this.numberRegex = /^\d+$/
    this.state = {
      value: props.value
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(this.focus, this.props.focusDelay)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.value !== this.props.value ||
      this.props.hasError !== nextProps.hasError
    )
  }

  _handleChange = event => {
    const { onChange, name } = this.props
    const valueFromEvent = event.target.value

    // propagate to store and therefore to the input
    if (onChange) {
      this.setState({ value: valueFromEvent }, () => { onChange(valueFromEvent, name, event) })
    }
  }

  _handleKeyPress = event => {
    const { onKeyPress, type } = this.props

    if (type === 'number' && !this.numberRegex.test(event.key)) {
      event.preventDefault()
    }
    if (onKeyPress) {
      onKeyPress(event)
    }
  }

  _handleOnFocus = () => {
    const { onFocus, name } = this.props

    if (onFocus) {
      onFocus(this.inputNode, name)
    }
  }

  blur = () => {
    this.inputNode.blur()
  }

  focus = () => {
    // Temporary fix: to be modified later
    if (this.inputNode) {
      this.inputNode.focus()
    }
  }

  _renderAction = () => {
    if (this.props.actionLabel === null) return null
    return (
      <p
        onClick={this.props.onActionClick}
        className={classNames(this.props.actionClassName)}
      >
        {this.props.actionLabel}
      </p>
    )
  }

  _createInput = () => {
    const {
      wrapper,
      wrapperClassName,
      labelClassName, // eslint-disable-line no-unused-vars
      type,
      inputClassName,
      disabled,
      name,
      label, // eslint-disable-line no-unused-vars
      autoFocus,
      focusDelay,
      hasError, // eslint-disable-line no-unused-vars
      id,
      autoComplete,
      placeholder,
      actionLabel,
      actionClassName,
      onActionClick,
      ...others
    } = this.props

    const { value } = this.state;
    const valuePresent = !isEmpty(value)

    const inputId = id || this.uniqueId
    const labelElementProps = {
      className: classNames(labelClassName, {
        'c-red': hasError,
        'c-black-90': !hasError
      }),
      key: 'label',
      label,
      for: inputId
    }
    const inputElementProps = {
      ...others,
      className: classNames('input--text', inputClassName, {
        'has-value': valuePresent
      }),
      onChange: this._handleChange,
      ref: node => {
        this.inputNode = node
      },
      name,
      disabled,
      type,
      value,
      id: inputId,
      key: inputId,
      onKeyPress: this._handleKeyPress,
      onFocus: this._handleOnFocus,
      autoComplete,
      placeholder
    }

    return [
      <Label {...labelElementProps} />,
      <input {...inputElementProps} />,
      this._renderAction()
    ]
  }

  render() {
    const { wrapper: Wrapper, wrapperClassName } = this.props
    const inputElem = this._createInput()
    if (React.isValidElement(Wrapper)) {
      return React.cloneElement(
        Wrapper,
        {
          className: classNames(wrapperClassName, {
            'has-error': this.props.hasError
          })
        },
        inputElem
      )
    }
    return (
      <Wrapper
        className={classNames(wrapperClassName, {
          'has-error': this.props.hasError
        })}
      >
        {inputElem}
      </Wrapper>
    )
  }
}

Input.propTypes = {
  /**
   * Whether the input value is invalid.
   */
  hasError: PropTypes.bool,
  /**
   * Whether to enable autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * Delay(in ms) to trigger focus on the input.
   */
  focusDelay: PropTypes.number,
  /**
   * Class attribute of the input.
   */
  inputClassName: PropTypes.string,
  /**
   * Whether the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * ID attribute of the input.
   */
  id: PropTypes.string,
  /**
   * Label value of the input.
   */
  label: PropTypes.string,
  /**
   * Class attribute of the label.
   */
  labelClassName: PropTypes.string,
  /**
   * Name attribute of the input.
   */
  name: PropTypes.string.isRequired,
  /**
   * Event handler for on blur event of the input.
   */
  onBlur: PropTypes.func,
  /**
   * Event handler for on change event of the input.
   */
  onChange: PropTypes.func,
  /**
   * Event handler for on focus event of the input.
   */
  onFocus: PropTypes.func,
  /**
   * Event handler for on key press event of the input.
   */
  onKeyPress: PropTypes.func,
  /**
   * Whether the input is mandatory.
   */
  required: PropTypes.bool,
  /**
   * Specifies the type of the input.
   */
  type: PropTypes.string,
  /**
   * Specifies the label of action.
   */
  actionLabel: PropTypes.string,
  /**
   * Class attribute of the label.
   */
  actionClassName: PropTypes.string,
  /**
   * Specifies the label of action.
   */
  onActionClick: PropTypes.func,
  /**
   * Whether to enable browser autocomplete for the input.
   */
  autoComplete: PropTypes.string,
  value: PropTypes.oneOfType([
    // eslint-disable-line react/require-default-props
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  wrapper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  wrapperClassName: PropTypes.string,
  placeholder: PropTypes.string
}

Input.defaultProps = {
  hasError: false,
  autoFocus: false,
  focusDelay: 0,
  inputClassName: '',
  disabled: false,
  id: null,
  label: '',
  labelClassName: '',
  onBlur: null,
  onChange: null,
  onFocus: null,
  onKeyPress: null,
  required: false,
  type: 'text',
  autoComplete: 'on',
  wrapper: <div />,
  wrapperClassName: '',
  actionLabel: null,
  actionClassName: '',
  onActionClick: null
}

export default Input
