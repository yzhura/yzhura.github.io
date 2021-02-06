import CalendarEvent from './calendar-event';
import Alert from './alert';
import Modal from './modal';

export default class Calendar {
    
    constructor(participantsArr, timeArr) {
        this.currentLocationUrl = window.location.href.match('calendar.html');
        this.participantsArr = participantsArr;
        this._daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this._timeArr = timeArr;
        this.meetings = [];
        this.tableEl = document.querySelector('.tbody-calendar-table');
        this.initLocalStorage();
    }

    get timeArr() {
        return this._timeArr;
    }

    get daysArr() {
        return this._daysArr;
    }
    
    initLocalStorage() {
        let localData = JSON.parse(localStorage.getItem('localData'));

        if (!localData) {
            this.meetings = [
                new CalendarEvent('Welcome meeting!', this.participantsArr, 'mon', "10")
            ];
            localStorage.setItem('localData', JSON.stringify(this.meetings));
        } else {
            this.getLocalStorage(localData);
        }
    }

    getLocalStorage(localData) {
        if (localData) {
            localData.forEach((el) => {
                const {meetingName, participants, day, time} = el;
        
                this.meetings.push(
                    new CalendarEvent(
                        meetingName,
                        participants,
                        day,
                        time
                    )
                )
            })
        } else {
            this.initLocalStorage();
        }
    }

    setToLocalSorage() {
        localStorage.setItem('localData', JSON.stringify(this.meetings));
    }

    showDate() {
        const dayEl = document.querySelector('.day');
        const theadElArr = [...document.querySelectorAll('.thead-calendar-table th')];
        const daysLeftTextEl = document.querySelector('.days-left-text');
        const daysLeftEl = daysLeftTextEl.querySelector('.days-left');
        let today = new Date();
        let nowDay = today.getDay();
        let daysLeftCounter = 5 - nowDay + 1;
        let daysPercent = (5 - daysLeftCounter) * (100 / 5);
        const progressEl = document.querySelector('.progress-bar');
        dayEl.textContent = null || `${this._daysArr[nowDay]}`;
        let currentTimeEl = document.querySelector('.current-time');

        const showCurrentTime = () => {
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            currentTimeEl.textContent = time;
        }

        let intervald = setInterval(showCurrentTime, 1000);

        if(nowDay < 6 && nowDay !== 0) {
            theadElArr[nowDay].classList.add('table-primary');
        }

        const animateProgress = () => {
            setTimeout(() => progressEl.style = `width: ${daysPercent}%;`, 500)
        }

        if (daysLeftCounter > 0 && nowDay > 0) {
            daysLeftEl.textContent = `${daysLeftCounter}`;
            animateProgress();
        } else {
            daysLeftTextEl.classList.add('text-success');
            daysLeftTextEl.textContent = `Yeehuu!! Weekend! Enjoy your day!)`;
            progressEl.style = 'width: 100%;';
        }
    }

    renderSelectOption(select, options) {
        if (select.classList.contains('days-select')) {
            options.forEach((el) => {
                const atrValue = el.slice(0, 3).toLowerCase();
                select.appendChild(this.createNodeOption(el, atrValue));
            });
            return;
        }
        if (select.classList.contains('participants-select')) {
            select.appendChild(this.createNodeOption(options.join(', ')))
        }
        options.forEach((el) => {
            select.appendChild(this.createNodeOption(el, el.name));
        })
    }

    createNodeOption(valueContent, atr = valueContent) {
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value', `${atr}`);
        optionEl.textContent = `${valueContent}`;
        return optionEl;
    }

    renderEvents() {
        const newMetingsArr = [...this.meetings];
        let meetHoursArr = [...this.tableEl.querySelectorAll(`.time`)];
        let meetHourRaw;
        let meetDay;

        newMetingsArr.forEach((el) => {
            meetHourRaw = meetHoursArr.find((hour) => +hour.dataset.time === +el.time);
            meetDay = meetHourRaw.querySelector(`[data-day="${el.day}"]`);
            meetDay.classList.remove('empty-td');
            meetDay.appendChild(el.render());
        });
    }

    eventListeners() {
        this.tableEl.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-event')) {
                this.deleteEventCard(event);
                return;
            }
            return;
        })
    }

    dragNdrop() {
        let eventElAll = document.querySelectorAll('.event-card-wrap');
        eventElAll.forEach((el) => {
            el.addEventListener('dragstart', (event) => {
                let currentTd = event.target.parentElement;
                currentTd.classList.add('empty-td');
                el.classList.add(`selected`);
                const activeTdElements = [...this.tableEl.querySelectorAll(`td:not(.empty-td)`)];
                activeTdElements.forEach((el) => {
                    el.style.opacity = '.4';
                    el.style.backgroundColor = '#faba7a';
                })
            });
            el.addEventListener('dragend', (event) => {
                let currentTd = event.target.parentElement;
                currentTd.classList.remove('empty-td');
                el.classList.remove(`selected`);
                const activeTdElements = [...this.tableEl.querySelectorAll(`td:not(.empty-td)`)];
                activeTdElements.forEach((el) => {
                    el.style.opacity = '1';
                    el.style.backgroundColor = 'inherit';
                })
                this.setToLocalSorage();
            });
        })
        this.tableEl.addEventListener('dragover', (event) => {
            event.preventDefault;
            const activeElement = this.tableEl.querySelector(`.selected`);
            const currentElement = event.target;
            if (currentElement.classList.contains('empty-td')){
                currentElement.appendChild(activeElement);
                let newDay = currentElement.dataset.day;
                let newTime = currentElement.parentElement.dataset.time;
                let id = activeElement.getAttribute('id');
                this.meetings.forEach((el) => {
                    if(el.idEvent === id) {
                        el.time = newTime;
                        el.day = newDay;
                    }
                });
            }
        });
    }

    deleteEventCard(event) {
        let target = event.target;
        let eventEL = target.parentNode;
        let eventId = eventEL.getAttribute('id');
        let eventName = this.meetings.find((el) => el.idEvent === eventId).meetingName;
        let modalText= `Are you sure you want to delete "${eventName}" event?`;
        const modal = new Modal(
            modalText,
            'No',
            'Yes',
            `${eventId}`
        );
        modal.render();

        const btnAccept = document.getElementById(`btn-${modal.modalId}`);
        btnAccept.addEventListener('click', () => {
            const newEvents = this.meetings.filter((el) => {
                return el.idEvent !== eventId;
            });
            const eventTd = eventEL.parentElement;
            this.meetings = [...newEvents];
            eventTd.classList.add('empty-td');
            eventEL.classList.add('out-scale');
            setTimeout(() => {
                eventEL.remove();
            }, 300);
            modal.removeModal();
            this.setToLocalSorage();
            this.showMeetingsCount();
        })
    }

    filterParticipants() {
        const sellectEl = document.querySelector('.filter-participants-select');
        sellectEl.addEventListener('change', (event) => {
            const filterValue = event.target.value;
            const filterEventsEl = document.querySelectorAll(`[data-filter]`);
            filterEventsEl.forEach((el) => {
                if (el.dataset.filter.includes(filterValue) || filterValue.includes(el.dataset.filter)) {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                } else {
                    el.style.opacity = '0';
                    el.style.visibility = 'hidden';
                }
            })
        })
    }

    validateCreateEventForm(inputName, particicantsSelect, daysSelect, timeSelect, alert) {
        let eventName = inputName.value;
        let particicantsList = particicantsSelect.value.split(', ');
        let day = daysSelect.value;
        let time = timeSelect.value;

        const bookedTimeAndDayArr = this.meetings.filter((el) => {
            return el.time === time && el.day === day;
        });

        if(!eventName) {
            inputName.classList.add('is-invalid');
            return;
        }

        if (bookedTimeAndDayArr.length > 0) {
            alert.render();
            return;
        }

        this.meetings.push(
            new CalendarEvent(
                eventName, 
                particicantsList, 
                day,
                time
            )
        );
        this.setToLocalSorage();
        window.location.href = './calendar.html';
    }

    createEvent() {
        const formEl = document.querySelector('.create-event-form');
        const eventNameInputEl = formEl.querySelector('.event-input');
        const particicantsSelectEl = formEl.querySelector('.participants-select');
        const daysSelectEl = formEl.querySelector('.days-select');
        const workingDaysArr = this.daysArr.slice(1, this.daysArr.length - 1);
        const timeSelectEl = formEl.querySelector('.time-select');
        const alertTextError = '<strong>Oh snap!</strong> Failed to create an event. Time slot is already booked :(';
        const alertError = new Alert(alertTextError, 'primary');

        this.renderSelectOption(particicantsSelectEl, this.participantsArr);
        this.renderSelectOption(daysSelectEl, workingDaysArr);
        this.renderSelectOption(timeSelectEl, this._timeArr);

        eventNameInputEl.addEventListener('input', (e) => {
            if(e.target.value) {
                eventNameInputEl.classList.remove('is-invalid');
                eventNameInputEl.classList.add('is-valid');
            } else {
                eventNameInputEl.classList.remove('is-valid');
                eventNameInputEl.classList.add('is-invalid');
            }
        })

        formEl.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validateCreateEventForm(eventNameInputEl, particicantsSelectEl, daysSelectEl,timeSelectEl, alertError);
        });
    }

    showMeetingsCount() {
        const meetingsCounter = document.querySelector('.meetings-counter');
        meetingsCounter.textContent = this.meetings.length;
    }

    render() {
        const tbodyEl = this.tableEl;
        const particicantsSelectEl = document.querySelector('.participants-select');
        
        for(let i = 0; i < this._timeArr.length; i++) {
            tbodyEl.insertAdjacentHTML('beforeend', `
            <tr data-time='${this._timeArr[i]}' class="time">
                <th scope="row">${this._timeArr[i]}:00</th>
                <td data-day="mon" class="empty-td"></td>
                <td data-day="tue" class="empty-td"></td>
                <td data-day="wed" class="empty-td"></td>
                <td data-day="thu" class="empty-td"></td>
                <td data-day="fri" class="empty-td"></td>
            </tr>
            `)
        }

        this.renderEvents();
        this.renderSelectOption(particicantsSelectEl, this.participantsArr);
        this.eventListeners();
        this.dragNdrop();
        this.showDate();
        this.filterParticipants();
        this.showMeetingsCount();
    }
}