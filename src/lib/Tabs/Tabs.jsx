import React, {
  PureComponent,
  createElement,
  cloneElement,
  Children,
  isValidElement
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { safeInvoke } from 'Utils'
import TabWrapper from './TabWrapper'

class Tabs extends PureComponent {
  getTabs = () => {
    const tabs = []

    Children.forEach(this.props.children, tab => {
      if (isValidElement(tab)) {
        tabs.push(tab)
      }
    })

    return tabs
  }

  getTabCount = () => {
    return this.getTabs().length
  }

  _isSelectedTab = tab => {
    return this.props.value === tab.props.value
  }

  _handleTabTouchTap = (value, event, tab) => {
    if (this.props.alwaysTriggerOnChange || this.props.value !== value) {
      this.props.onChange(value, event, tab)
    }
    safeInvoke(tab.props.onActive, tab)
  }

  render() {
    const {
      className,
      contentContainerClassName,
      onChange, // eslint-disable-line no-unused-vars
      tabWrapper
    } = this.props

    const classList = classNames('Tabs', className)

    const tabContent = []
    const Wrapper = tabWrapper || TabWrapper

    const tabs = this.getTabs().map(tab => {
      let child
      const isSelectedTab = this._isSelectedTab(tab)
      if (isSelectedTab && tab.props.children) {
        child = createElement(
          Wrapper,
          {
            key: tab.props.value,
            selected: isSelectedTab,
            className: contentContainerClassName
          },
          tab.props.children
        )
      } else {
        child = undefined
      }
      tabContent.push(child)

      return cloneElement(tab, {
        key: tab.props.value,
        selected: isSelectedTab,
        onClick: this._handleTabTouchTap
      })
    })

    return (
      <div className={classList}>
        <div className="Tabs__nav">{tabs}</div>
        <div className="Tabs__content">{tabContent}</div>
      </div>
    )
  }
}

Tabs.propTypes = {
  /**
   * Should be used to pass `Tab` components.
   */
  children: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The css class name of the content's container.
   */
  contentContainerClassName: PropTypes.string,
  /**
   * Called when the selected value change.
   */
  onChange: PropTypes.func,
  /**
   * Override the default tab template used to wrap the content of each tab element.
   */
  tabWrapper: PropTypes.func,
  /**
   * Selects the tab whose value prop matches this prop.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  alwaysTriggerOnChange: PropTypes.bool
}

Tabs.defaultProps = {
  children: null,
  className: '',
  contentContainerClassName: '',
  onChange: () => {},
  tabWrapper: null,
  value: '',
  alwaysTriggerOnChange: false
}

export default Tabs
