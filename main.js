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

// ── DATETIME RESTRICTIONS ────────────────────────
const datetimeInput = document.getElementById('datetime');

function setDatetimeConstraints() {
  const now = new Date();
  const earliest = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const pad = n => String(n).padStart(2, '0');
  const minStr = `${earliest.getFullYear()}-${pad(earliest.getMonth()+1)}-${pad(earliest.getDate())}T${pad(earliest.getHours())}:${pad(earliest.getMinutes())}`;
  datetimeInput.min = minStr;
  const maxDate = new Date(now);
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxStr = `${maxDate.getFullYear()}-${pad(maxDate.getMonth()+1)}-${pad(maxDate.getDate())}T21:00`;
  datetimeInput.max = maxStr;
}

setDatetimeConstraints();

function showDateError(msg) {
  let errEl = document.getElementById('datetime-error');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = 'datetime-error';
    errEl.style.cssText = 'color:#c8956c;font-size:0.78rem;margin-top:0.4rem;font-style:italic;';
    datetimeInput.parentNode.appendChild(errEl);
  }
  errEl.textContent = msg;
}

datetimeInput.addEventListener('change', () => {
  if (!datetimeInput.value) return;
  const selected = new Date(datetimeInput.value);
  const hours = selected.getHours();
  const now = new Date();
  const earliest = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  if (selected < earliest) {
    showDateError('Please select a time at least 2 hours from now — we need time to bake! 🎂');
    datetimeInput.value = '';
  } else if (hours < 9 || hours >= 21) {
    showDateError('We deliver between 9:00 AM and 9:00 PM. Please pick a time within those hours!');
    datetimeInput.value = '';
  } else {
    showDateError('');
  }
});

// ── ORDER FORM ───────────────────────────────────
const form = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const successMsg = document.getElementById('orderSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const selected = new Date(datetimeInput.value);
  const now = new Date();
  const earliest = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const hours = selected.getHours();

  if (!datetimeInput.value) {
    showDateError('Please select a valid delivery date and time.');
    return;
  }
  if (selected < earliest) {
    showDateError('Please select a time at least 2 hours from now — we need time to bake! 🎂');
    return;
  }
  if (hours < 9 || hours >= 21) {
    showDateError('We deliver between 9:00 AM and 9:00 PM. Please pick a time within those hours!');
    return;
  }

  const data = {
    customerName: form.customerName.value.trim(),
    customerPhone: form.customerPhone.value.trim(),
    orderItems: form.orderItems.value.trim(),
    preference: form.preference.value,
    datetime: form.datetime.value,
    notes: form.notes.value.trim()
  };

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
    if (result.whatsappLink) {
      window.open(result.whatsappLink, '_blank');
    }
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
  } catch (err) {
    const msg = buildWhatsAppMessage(data);
    window.open(`https://wa.me/919401439292?text=${encodeURIComponent(msg)}`, '_blank');
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
  return `🧁 NEW ORDER from ${data.customerName}\n📞 ${data.customerPhone}\n🛍️ Items: ${data.orderItems}\n📅 ${data.preference} on ${dt}\n📝 Notes: ${data.notes || 'None'}\n\n— Sent via TheCakewalk website`;
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
