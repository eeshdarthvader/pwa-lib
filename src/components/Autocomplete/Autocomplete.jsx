/* eslint-disable */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { safeInvoke } from 'Utils'
import { List, ListItem } from '../List'
import SearchBar from '../Searchbar'
import { SectionHeader } from '../Text'
import Sheet from '../Sheet'
import PageLoader from '../Pageloader'
import Navigation from './navigation.svg'

class Autocomplete extends PureComponent {
  searchResultClassName = 'mt-20'
  sectionHeaderMarginTop = 15

  _refHandlers = {
    menu: ref => {
      this.menu = ref
    }
  }

  _handleChange = (value, inputName, event) => {
    this.props.onChange(value, inputName, event)
  }

  _onSelect = (item, selectedDataType) => {
    this.props.onSelect(item, selectedDataType)
  }

  _handleAutoDetect = city => {
    this._onSelect(city, 'data')
  }

  _renderMenu = (dataKey, className = '') => {
    const data = this.props[dataKey].map((item, index) => {
      let element = ''
      if (
        item.destinationType &&
        (item.destinationType === 'hotels' || item.destinationType === 'places')
      ) {
        element = this.props.renderItem(item, item.destinationType)
      } else {
        element = this.props.renderItem(item, item.type)
      }

      return React.cloneElement(element, {
        onClick: () => this._onSelect(item, dataKey)
      })
    })

    const menu = this.props.renderMenu(data, this.props.value, className)
    return React.cloneElement(menu, {
      ref: this._refHandlers.menu,
      key: dataKey,
      className
    })
  }

  _renderCategorizedMenu = (hotelCategoryObj, categoryKey) => {
    const data = hotelCategoryObj[categoryKey].map((item, index) => {
      const element = this.props.renderItem(item, categoryKey)
      return React.cloneElement(element, {
        onClick: () => this._onSelect(item, categoryKey),
        key: categoryKey + item.id
      })
    })
    const menu = this.props.renderMenu(data, this.props.value)
    return React.cloneElement(menu, {
      ref: this._refHandlers.menu,
      key: categoryKey
    })
  }

  _renderRecentMenu = () => {
    const subHeader = (
      <SectionHeader
        key="recent-header"
        marginTop={this.sectionHeaderMarginTop}
      >
        {this.props.recentSearchesHeader}
      </SectionHeader>
    )
    if (this.props.recentData.length > 0) {
      return [subHeader, this._renderMenu('recentData')]
    }
    return null
  }

  _renderMergedMenuWithCategories = () => {
    const { data } = this.props
    return [
      <If condition={data.top.length > 0}>
        <SectionHeader key="top-hits-header">Top Hits</SectionHeader>
        {this._renderCategorizedMenu(data, 'top')}
      </If>,

      <If condition={data.places.length > 0}>
        <SectionHeader key="best-of-location-header">
          Best of {data.places[0].city}
        </SectionHeader>
        {this._renderCategorizedMenu(data, 'places')}
      </If>,
      <If condition={data.cities.length > 0}>
        <SectionHeader key="cities-header">Cities</SectionHeader>
        {this._renderCategorizedMenu(data, 'cities')}
      </If>,
      <If condition={data.hotels.length > 0}>
        <SectionHeader key="hotels-header">Hotels</SectionHeader>
        {this._renderCategorizedMenu(data, 'hotels')}
      </If>
    ]
  }

  _renderPopularMenu = () => {
    const subHeader = (
      <SectionHeader
        key="popular-header"
        marginTop={this.sectionHeaderMarginTop}
      >
        {this.props.popularHeader}
      </SectionHeader>
    )
    if (this.props.popularData.length > 0) {
      return [subHeader, this._renderMenu('popularData')]
    }
    return null
  }

  render() {
    const inputComponent = (
      <SearchBar
        autoFocus={this.props.autoFocus}
        focusDelay={this.props.focusDelay}
        name="autocomplete"
        inputClassName="Autocomplete__search mb-0"
        value={this.props.value}
        onChange={this._handleChange}
        autoComplete="off"
        placeholder={this.props.placeholder}
      />
    )
    return (
      <Sheet
        subHeaderComponent={inputComponent}
        isOpen={this.props.isOpen}
        title={this.props.title}
        onClose={this.props.onClose}
      >
        <div className="Autocomplete">
          <If
            condition={this.props.enableGeoLocation && !this.props.value.length}
          >
            <If condition={this.props.showGeoLocationLoader}>
              <PageLoader title="Hang on" message="Fetching location..." />
            </If>
            <List className="mt-20">
              <ListItem
                className="flex flex-middle c-blue fs-14 h-48"
                onClick={this.props.onClick}
              >
                <Navigation
                  className="Note__icon mr-5"
                  fill="#36c"
                  width="14"
                  height="14"
                />
                Current location
              </ListItem>
            </List>
          </If>
          <If condition={this.props.data}>
            <If condition={this.props.showSearchCategory}>
              {this._renderMergedMenuWithCategories()}
            </If>
            <If condition={!this.props.showSearchCategory}>
              {this._renderMenu('data', this.searchResultClassName)}
            </If>
          </If>
          <If condition={this.props.value.length < 3}>
            {this._renderRecentMenu()}
            {this._renderPopularMenu()}
          </If>
        </div>
      </Sheet>
    )
  }
}

Autocomplete.propTypes = {
  /**
   * The items to display in the dropdown menu
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The popular items to display in the dropdown menu
   */
  popularData: PropTypes.arrayOf(PropTypes.object),
  /**
   * The recently searched items to display in the dropdown menu
   */
  recentData: PropTypes.arrayOf(PropTypes.object),
  /**
   * The value to display in the input field
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Arguments: `value: String, event: Event`
   *
   * Invoked every time the user changes the input's value.
   */
  onChange: PropTypes.func,
  /**
   * Arguments: `value: String, item: Any`
   *
   * Invoked when the user selects an item from the dropdown menu.
   */
  onSelect: PropTypes.func,
  /**
   * Arguments: `item: Any`
   *
   * Invoked for each entry in `items` that also passes `shouldItemRender` to
   * generate the render tree for each item in the dropdown menu.
   */
  renderItem: PropTypes.func.isRequired,
  /**
   * Arguments: `items: Array<Any>, value: String,`
   *
   * Invoked to generate the render tree for the dropdown menu. Ensure the
   * returned tree includes `items` or else no items will be rendered.
   */
  renderMenu: PropTypes.func,
  placeholder: PropTypes.string,
  popularHeader: PropTypes.string,
  recentSearchesHeader: PropTypes.string,
  /**
   * Whether to enable autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * Delay(in ms) to trigger focus on the input.
   */
  focusDelay: PropTypes.number,
  enableGeoLocation: PropTypes.bool,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  hotelsSearchCategories: PropTypes.func,
  showSearchCategory: PropTypes.bool,
  showGeoLocationLoader: PropTypes.bool
}

Autocomplete.defaultProps = {
  value: '',
  onChange: null,
  onSelect: null,
  renderMenu: (items, value, className = '') => {
    return <List className={className}>{items}</List>
  },
  placeholder: '',
  recentSearchesHeader: 'Recent Searches',
  popularData: [],
  recentData: [],
  popularHeader: '',
  autoFocus: true,
  focusDelay: 0,
  enableGeoLocation: false,
  onClick: null,
  hotelsSearchCategories: () => {},
  showSearchCategory: false,
  showGeoLocationLoader: false
}

export default Autocomplete
