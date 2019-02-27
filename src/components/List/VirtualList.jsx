import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import VirtualListComponent from 'react-tiny-virtual-list'
import classNames from 'classnames'

class VirtualList extends PureComponent {
  _renderItem = ({ index, style }) => {
    const { data, itemClassName } = this.props
    const classNameList = classNames(itemClassName, 'Datalist__item')
    return this.props.renderItem({
      index,
      style,
      data: data[index],
      itemClassName: classNameList
    })
  }

  render() {
    const {
      listClassName,
      width,
      height,
      data,
      itemSize,
      scrollToIndex,
      overscanCount,
      scrollDirection,
      scrollToAlignment,
      onScroll,
      onItemsRendered,
      triggerRenderData
    } = this.props
    const itemCount = data.length
    const classNameList = classNames(listClassName, 'Datalist')
    return (
      <VirtualListComponent
        className={classNameList}
        width={width}
        height={height}
        itemCount={itemCount}
        itemSize={itemSize}
        renderItem={this._renderItem}
        scrollToIndex={scrollToIndex}
        scrollDirection={scrollDirection}
        scrollToAlignment={scrollToAlignment}
        onScroll={onScroll}
        onItemsRendered={onItemsRendered}
        overscanCount={overscanCount}
        {...triggerRenderData}
      />
    )
  }
}

VirtualList.propTypes = {
  listClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.any),
  itemSize: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  scrollToIndex: PropTypes.number,
  scrollDirection: PropTypes.string,
  scrollToAlignment: PropTypes.oneOf(['start', 'center', 'end', 'auto']),
  onScroll: PropTypes.func,
  onItemsRendered: PropTypes.func,
  overscanCount: PropTypes.number,
  triggerRenderData: PropTypes.objectOf(PropTypes.any)
}

VirtualList.defaultProps = {
  listClassName: '',
  itemClassName: '',
  width: '100%',
  height: '100%',
  data: [],
  scrollToIndex: 0,
  scrollDirection: 'vertical',
  scrollToAlignment: 'auto',
  onScroll: (scrollTop, event) => {},
  onItemsRendered: ({ startIndex, stopIndex }) => {},
  overscanCount: 5,
  triggerRenderData: {}
}

export default VirtualList
