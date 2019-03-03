import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
class Pageloader extends PureComponent {
  render() {
    return (
      <div className={classNames("Pageloader", this.props.className)}>
        <div className="Pageloader__content">
          <div className="Pageloader__spinner" />
          <h5 className="Pageloader__heading">{this.props.title}</h5>
          <p className="Pageloader__text">{this.props.message}</p>
        </div>
      </div>
    )
  }
}

Pageloader.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
}

Pageloader.defaultProps = {
  message: 'loading...',
  title: '',
  className: ''
}

export default Pageloader
