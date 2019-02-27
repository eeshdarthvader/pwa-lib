import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Slide } from 'Lib/Animate'
import elementClass from 'element-class'

import SheetHeader from './SheetHeader'
import Sticky from '../Sticky'

class Sheet extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      elementClass(document.body).add('Sheet--open')
    } else if (this.props.isOpen && !nextProps.isOpen) {
      elementClass(document.body).remove('Sheet--open')
    }
  }
  componentWillUnmount() {
    elementClass(document.body).remove('Sheet--open')
  }
  render() {
    const SheetHTML = (
      <div className="Sheet">
        <Sticky position="top">
          <SheetHeader
            title={this.props.title}
            onClose={this.props.onClose}
            showCloseButton={this.props.showCloseButton}
            secondaryAction={this.props.secondaryAction}
            secondaryActionClick={this.props.secondaryActionClick}
          />
          {this.props.subHeaderComponent}
        </Sticky>
        <div className="Sheet__content">{this.props.children}</div>
      </div>
    )
    if (this.props.enableAnimation) {
      return (
        <Slide
          in={this.props.isOpen}
          timeout={{ enter: 300, exit: 300 }}
          mountOnEnter={true}
          unmountOnExit={true}
          appear={true}
        >
          {SheetHTML}
        </Slide>
      )
    }
    if (this.props.isOpen) {
      return SheetHTML
    }
    return null
  }
}

Sheet.propTypes = {
  children: PropTypes.node,
  /**
   * Whether to show the Sheet or not.
   */
  isOpen: PropTypes.bool,
  /**
   * Title of the Sheet.
   */
  title: PropTypes.string,
  /**
   * Close event of the Sheet.
   */
  onClose: PropTypes.func,
  /**
   * Whether to enable slide up animation for Sheet. Enabled by default.
   */
  enableAnimation: PropTypes.bool,
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
  secondaryActionClick: PropTypes.func,
  subHeaderComponent: PropTypes.node
}

Sheet.defaultProps = {
  children: null,
  isOpen: false,
  title: '',
  onClose: event => {},
  enableAnimation: true,
  showCloseButton: true,
  secondaryAction: '',
  secondaryActionClick: () => {},
  subHeaderComponent: null
}

export default Sheet
