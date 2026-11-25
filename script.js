const root = document.documentElement;
root.classList.add('js');

// Make sure the cover is visible even if CSS animations never run
setTimeout(() => root.classList.add('settled'), 2000);

// Year
document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });

// Theme toggle (remembered per browser)
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Photo fallback, in case the image failed before the inline handler ran
const img = document.querySelector('.portrait img');
if (img && img.complete && img.naturalWidth === 0) img.closest('.portrait').classList.add('no-photo');

// Reveal features and sections as they scroll in; figures draw themselves
const targets = document.querySelectorAll('.feature, .also, .about-grid, .contact');
if ('IntersectionObserver' in window) {
  targets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));
} else {
  targets.forEach(t => t.classList.add('in'));
}
