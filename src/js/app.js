const menu = document.querySelector('#hamburgermenu');
const aside = document.querySelector('#aside');

// Navbar
menu.addEventListener('click', () => {
  aside.classList.toggle('-left-full');
  aside.classList.toggle('left-0');
});

window.addEventListener('click', (e) => {
  if (!aside.contains(e.target) && !menu.contains(e.target)) {
    aside.classList.add('-left-full');
    aside.classList.remove('left-0');
  }
});
