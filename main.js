/* ================================================
   THE CAKEWALK WITH TARUNA — Frontend JS
   ================================================ */

// ── NAVBAR SCROLL ────────────────────────────────
const navbar = document.getElementById('navbar');
const floatingCta = document.getElementById('floatingCta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (window.scrollY > 400) {
    floatingCta.classList.add('visible');
  } else {
    floatingCta.classList.remove('visible');
  }
});

// ── HAMBURGER MENU ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ── SCROLL FADE IN ───────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── ORDER FORM ───────────────────────────────────
const form = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const successMsg = document.getElementById('orderSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    customerName: form.customerName.value.trim(),
    customerPhone: form.customerPhone.value.trim(),
    orderItems: form.orderItems.value.trim(),
    preference: form.preference.value,
    datetime: form.datetime.value,
    notes: form.notes.value.trim()
  };

  // Show loader
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  submitBtn.disabled = true;

  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok && result.success) {
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    } else {
      throw new Error(result.message || 'Something went wrong');
    }
  } catch (err) {
    // Fallback: open WhatsApp directly if backend fails
    const msg = buildWhatsAppMessage(data);
    const phone = '919401439292';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
  } finally {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

function buildWhatsAppMessage(data) {
  const dt = data.datetime ? new Date(data.datetime).toLocaleString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }) : 'Not specified';

  return `🧁 NEW ORDER from ${data.customerName}
📞 ${data.customerPhone}
🛍️ Items: ${data.orderItems}
📅 ${data.preference} on ${dt}
📝 Notes: ${data.notes || 'None'}

— Sent via TheCakewalk website`;
}

// ── SMOOTH NAV ACTIVE STATE ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
