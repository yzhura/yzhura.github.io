"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('calendarEvent', factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.calendarEvent = factory());
})(void 0, function () {
  'use strict';

  var CalendarEvent = /*#__PURE__*/function () {
    function CalendarEvent(meetingName) {
      var participants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var day = arguments.length > 2 ? arguments[2] : undefined;
      var time = arguments.length > 3 ? arguments[3] : undefined;

      _classCallCheck(this, CalendarEvent);

      this.meetingName = meetingName;
      this.participants = participants;
      this.day = day;
      this.time = time;
      this.participantsFilter = participants.join(', ');
      this.idEvent = "event_".concat(Math.random().toString(36).substr(2, 9));
    }

    _createClass(CalendarEvent, [{
      key: "render",
      value: function render() {
        if (document.getElementById("".concat(this.idEvent))) {
          return;
        }

        var eventCardWrap = document.createElement('div');
        eventCardWrap.className = 'event-card-wrap p-3';
        eventCardWrap.setAttribute('id', "".concat(this.idEvent));
        eventCardWrap.setAttribute('data-filter', "".concat(this.participantsFilter));
        eventCardWrap.setAttribute('draggable', 'true');
        eventCardWrap.setAttribute('data-toggle', 'tooltip');
        eventCardWrap.setAttribute('data-html', 'true');
        var tooltipHtml = "<strong>Participants:</strong> ".concat(this.participants.join(', '));
        eventCardWrap.setAttribute('title', "".concat(tooltipHtml));
        var btnDelete = document.createElement('button');
        btnDelete.className = 'close delete-event';
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('data-toogle', "modal");
        btnDelete.setAttribute('data-target', "#".concat(this.idModal));
        btnDelete.innerHTML = '&times;';
        eventCardWrap.textContent = "".concat(this.meetingName);
        eventCardWrap.appendChild(btnDelete);
        return eventCardWrap;
      }
    }]);

    return CalendarEvent;
  }();

  return CalendarEvent;
});
//# sourceMappingURL=calendar-event.js.map
