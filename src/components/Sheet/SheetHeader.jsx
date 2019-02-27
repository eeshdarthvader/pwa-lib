import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Truncate } from 'Lib/Text'
import Close from './close.svg'

class SheetHeader extends PureComponent {
  render() {
    return (
      <div className="Sheet__header">
        <If condition={this.props.showCloseButton}>
          <span
            role="button"
            className="Sheet__close"
            onClick={this.props.onClose}
          >
            <Close width="16" height="16" fill="#fff" />
          </span>
        </If>
        <Truncate className="Sheet__title pl-10 lh-title" width="80%">
          {this.props.title}
        </Truncate>
        <a
          onClick={this.props.secondaryActionClick}
          className="Sheet__secondaryAction"
        >
          {this.props.secondaryAction}
        </a>
      </div>
    )
  }
}

SheetHeader.propTypes = {
  /**
   * Title of the Sheet.
   */
  title: PropTypes.string,
  /**
   * Close event of the Sheet.
   */
  onClose: PropTypes.func,
  /*
  * Whether to show the close button or not. Default true.
  */
  showCloseButton: PropTypes.bool,
  /*
  * Show Reset button
  */
  secondaryAction: PropTypes.string,
  /*
  * Show Reset button Click
  */
  secondaryActionClick: PropTypes.func
}

SheetHeader.defaultProps = {
  title: '',
  onClose: event => {},
  showCloseButton: true,
  secondaryAction: '',
  secondaryActionClick: () => {}
}

export default SheetHeader
