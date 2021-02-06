import Calendar from './calendar';

const calendar = new Calendar(
    ['Daenerys', 'Jon Snow', 'Eddard Stark', 'Drogon'],
    [10, 11, 12, 13, 14, 15, 16, 17, 18]
);

function initBootstrapTooltips() {
    $('[data-toggle="tooltip"]').tooltip();
}

document.addEventListener('DOMContentLoaded', () => {
    if(calendar.currentLocationUrl) {
        calendar.render();
    } else {
        calendar.createEvent();
    }
    initBootstrapTooltips();
});
