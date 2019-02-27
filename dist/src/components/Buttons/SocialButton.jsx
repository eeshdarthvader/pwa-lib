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

var _facebook = require('./icons/facebook.svg');

var _facebook2 = _interopRequireDefault(_facebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialButton = function (_PureComponent) {
  _inherits(SocialButton, _PureComponent);

  function SocialButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SocialButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SocialButton.__proto__ || Object.getPrototypeOf(SocialButton)).call.apply(_ref, [this].concat(args))), _this), _this._onClick = function (event) {
      _this.props.onClick(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SocialButton, [{
    key: 'render',
    value: function render() {
      var btnClass = (0, _classnames2.default)('SocialButton', this.props.className, {
        'SocialButton--facebook': this.props.type === 'facebook',
        'is-disabled': this.props.disabled === true
      });

      return _react2.default.createElement(
        'button',
        { className: btnClass, onClick: this._onClick },
        this.props.type === 'facebook' && _react2.default.createElement(_facebook2.default, { className: 'SocialButton__icon' }),
        this.props.children
      );
    }
  }]);

  return SocialButton;
}(_react.PureComponent);

SocialButton.propTypes = {
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.string,
  className: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['facebook']).isRequired,
  onClick: _propTypes2.default.func
};

SocialButton.defaultProps = {
  disabled: false,
  children: 'Button',
  type: 'facebook',
  className: '',
  onClick: function onClick() {}
};

exports.default = SocialButton;

//# sourceMappingURL=SocialButton.jsx.map