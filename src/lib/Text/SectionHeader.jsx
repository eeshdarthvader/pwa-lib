import React from 'react'
import PropTypes from 'prop-types'

const SectionHeader = ({ children, subheader, marginTop }) => {
  return (
    <div className={`flex flex-between mt-${marginTop} mb-5 pl-16 pr-16`}>
      <p className="fs-13 tt-u fw-500 c-black-50">{children}</p>
      <If condition={subheader}>
        <span className="fs-14 fw-400 c-black-50">{subheader}</span>
      </If>
    </div>
  )
}

SectionHeader.propTypes = {
  children: PropTypes.node,
  subheader: PropTypes.string,
  marginTop: PropTypes.number
}

SectionHeader.defaultProps = {
  children: null,
  subheader: '',
  marginTop: 30
}

SectionHeader.displayName = 'SectionHeader'

export default SectionHeader
