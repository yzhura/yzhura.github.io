export default class Modal {
    constructor(modalText, btnCancelText, btnAcceptText, modalId) {
        this.modalText = modalText;
        this.btnCancelText = btnCancelText;
        this.btnAcceptText = btnAcceptText;
        this.modalId = `${modalId}_modal`;
    }

    cancelListener() {
        const btnsCancel =  document.querySelectorAll('[data-modal-cancel]');
        btnsCancel.forEach((el) => {
            el.addEventListener('click', () => this.removeModal())
        })
    }

    removeModal() {
        let currentModal = document.getElementById(`${this.modalId}`);
        currentModal.classList.remove('opacity-show');
        currentModal.classList.add('opacity-hide');
        setTimeout(() => {
            currentModal.remove();
        }, 200)
    }

    render() {

        if(document.getElementById(`${this.modalId}`)) return;

        const modalPopupEl = document.createElement('div');
        modalPopupEl.classList = "modal-popup opacity-hide";
        modalPopupEl.setAttribute('id', `${this.modalId}`);

        const modalTemplate = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <button type="button" class="close" data-modal-cancel="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <p>${this.modalText}</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal-cancel="modal">${this.btnCancelText}</button>
                    <button type="button" class="btn btn-primary" id="btn-${this.modalId}">${this.btnAcceptText}</button>
                    </div>
                </div>
            </div>
        `;

        modalPopupEl.insertAdjacentHTML('beforeend', modalTemplate);
        document.body.appendChild(modalPopupEl);

        setTimeout(() => {
            modalPopupEl.classList.remove('opacity-hide');
            modalPopupEl.classList.add('opacity-show');
        }, 0)

        this.cancelListener();

        return modalTemplate;
    }
}