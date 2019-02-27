import React from 'react'
import PropTypes from 'prop-types'

const SectionHelper = ({ children }) => {
  return (
    <p className="fs-13 mt-5 pl-16 pr-16 c-black-50 lh-title">{children}</p>
  )
}

SectionHelper.propTypes = {
  children: PropTypes.node
}

SectionHelper.defaultProps = {
  children: null
}

SectionHelper.displayName = 'SectionHelper'

export default SectionHelper
