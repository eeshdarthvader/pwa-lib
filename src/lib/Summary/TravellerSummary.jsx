import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'Lib/List'

import Multi from './icons/multi.svg'
import Male from './icons/man.svg'
import Female from './icons/woman.svg'

class TravellerSummary extends PureComponent {
  render() {
    return (
      <List className="bt-0">
        <ListItem
          className="h-56 flex flex-middle flex-start"
          enableRipple={true}
        >
          <Choose>
            <When
              condition={
                this.props.travellersCount === 1 &&
                this.props.travellerGender === 'Male'
              }
            >
              <Male width="26" height="18" fill="#6b6b6b" />
            </When>
            <When
              condition={
                this.props.travellersCount === 1 &&
                this.props.travellerGender === 'Female'
              }
            >
              <Female width="26" height="18" fill="#6b6b6b" />
            </When>
            <Otherwise>
              <Multi width="26" height="18" fill="#6b6b6b" />
            </Otherwise>
          </Choose>
          <div className="flex-1 pl-16 pr-16">
            <p className="fs-15 c-black-80 lh-title mb-3 flex flex-middle">
              <span>{this.props.travellerName}</span>
              <If condition={this.props.travellersCount > 1}>
                <span className="fs-13 c-black-50 ml-5">
                  {' '}
                  +{this.props.travellersCount - 1} {this.props.textMore}{' '}
                </span>
              </If>
            </p>
            <p className="fs-13 c-black-50">
              {`${this.props.contactInfo.email}`}
            </p>
          </div>
        </ListItem>
      </List>
    )
  }
}

TravellerSummary.displayName = 'TravellerSummary'

TravellerSummary.propTypes = {
  travellersCount: PropTypes.number,
  travellerName: PropTypes.string,
  travellerGender: PropTypes.string,
  textMore: PropTypes.string,
  contactInfo: PropTypes.objectOf(
    PropTypes.oneOfType(PropTypes.string, PropTypes.number)
  )
}

TravellerSummary.defaultProps = {
  travellersCount: 1,
  travellerName: 'Traveller',
  textMore: 'more',
  travellerGender: '',
  contactInfo: {
    email: '',
    phone: ''
  }
}

export default TravellerSummary
