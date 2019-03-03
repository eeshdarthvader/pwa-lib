import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from 'Lib/Form/Input'

import SearchIcon from './search.svg'

class Searchbar extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }
  render() {
    return (
      <div className="Searchbar" onClick={this.props.onClick}>
        <div className="Searchbar__icon">
          <SearchIcon width="16" height="16" fill="#cbcbcb" />
        </div>
        <Input
          name={this.props.name}
          inputClassName={`Searchbar__input mb-0 ${this.props.inputClassName}`}
          autoFocus={this.props.autoFocus}
          focusDelay={this.props.focusDelay}
          value={this.props.value}
          onChange={this.props.onChange}
          autoComplete={this.props.autoComplete}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

Searchbar.propTypes = {
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  inputClassName: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  focusDelay: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool
  ]),
  onChange: PropTypes.func
}

Searchbar.defaultProps = {
  onClick: () => {},
  placeholder: 'Search',
  name: 'search',
  inputClassName: ''
}

export default Searchbar
