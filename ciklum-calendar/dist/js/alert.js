"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('alert', factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.alert = factory());
})(void 0, function () {
  'use strict';

  var Alert = /*#__PURE__*/function () {
    function Alert() {
      var alertText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var alertStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';

      _classCallCheck(this, Alert);

      this.alertText = alertText;
      this.alertStyles = alertStyles;
      this.alertId = "alert_".concat(Math.random().toString(36).substr(2, 9));
      this.alertIsRenderd = true;
    }

    _createClass(Alert, [{
      key: "render",
      value: function render() {
        if (document.getElementById("".concat(this.alertId))) {
          return;
        }

        var body = document.querySelector('body');
        var alertEl = document.createElement('div');
        var btnDeleteAlertEl = document.createElement('button');
        alertEl.className = "alert alert-dismissible alert-".concat(this.alertStyles, " hide w-100 fixed-top text-center");
        alertEl.setAttribute('id', "".concat(this.alertId));
        btnDeleteAlertEl.classList.add('close');
        btnDeleteAlertEl.setAttribute('type', 'button');
        btnDeleteAlertEl.innerHTML = '&times;';
        alertEl.innerHTML = "".concat(this.alertText);
        alertEl.appendChild(btnDeleteAlertEl);
        body.appendChild(alertEl);
        setTimeout(function () {
          alertEl.classList.remove('hide');
          alertEl.classList.add('show');
        }, 0);
        btnDeleteAlertEl.addEventListener('click', function () {
          alertEl.classList.remove('show');
          alertEl.classList.add('hide');
          setTimeout(function () {
            alertEl.remove();
          }, 300);
        });
      }
    }]);

    return Alert;
  }();

  return Alert;
});
//# sourceMappingURL=alert.js.map
