'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @ignore - internal component.
 */
var Ripple = function (_Component) {
  _inherits(Ripple, _Component);

  function Ripple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ripple.__proto__ || Object.getPrototypeOf(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      rippleVisible: false,
      rippleLeaving: false
    }, _this.handleEnter = function () {
      _this.setState({
        rippleVisible: true
      });
    }, _this.handleExit = function () {
      _this.setState({
        rippleLeaving: true
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ripple, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classNameProp = _props.className,
          pulsate = _props.pulsate,
          rippleX = _props.rippleX,
          rippleY = _props.rippleY,
          rippleSize = _props.rippleSize,
          other = _objectWithoutProperties(_props, ['className', 'pulsate', 'rippleX', 'rippleY', 'rippleSize']);

      var _state = this.state,
          rippleVisible = _state.rippleVisible,
          rippleLeaving = _state.rippleLeaving;


      var className = (0, _classnames2.default)('Ripple__wrapper', {
        'Ripple__wrapper--leaving': rippleLeaving,
        'Ripple__wrapper--pulsating': pulsate
      }, classNameProp);

      var rippleClassName = (0, _classnames2.default)('Ripple__item', {
        'Ripple__item--visible': rippleVisible,
        'Ripple__item--fast': pulsate
      });

      var rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX
      };

      return _react2.default.createElement(
        _Transition2.default,
        Object.assign({
          onEnter: this.handleEnter,
          onExit: this.handleExit
        }, other),
        _react2.default.createElement(
          'span',
          { className: className },
          _react2.default.createElement('span', { className: rippleClassName, style: rippleStyles })
        )
      );
    }
  }]);

  return Ripple;
}(_react.Component);

Ripple.propTypes = {
  /**
   * @ignore
   */
  className: _propTypes2.default.string, // eslint-disable-line
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: _propTypes2.default.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: _propTypes2.default.number, // eslint-disable-line
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: _propTypes2.default.number, // eslint-disable-line
  /**
   * Vertical position of the ripple center.
   */
  rippleY: _propTypes2.default.number // eslint-disable-line
};

Ripple.defaultProps = {
  pulsate: false
};

exports.default = Ripple;

//# sourceMappingURL=RippleItem.jsx.map