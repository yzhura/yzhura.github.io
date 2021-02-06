export default class Alert {
    constructor(alertText = '', alertStyles = 'info') {
        this.alertText = alertText;
        this.alertStyles = alertStyles;
        this.alertId = `alert_${Math.random().toString(36).substr(2, 9)}`;
        this.alertIsRenderd = true;
    }

    render() {
        if(document.getElementById(`${this.alertId}`)) {
            return;
        }
        const body = document.querySelector('body');
        const alertEl = document.createElement('div');
        const btnDeleteAlertEl = document.createElement('button');

        alertEl.className = `alert alert-dismissible alert-${this.alertStyles} hide w-100 fixed-top text-center`;
        alertEl.setAttribute('id', `${this.alertId}`);

        btnDeleteAlertEl.classList.add('close');
        btnDeleteAlertEl.setAttribute('type', 'button');
        btnDeleteAlertEl.innerHTML =  '&times;'

        alertEl.innerHTML = `${this.alertText}`;
        alertEl.appendChild(btnDeleteAlertEl);

        body.appendChild(alertEl);

        setTimeout(() => {
            alertEl.classList.remove('hide');
            alertEl.classList.add('show');
        }, 0)

        btnDeleteAlertEl.addEventListener('click', () => {
            alertEl.classList.remove('show');
            alertEl.classList.add('hide');
            setTimeout(() => {
                alertEl.remove();
            }, 300)
        });
    }
}