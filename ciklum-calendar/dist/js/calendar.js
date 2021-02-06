"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('calendar', factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.calendar = factory());
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

  var Calendar = /*#__PURE__*/function () {
    function Calendar(participantsArr, timeArr) {
      _classCallCheck(this, Calendar);

      this.currentLocationUrl = window.location.href.match('calendar.html');
      this.participantsArr = participantsArr;
      this._daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      this._timeArr = timeArr;
      this.meetings = [];
      this.tableEl = document.querySelector('.tbody-calendar-table');
      this.initLocalStorage();
    }

    _createClass(Calendar, [{
      key: "initLocalStorage",
      value: function initLocalStorage() {
        var localData = JSON.parse(localStorage.getItem('localData'));

        if (!localData) {
          this.meetings = [new CalendarEvent('Welcome meeting!', this.participantsArr, 'mon', "10")];
          localStorage.setItem('localData', JSON.stringify(this.meetings));
        } else {
          this.getLocalStorage(localData);
        }
      }
    }, {
      key: "getLocalStorage",
      value: function getLocalStorage(localData) {
        var _this2 = this;

        if (localData) {
          localData.forEach(function (el) {
            var meetingName = el.meetingName,
                participants = el.participants,
                day = el.day,
                time = el.time;

            _this2.meetings.push(new CalendarEvent(meetingName, participants, day, time));
          });
        } else {
          this.initLocalStorage();
        }
      }
    }, {
      key: "setToLocalSorage",
      value: function setToLocalSorage() {
        localStorage.setItem('localData', JSON.stringify(this.meetings));
      }
    }, {
      key: "showDate",
      value: function showDate() {
        var dayEl = document.querySelector('.day');

        var theadElArr = _toConsumableArray(document.querySelectorAll('.thead-calendar-table th'));

        var daysLeftTextEl = document.querySelector('.days-left-text');
        var daysLeftEl = daysLeftTextEl.querySelector('.days-left');
        var today = new Date();
        var nowDay = today.getDay();
        var daysLeftCounter = 5 - nowDay + 1;
        var daysPercent = (5 - daysLeftCounter) * (100 / 5);
        var progressEl = document.querySelector('.progress-bar');
        dayEl.textContent = "".concat(this._daysArr[nowDay]);
        var currentTimeEl = document.querySelector('.current-time');

        var showCurrentTime = function showCurrentTime() {
          var today = new Date();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          currentTimeEl.textContent = time;
        };

        var intervald = setInterval(showCurrentTime, 1000);

        if (nowDay < 6 && nowDay !== 0) {
          theadElArr[nowDay].classList.add('table-primary');
        }

        var animateProgress = function animateProgress() {
          setTimeout(function () {
            return progressEl.style = "width: ".concat(daysPercent, "%;");
          }, 500);
        };

        if (daysLeftCounter > 0 && nowDay > 0) {
          daysLeftEl.textContent = "".concat(daysLeftCounter);
          animateProgress();
        } else {
          daysLeftTextEl.classList.add('text-success');
          daysLeftTextEl.textContent = "Yeehuu!! Weekend! Enjoy your day!)";
          progressEl.style = 'width: 100%;';
        }
      }
    }, {
      key: "renderSelectOption",
      value: function renderSelectOption(select, options) {
        var _this3 = this;

        if (select.classList.contains('days-select')) {
          options.forEach(function (el) {
            var atrValue = el.slice(0, 3).toLowerCase();
            select.appendChild(_this3.createNodeOption(el, atrValue));
          });
          return;
        }

        if (select.classList.contains('participants-select')) {
          select.appendChild(this.createNodeOption(options.join(', ')));
        }

        options.forEach(function (el) {
          select.appendChild(_this3.createNodeOption(el, el.name));
        });
      }
    }, {
      key: "createNodeOption",
      value: function createNodeOption(valueContent) {
        var atr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : valueContent;
        var optionEl = document.createElement('option');
        optionEl.setAttribute('value', "".concat(atr));
        optionEl.textContent = "".concat(valueContent);
        return optionEl;
      }
    }, {
      key: "renderEvents",
      value: function renderEvents() {
        var newMetingsArr = _toConsumableArray(this.meetings);

        var meetHoursArr = _toConsumableArray(this.tableEl.querySelectorAll(".time"));

        var meetHourRaw;
        var meetDay;
        newMetingsArr.forEach(function (el) {
          meetHourRaw = meetHoursArr.find(function (hour) {
            return +hour.dataset.time === +el.time;
          });
          meetDay = meetHourRaw.querySelector("[data-day=\"".concat(el.day, "\"]"));
          meetDay.classList.remove('empty-td');
          meetDay.appendChild(el.render());
        });
      }
    }, {
      key: "eventListeners",
      value: function eventListeners() {
        var _this4 = this;

        this.tableEl.addEventListener('click', function (event) {
          if (event.target.classList.contains('delete-event')) {
            _this4.deleteEventCard(event);

            return;
          }

          return;
        });
      }
    }, {
      key: "dragNdrop",
      value: function dragNdrop() {
        var _this5 = this;

        var eventElAll = document.querySelectorAll('.event-card-wrap');
        eventElAll.forEach(function (el) {
          el.addEventListener('dragstart', function (event) {
            var currentTd = event.target.parentElement;
            currentTd.classList.add('empty-td');
            el.classList.add("selected");

            var activeTdElements = _toConsumableArray(_this5.tableEl.querySelectorAll("td:not(.empty-td)"));

            activeTdElements.forEach(function (el) {
              el.style.opacity = '.4';
              el.style.backgroundColor = '#faba7a';
            });
          });
          el.addEventListener('dragend', function (event) {
            var currentTd = event.target.parentElement;
            currentTd.classList.remove('empty-td');
            el.classList.remove("selected");

            var activeTdElements = _toConsumableArray(_this5.tableEl.querySelectorAll("td:not(.empty-td)"));

            activeTdElements.forEach(function (el) {
              el.style.opacity = '1';
              el.style.backgroundColor = 'inherit';
            });

            _this5.setToLocalSorage();
          });
        });
        this.tableEl.addEventListener('dragover', function (event) {
          event.preventDefault;

          var activeElement = _this5.tableEl.querySelector(".selected");

          var currentElement = event.target;

          if (currentElement.classList.contains('empty-td')) {
            currentElement.appendChild(activeElement);
            var newDay = currentElement.dataset.day;
            var newTime = currentElement.parentElement.dataset.time;
            var id = activeElement.getAttribute('id');

            _this5.meetings.forEach(function (el) {
              if (el.idEvent === id) {
                el.time = newTime;
                el.day = newDay;
              }
            });
          }
        });
      }
    }, {
      key: "deleteEventCard",
      value: function deleteEventCard(event) {
        var _this6 = this;

        var target = event.target;
        var eventEL = target.parentNode;
        var eventId = eventEL.getAttribute('id');
        var eventName = this.meetings.find(function (el) {
          return el.idEvent === eventId;
        }).meetingName;
        var modalText = "Are you sure you want to delete \"".concat(eventName, "\" event?");
        var modal = new Modal(modalText, 'No', 'Yes', "".concat(eventId));
        modal.render();
        var btnAccept = document.getElementById("btn-".concat(modal.modalId));
        btnAccept.addEventListener('click', function () {
          var newEvents = _this6.meetings.filter(function (el) {
            return el.idEvent !== eventId;
          });

          var eventTd = eventEL.parentElement;
          _this6.meetings = _toConsumableArray(newEvents);
          eventTd.classList.add('empty-td');
          eventEL.classList.add('out-scale');
          setTimeout(function () {
            eventEL.remove();
          }, 300);
          modal.removeModal();

          _this6.setToLocalSorage();

          _this6.showMeetingsCount();
        });
      }
    }, {
      key: "filterParticipants",
      value: function filterParticipants() {
        var sellectEl = document.querySelector('.filter-participants-select');
        sellectEl.addEventListener('change', function (event) {
          var filterValue = event.target.value;
          var filterEventsEl = document.querySelectorAll("[data-filter]");
          filterEventsEl.forEach(function (el) {
            if (el.dataset.filter.includes(filterValue) || filterValue.includes(el.dataset.filter)) {
              el.style.opacity = '1';
              el.style.visibility = 'visible';
            } else {
              el.style.opacity = '0';
              el.style.visibility = 'hidden';
            }
          });
        });
      }
    }, {
      key: "validateCreateEventForm",
      value: function validateCreateEventForm(inputName, particicantsSelect, daysSelect, timeSelect, alert) {
        var eventName = inputName.value;
        var particicantsList = particicantsSelect.value.split(', ');
        var day = daysSelect.value;
        var time = timeSelect.value;
        var bookedTimeAndDayArr = this.meetings.filter(function (el) {
          return el.time === time && el.day === day;
        });

        if (!eventName) {
          inputName.classList.add('is-invalid');
          return;
        }

        if (bookedTimeAndDayArr.length > 0) {
          alert.render();
          return;
        }

        this.meetings.push(new CalendarEvent(eventName, particicantsList, day, time));
        this.setToLocalSorage();
        window.location.href = './calendar.html';
      }
    }, {
      key: "createEvent",
      value: function createEvent() {
        var _this7 = this;

        var formEl = document.querySelector('.create-event-form');
        var eventNameInputEl = formEl.querySelector('.event-input');
        var particicantsSelectEl = formEl.querySelector('.participants-select');
        var daysSelectEl = formEl.querySelector('.days-select');
        var workingDaysArr = this.daysArr.slice(1, this.daysArr.length - 1);
        var timeSelectEl = formEl.querySelector('.time-select');
        var alertTextError = '<strong>Oh snap!</strong> Failed to create an event. Time slot is already booked :(';
        var alertError = new Alert(alertTextError, 'primary');
        this.renderSelectOption(particicantsSelectEl, this.participantsArr);
        this.renderSelectOption(daysSelectEl, workingDaysArr);
        this.renderSelectOption(timeSelectEl, this._timeArr);
        eventNameInputEl.addEventListener('input', function (e) {
          if (e.target.value) {
            eventNameInputEl.classList.remove('is-invalid');
            eventNameInputEl.classList.add('is-valid');
          } else {
            eventNameInputEl.classList.remove('is-valid');
            eventNameInputEl.classList.add('is-invalid');
          }
        });
        formEl.addEventListener('submit', function (event) {
          event.preventDefault();

          _this7.validateCreateEventForm(eventNameInputEl, particicantsSelectEl, daysSelectEl, timeSelectEl, alertError);
        });
      }
    }, {
      key: "showMeetingsCount",
      value: function showMeetingsCount() {
        var meetingsCounter = document.querySelector('.meetings-counter');
        meetingsCounter.textContent = this.meetings.length;
      }
    }, {
      key: "render",
      value: function render() {
        var tbodyEl = this.tableEl;
        var particicantsSelectEl = document.querySelector('.participants-select');

        for (var i = 0; i < this._timeArr.length; i++) {
          tbodyEl.insertAdjacentHTML('beforeend', "\n            <tr data-time='".concat(this._timeArr[i], "' class=\"time\">\n                <th scope=\"row\">").concat(this._timeArr[i], ":00</th>\n                <td data-day=\"mon\" class=\"empty-td\"></td>\n                <td data-day=\"tue\" class=\"empty-td\"></td>\n                <td data-day=\"wed\" class=\"empty-td\"></td>\n                <td data-day=\"thu\" class=\"empty-td\"></td>\n                <td data-day=\"fri\" class=\"empty-td\"></td>\n            </tr>\n            "));
        }

        this.renderEvents();
        this.renderSelectOption(particicantsSelectEl, this.participantsArr);
        this.eventListeners();
        this.dragNdrop();
        this.showDate();
        this.filterParticipants();
        this.showMeetingsCount();
      }
    }, {
      key: "timeArr",
      get: function get() {
        return this._timeArr;
      }
    }, {
      key: "daysArr",
      get: function get() {
        return this._daysArr;
      }
    }]);

    return Calendar;
  }();

  return Calendar;
});
//# sourceMappingURL=calendar.js.map
