/* Consolidated JS for project5 pages */
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked and handle active state
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (navLinks) navLinks.classList.remove('active');
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Attach gallery filter buttons (if present)
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const onclick = this.getAttribute('onclick');
      let category = this.dataset.category || null;
      if (!category && onclick) {
        const m = onclick.match(/'(.*?)'/);
        category = m ? m[1] : 'all';
      }
      filterGallery(category, e);
    });
  });
});

function filterGallery(category, event) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.filter-btn');

  if (event) {
    const btn = event.target.closest('.filter-btn');
    if (btn) buttons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }

  items.forEach(item => {
    if (category === 'all' || !category) {
      item.style.display = 'block';
    } else {
      item.style.display = item.classList.contains(category) ? 'block' : 'none';
    }
  });
}

function handleSubmit(event) {
  event.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  if (event.target && typeof event.target.reset === 'function') event.target.reset();
  return false;
}
