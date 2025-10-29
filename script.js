const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const okBtn = document.getElementById('okBtn');

let lastFocusedEl = null;

function openModal() {
    lastFocusedEl = document.activeElement;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    // фокус на кнопку закрытия
    closeBtn.focus();
}

function closeModal() {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    // вернуть фокус туда, где был
    if (lastFocusedEl) lastFocusedEl.focus();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
okBtn.addEventListener('click', closeModal);

// клик по фону — закрыть
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

// Esc — закрыть
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
        closeModal();
    }
});