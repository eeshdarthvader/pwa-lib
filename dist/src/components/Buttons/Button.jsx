"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Ripple = require("../Animate/Ripple/");

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (event) {
      event.preventDefault();
      _this.props.onClick(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var btnClass = (0, _classnames2.default)("Button", this.props.className, "Button--" + this.props.size, "Button--" + this.props.type, {
        "is-disabled": this.props.disabled === true
      });

      return _react2.default.createElement(
        _Ripple2.default,
        { enableRipple: !this.props.disabled && this.props.enableRipple },
        function (rippleProps, RippleContent) {
          return _react2.default.createElement(
            "button",
            Object.assign({
              className: btnClass,
              onClick: _this2._handleClick
            }, rippleProps),
            _this2.props.children,
            RippleContent
          );
        }
      );
    }
  }]);

  return Button;
}(_react.PureComponent);

Button.propTypes = {
  /**
   * Whether the button is disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Label for the Button.
   */
  children: _propTypes2.default.node,
  /**
   * Specifies size of the Button.
   */
  size: _propTypes2.default.oneOf(["small", "full", "medium", "large", "inline"]),
  /**
   * Specifies type of the Button.
   */
  type: _propTypes2.default.oneOf(["primary", "secondary", "tertiary"]),
  /**
   * Specifies classnames for the Button.
   */
  className: _propTypes2.default.string,
  /**
   * Event handler for on click event of the Button.
   */
  onClick: _propTypes2.default.func,
  /**
   * Specifies whether to enable the ripple effect for Button.
   */
  enableRipple: _propTypes2.default.bool
};

Button.defaultProps = {
  disabled: false,
  children: "Button",
  size: "full",
  type: "primary",
  className: "",
  onClick: function onClick() {},
  enableRipple: true
};

exports.default = Button;

//# sourceMappingURL=Button.jsx.map