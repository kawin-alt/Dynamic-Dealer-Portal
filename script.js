/* ============================================================= */
/* ZONTES / GPX After Sales Portal — Mockup Script               */
/* No backend, no database, no real login. Demo navigation only. */
/* ============================================================= */

/* ---------- Enter a portal from the login page ---------- */
function enterPortal(which) {
  document.getElementById('login-page').classList.add('hidden');
  document.getElementById('customer-portal').classList.add('hidden');
  document.getElementById('dealer-portal').classList.add('hidden');

  if (which === 'dealer') {
    document.getElementById('dealer-portal').classList.remove('hidden');
  } else {
    document.getElementById('customer-portal').classList.remove('hidden');
  }
  window.scrollTo(0, 0);
}

/* ---------- Logout back to login page ---------- */
function logout() {
  document.getElementById('customer-portal').classList.add('hidden');
  document.getElementById('dealer-portal').classList.add('hidden');
  document.getElementById('login-page').classList.remove('hidden');
  window.scrollTo(0, 0);
}

/* ---------- Switch section within a portal ---------- */
function showSection(portal, sectionId, clickedEl) {
  var portalEl = document.getElementById(portal + '-portal');
  if (!portalEl) return;

  // hide all sections in this portal
  var sections = portalEl.querySelectorAll('.section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active');
  }
  var target = document.getElementById(sectionId);
  if (target) target.classList.add('active');

  // update active menu item
  var items = portalEl.querySelectorAll('.menu-item');
  for (var j = 0; j < items.length; j++) {
    items[j].classList.remove('active');
  }
  if (clickedEl) clickedEl.classList.add('active');

  // close mobile sidebar after selecting
  var sidebar = portalEl.querySelector('.sidebar');
  if (sidebar) sidebar.classList.remove('open');

  window.scrollTo(0, 0);
}

/* ---------- Helper: find a menu item by the section it opens ---------- */
/* Used by Quick Action buttons so the sidebar highlight stays in sync. */
function menuItem(sectionId) {
  var links = document.querySelectorAll('.menu-item');
  for (var i = 0; i < links.length; i++) {
    var attr = links[i].getAttribute('onclick') || '';
    if (attr.indexOf("'" + sectionId + "'") !== -1) {
      return links[i];
    }
  }
  return null;
}

/* ---------- Mobile sidebar toggle ---------- */
function toggleSidebar(btn) {
  var portalEl = btn.closest('.portal');
  if (!portalEl) return;
  var sidebar = portalEl.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

/* ---------- Toast / demo alert ---------- */
var toastTimer = null;
function demoToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 2600);
}

/* ---------- Show Claim submit flow (Warranty Claim) ---------- */
function showClaimFlow() {
  demoToast('Demo: Claim submitted — sent to Admin review');
  var flow = document.getElementById('claim-flow');
  if (flow) flow.classList.remove('hidden');
}

/* ---------- Show Order submit flow (Order Spare Parts) ---------- */
function showOrderFlow() {
  demoToast('Demo: Order submitted — waiting Admin approval');
  var flow = document.getElementById('order-flow');
  if (flow) flow.classList.remove('hidden');
}

/* ---------- Filter part cards by text ---------- */
function filterCards(input, gridId) {
  var q = input.value.toLowerCase();
  var grid = document.getElementById(gridId);
  if (!grid) return;
  var cards = grid.querySelectorAll('.filterable');
  for (var i = 0; i < cards.length; i++) {
    var text = cards[i].textContent.toLowerCase();
    cards[i].style.display = text.indexOf(q) !== -1 ? '' : 'none';
  }
}

/* ---------- Filter table rows by text ---------- */
function filterTable(input, tableId) {
  var q = input.value.toLowerCase();
  var table = document.getElementById(tableId);
  if (!table) return;
  var rows = table.querySelectorAll('tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var text = rows[i].textContent.toLowerCase();
    rows[i].style.display = text.indexOf(q) !== -1 ? '' : 'none';
  }
}

/* ---------- Customer: submit service booking (NEW feature) ---------- */
function submitBooking() {
  demoToast('ระบบได้รับคำขอนัดหมายแล้ว กรุณารอศูนย์บริการโทรกลับเพื่อยืนยันวันและเวลาอีกครั้ง');
}

/* ---------- Dealer: booking detail modal (NEW feature) ---------- */
function openBooking(bookingNo) {
  var modal = document.getElementById('booking-modal');
  var noEl = document.getElementById('bk-no');
  if (noEl && bookingNo) noEl.textContent = bookingNo;
  if (modal) modal.classList.add('open');
}
function closeBooking() {
  var modal = document.getElementById('booking-modal');
  if (modal) modal.classList.remove('open');
}
/* close only when clicking the dark backdrop, not the modal box */
function closeBookingBackdrop(e) {
  if (e.target && e.target.id === 'booking-modal') closeBooking();
}

/* ---------- Category chip toggle (visual only) ---------- */
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('chip')) {
    var group = e.target.parentElement.querySelectorAll('.chip');
    for (var i = 0; i < group.length; i++) group[i].classList.remove('active');
    e.target.classList.add('active');
  }
});
