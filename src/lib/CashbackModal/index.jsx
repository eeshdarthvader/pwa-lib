import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Timeline, Event } from 'Lib/Timeline'
import { formatCurrency } from 'Utils'

class CashbackModal extends PureComponent {
  _handlePrimaryAction = () => {
    this.props.onPrimaryAction()
  }

  render() {
    return (
      <div className="Modal">
        <div className="Modal__content">
          <h1 className="Modal__heading">{this.props.textCashbackSchedule}</h1>
          <p className="Modal__subheading">{this.props.subheader}</p>

          <Timeline className="mt-25">
            <For each="item" of={this.props.breakup}>
              <Event checked={item.message.indexOf('Instant') !== -1}>
                <p className="fw-400 c-black-60 fs-13 mb-5">
                  {item.message.replace(`$\{date}`, item.date) // eslint-disable-line
                  }
                </p>
                <p className="fw-600 c-black-90 fs-18">
                  {formatCurrency(item.amount)}
                </p>
              </Event>
            </For>
          </Timeline>
        </div>

        <div className="Modal__actions">
          <a
            className="Modal__action Modal__action--primary"
            onClick={this._handlePrimaryAction}
          >
            {this.props.textClose}
          </a>
        </div>
      </div>
    )
  }
}

CashbackModal.propTypes = {
  onPrimaryAction: PropTypes.func,
  subheader: PropTypes.string,
  breakup: PropTypes.arrayOf(PropTypes.object),
  textCashbackSchedule: PropTypes.string,
  textClose: PropTypes.string
}

CashbackModal.defaultProps = {
  onPrimaryAction: () => {},
  subheader: '',
  breakup: [],
  textCashbackSchedule: 'Cashback schedule',
  textClose: 'Close'
}

export default CashbackModal
