const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const okBtn = document.getElementById('okBtn');
const burgerBtn = document.querySelector('.header_burger');
const burgerModal = document.getElementById('burgerModal');
const closeBurgerModalBtn = document.getElementById('closeBurgerModal');

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

function openBurgerModal() {
    // save focus and show burger modal
    lastFocusedEl = document.activeElement;
    if (burgerModal) {
        burgerModal.classList.add('burger-modal--active');
        document.body.classList.add('no-scroll');
        // focus close button if present
        if (closeBurgerModalBtn) closeBurgerModalBtn.focus();
    }
}

function closeBurgerModal() {
    if (burgerModal) {
        burgerModal.classList.remove('burger-modal--active');
    }
    document.body.classList.remove('no-scroll');
    if (lastFocusedEl) lastFocusedEl.focus();
}

// attach listeners safely (page may not contain all elements)
if (openBtn) openBtn.addEventListener('click', openModal);
if (burgerBtn) burgerBtn.addEventListener('click', openBurgerModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (okBtn) okBtn.addEventListener('click', closeModal);
if (closeBurgerModalBtn) closeBurgerModalBtn.addEventListener('click', closeBurgerModal);
if (burgerModal) {
    burgerModal.addEventListener('click', (e) => {
        if (e.target === burgerModal) closeBurgerModal();
    });
}

// клик по фону — закрыть
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

// Esc — закрыть
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (overlay.classList.contains('show')) {
            closeModal();
        }
        if (burgerModal.classList.contains('burger-modal--active')) {
            closeBurgerModal();
        }
    }
});

