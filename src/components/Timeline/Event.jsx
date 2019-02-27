import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Checked from './icons/checked.colored.svg'
import Unchecked from './icons/unchecked.colored.svg'

const Event = props => {
  return (
    <div className={classnames('Timeline__block', props.className)}>
      <div className="Timeline__node">
        <Choose>
          <When condition={props.checked}>
            <Checked />
          </When>
          <Otherwise>
            <Unchecked />
          </Otherwise>
        </Choose>
      </div>
      <div className="Timeline__event">{props.children}</div>
    </div>
  )
}

Event.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  checked: PropTypes.bool
}

Event.defaultProps = {
  children: null,
  className: '',
  checked: false
}

Event.displayName = 'Timeline(Event)'

export default Event
