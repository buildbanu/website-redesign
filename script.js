// The only scripted interaction is the mobile navigation.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const pageContent = [document.querySelector('main'), document.querySelector('footer')];
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
  navigation.toggleAttribute('data-open', open);
  document.body.classList.toggle('menu-open', open);
  pageContent.forEach(element => { if (element) element.inert = open; });
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') {
    setMenu(false);
    menuButton.focus();
  }
  if (event.key === 'Tab') {
    const last = [...navigation.querySelectorAll('a')].at(-1);
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); menuButton.focus();
    }
  }
});
matchMedia('(min-width: 701px)').addEventListener('change', () => setMenu(false));
