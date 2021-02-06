export default class CalendarEvent {

    constructor(meetingName, participants = [], day, time) {
        this.meetingName = meetingName;
        this.participants = participants;
        this.day = day;
        this.time = time;
        this.participantsFilter = participants.join(', ');
        this.idEvent = `event_${Math.random().toString(36).substr(2, 9)}`;
    }

    render() {

        if(document.getElementById(`${this.idEvent}`)) {
            return;
        }
        
        const eventCardWrap = document.createElement('div');
        eventCardWrap.className = 'event-card-wrap p-3';
        eventCardWrap.setAttribute('id', `${this.idEvent}`);
        eventCardWrap.setAttribute('data-filter', `${this.participantsFilter}`);
        eventCardWrap.setAttribute('draggable', 'true');
        eventCardWrap.setAttribute('data-toggle', 'tooltip');
        eventCardWrap.setAttribute('data-html', 'true');
        const tooltipHtml = `<strong>Participants:</strong> ${this.participants.join(', ')}`;
        eventCardWrap.setAttribute('title', `${tooltipHtml}`);

        const btnDelete = document.createElement('button');
        btnDelete.className = 'close delete-event';
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('data-toogle', `modal`);
        btnDelete.setAttribute('data-target', `#${this.idModal}`);
        btnDelete.innerHTML = '&times;';
        eventCardWrap.textContent = `${this.meetingName}`;
        eventCardWrap.appendChild(btnDelete);

        return eventCardWrap;
    }
}