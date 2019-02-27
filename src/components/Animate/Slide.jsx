import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import PropTypes from 'prop-types'

const Slide = ({ children, ...props }) => (
  <CSSTransition {...props} classNames="slide">
    {children}
  </CSSTransition>
)

Slide.propTypes = {
  children: PropTypes.node
}

Slide.defaultProps = {
  children: null
}

Slide.displayName = 'Animate(Slide)'

export default Slide
