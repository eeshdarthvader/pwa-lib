import React from 'react'
import PropTypes from 'prop-types'

const SectionDivider = ({ children }) => {
  return (
    <p className="fs-12 c-black-50 sectionDivider">
      <span className="sectionDivider__text">{children}</span>
      <hr className="sectionDivider__line" />
    </p>
  )
}

SectionDivider.propTypes = {
  children: PropTypes.node
}

SectionDivider.defaultProps = {
  children: null
}

SectionDivider.displayName = 'SectionDivider'

export default SectionDivider
