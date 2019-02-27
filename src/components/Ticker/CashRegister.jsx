import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Countup from 'react-countup'
import classNames from 'classnames'
import { formatCurrency } from 'Utils/index'

class CashRegister extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: this.props.end })
  }

  render() {
    const {
      start,
      end,
      duration,
      useEasing,
      useGrouping,
      separator,
      className
    } = this.props
    const classList = classNames(className, 'fs-30 fw-400 c-white')
    return (
      <Countup
        className={classList}
        start={this.state.value || start}
        end={end}
        duration={duration}
        useGrouping={useGrouping}
        separator={separator}
        useEasing={useEasing}
        formattingFn={this.props.formatCurrency}
      />
    )
  }
}

CashRegister.propTypes = {
  className: PropTypes.string,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  useEasing: PropTypes.bool,
  separator: PropTypes.string,
  useGrouping: PropTypes.bool,
  formatCurrency: PropTypes.func
}

CashRegister.defaultProps = {
  formatCurrency,
  className: '',
  duration: 2,
  useEasing: true,
  separator: ',',
  useGrouping: true
}

export default CashRegister
