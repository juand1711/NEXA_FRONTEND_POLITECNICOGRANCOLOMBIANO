// Shared JS
document.addEventListener('DOMContentLoaded', () => {
  // Burger
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Newsletter
  const form = document.getElementById('newsForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    alert(ok ? '¡Gracias! Te hemos suscrito a las novedades de NEXA.' : 'Por favor ingresa un correo válido.');
    if(ok) form.reset();
  });

  // Detalle producto
  const thumbs = document.querySelectorAll('.thumbs .thumb');
  thumbs.forEach(btn => btn.addEventListener('click', () => {
    thumbs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));
  document.getElementById('addCart')?.addEventListener('click', () => alert('Añadido al carrito ✅'));
  const favBtn = document.getElementById('favBtn');
  favBtn?.addEventListener('click', () => {
    const active = favBtn.classList.toggle('active');
    favBtn.setAttribute('aria-pressed', String(active));
    favBtn.textContent = active ? '♥' : '♡';
  });

  // Listado: paginación
  const pag = document.querySelector('.pagination');
  if(pag){
    const pages = pag.querySelectorAll('.page');
    const prev = pag.querySelector('.prev');
    const next = pag.querySelector('.next');
    function setActive(n){
      pages.forEach(p => p.classList.toggle('is-active', p.dataset.page === String(n)));
      prev.disabled = (n <= 1);
      next.disabled = (n >= pages.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    pages.forEach(btn => btn.addEventListener('click', () => setActive(Number(btn.dataset.page))));
    prev?.addEventListener('click', () => {
      const current = Number(pag.querySelector('.page.is-active')?.dataset.page || 1);
      setActive(current - 1);
    });
    next?.addEventListener('click', () => {
      const current = Number(pag.querySelector('.page.is-active')?.dataset.page || 1);
      setActive(current + 1);
    });
  }

  // Login
  const toggle = document.getElementById('togglePass');
  const pass = document.getElementById('loginPass');
  toggle?.addEventListener('click', () => {
    const isPwd = pass.type === 'password';
    pass.type = isPwd ? 'text' : 'password';
    toggle.textContent = isPwd ? '🙈' : '👁️';
  });
  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pwd = document.getElementById('loginPass').value;
    const remember = document.getElementById('remember').checked;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!okEmail || pwd.length < 6){ alert('Correo o contraseña inválidos.'); return; }
    localStorage.setItem('nexa_logged', remember ? 'remember' : '1');
    window.location.href = 'admin.html';
  });


});
