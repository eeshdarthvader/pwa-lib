import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Stencil = props => {
  const styles = {
    width: `${props.width}px`,
    height: `${props.height}px`
  }
  const classes = classNames(props.className, {
    Stencil: true,
    'has-shimmer': props.shimmer,
    'is-rounded': props.type === 'rounded',
    'is-circular': props.type === 'circular',
    'is-dark': props.dark === true
  })

  return (
    <div className={classes} style={styles}>
      {props.children}
    </div>
  )
}

Stencil.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.string,
  shimmer: PropTypes.bool,
  dark: PropTypes.bool
}

Stencil.defaultProps = {
  children: null,
  className: '',
  height: '10',
  width: '10',
  type: 'block',
  shimmer: false,
  dark: false
}

Stencil.displayName = 'Stencil'

export default Stencil
