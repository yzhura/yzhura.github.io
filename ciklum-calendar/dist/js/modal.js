"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('modal', factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.modal = factory());
})(void 0, function () {
  'use strict';

  var Modal = /*#__PURE__*/function () {
    function Modal(modalText, btnCancelText, btnAcceptText, modalId) {
      _classCallCheck(this, Modal);

      this.modalText = modalText;
      this.btnCancelText = btnCancelText;
      this.btnAcceptText = btnAcceptText;
      this.modalId = "".concat(modalId, "_modal");
    }

    _createClass(Modal, [{
      key: "cancelListener",
      value: function cancelListener() {
        var _this = this;

        var btnsCancel = document.querySelectorAll('[data-modal-cancel]');
        btnsCancel.forEach(function (el) {
          el.addEventListener('click', function () {
            return _this.removeModal();
          });
        });
      }
    }, {
      key: "removeModal",
      value: function removeModal() {
        var currentModal = document.getElementById("".concat(this.modalId));
        currentModal.classList.remove('opacity-show');
        currentModal.classList.add('opacity-hide');
        setTimeout(function () {
          currentModal.remove();
        }, 200);
      }
    }, {
      key: "render",
      value: function render() {
        if (document.getElementById("".concat(this.modalId))) return;
        var modalPopupEl = document.createElement('div');
        modalPopupEl.classList = "modal-popup opacity-hide";
        modalPopupEl.setAttribute('id', "".concat(this.modalId));
        var modalTemplate = "\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <button type=\"button\" class=\"close\" data-modal-cancel=\"modal\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    <div class=\"modal-body\">\n                        <p>".concat(this.modalText, "</p>\n                    </div>\n                    <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-secondary\" data-modal-cancel=\"modal\">").concat(this.btnCancelText, "</button>\n                    <button type=\"button\" class=\"btn btn-primary\" id=\"btn-").concat(this.modalId, "\">").concat(this.btnAcceptText, "</button>\n                    </div>\n                </div>\n            </div>\n        ");
        modalPopupEl.insertAdjacentHTML('beforeend', modalTemplate);
        document.body.appendChild(modalPopupEl);
        setTimeout(function () {
          modalPopupEl.classList.remove('opacity-hide');
          modalPopupEl.classList.add('opacity-show');
        }, 0);
        this.cancelListener();
        return modalTemplate;
      }
    }]);

    return Modal;
  }();

  return Modal;
});
//# sourceMappingURL=modal.js.map
