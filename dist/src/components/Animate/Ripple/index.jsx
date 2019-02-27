'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RippleGroup = require('./RippleGroup');

var _RippleGroup2 = _interopRequireDefault(_RippleGroup);

var _createRippleHandler = require('./createRippleHandler');

var _createRippleHandler2 = _interopRequireDefault(_createRippleHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ripple = function (_Component) {
  _inherits(Ripple, _Component);

  function Ripple(props) {
    _classCallCheck(this, Ripple);

    var _this = _possibleConstructorReturn(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).call(this, props));

    _this.handleMouseDown = (0, _createRippleHandler2.default)(_this, 'MouseDown', 'start');
    _this.handleMouseUp = (0, _createRippleHandler2.default)(_this, 'MouseUp', 'stop');
    _this.handleTouchStart = (0, _createRippleHandler2.default)(_this, 'TouchStart', 'start');
    _this.handleTouchEnd = (0, _createRippleHandler2.default)(_this, 'TouchEnd', 'stop');
    _this.handleTouchMove = (0, _createRippleHandler2.default)(_this, 'TouchEnd', 'stop');
    _this.handleBlur = (0, _createRippleHandler2.default)(_this, 'Blur', 'stop');

    var rippleProps = {
      onBlur: _this.handleBlur,
      onFocus: _this.handleFocus,
      onKeyDown: _this.handleKeyDown,
      onKeyUp: _this.handleKeyUp,
      onMouseDown: _this.handleMouseDown,
      onMouseUp: _this.handleMouseUp,
      onTouchEnd: _this.handleTouchEnd,
      onTouchMove: _this.handleTouchMove,
      onTouchStart: _this.handleTouchStart
    };
    _this.rippleProps = props.enableRipple ? rippleProps : {};
    return _this;
  }

  _createClass(Ripple, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var RippleContent = _react2.default.createElement(
        If,
        { condition: this.props.enableRipple },
        _react2.default.createElement(_RippleGroup2.default, {
          ref: function ref(node) {
            _this2.ripple = node;
          }
        })
      );
      return this.props.children(this.rippleProps, RippleContent);
    }
  }]);

  return Ripple;
}(_react.Component);

Ripple.propTypes = {
  children: _propTypes2.default.func,
  enableRipple: _propTypes2.default.bool
};

Ripple.defaultProps = {
  enableRipple: false,
  children: function children() {}
};

exports.default = Ripple;

//# sourceMappingURL=index.jsx.map