/*eslint-disable*/
import React, {
  PureComponent,
  cloneElement,
  Children,
  isValidElement
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class SortBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sortType: props.sortType
    }
  }

  _getTabs = () => {
    const tabs = []

    Children.forEach(this.props.children, tab => {
      if (isValidElement(tab)) {
        tabs.push(tab)
      }
    })

    return tabs
  }

  _swapSortType = (value, event) => {
    const sortMap = {
      asc: 'desc',
      desc: 'asc'
    }
    this.setState(
      prevState => ({ sortType: sortMap[prevState.sortType] }),
      () => {
        this._callOnChange(value, event)
      }
    )
  }

  _isSelectedTab = tab => {
    return this.props.value === tab.props.value
  }

  _callOnChange = (value, event) => {
    this.props.onChange(value, this.state.sortType, event)
  }

  _handleTabTouchTap = (value, event) => {
    if (this.props.value !== value) {
      if(value === 'tripAdvisorRating'){
        this.setState({ sortType: 'desc' }, () => {
          this._callOnChange(value, event)
        })
      } else {
        this.setState({ sortType: 'asc' }, () => {
          this._callOnChange(value, event)
        })
      }
     
    } else {
      this._swapSortType(value, event)
    }
  }

  render() {
    const { className } = this.props

    const classList = classNames('Sortbar', className)

    const tabs = this._getTabs().map(tab => {
      const isSelectedTab = this._isSelectedTab(tab)
      const isAscending = this.state.sortType === 'asc'

      return cloneElement(tab, {
        key: tab.props.value,
        selected: isSelectedTab,
        onClick: this._handleTabTouchTap,
        isAscending
      })
    })

    return (
      <div className={classList}>
        <div className="Sortbar__nav">{tabs}</div>
      </div>
    )
  }
}

SortBar.propTypes = {
  /**
   * Should be used to pass `SortTab` components.
   */
  children: PropTypes.node,
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Selects the tab whose value prop matches this prop.
   */
  sortType: PropTypes.string
}

SortBar.defaultProps = {
  children: null,
  className: '',
  onChange: () => {},
  value: '',
  sortType: ''
}

export default SortBar
