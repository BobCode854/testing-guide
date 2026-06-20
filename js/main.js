// ============================================================
// Testing Mastery Hub — shared interactions
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // ---- Copy buttons on code blocks ----
  document.querySelectorAll('.code-block').forEach(function (block) {
    if (block.parentElement && block.parentElement.classList.contains('code-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    block.parentNode.insertBefore(wrap, block);
    wrap.appendChild(block);

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var text = block.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      });
    });
    wrap.appendChild(btn);
  });

  // ---- Scroll to top ----
  var scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) scrollBtn.classList.add('show');
      else scrollBtn.classList.remove('show');
    });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Search boxes (data-search-target -> container of .accordion-item) ----
  document.querySelectorAll('.search-box').forEach(function (input) {
    var targetSel = input.getAttribute('data-search-target');
    if (!targetSel) return;
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase().trim();
      document.querySelectorAll(targetSel + ' .accordion-item').forEach(function (item) {
        var txt = item.innerText.toLowerCase();
        item.style.display = txt.indexOf(q) !== -1 ? '' : 'none';
      });
    });
  });

  // ---- Filter buttons (data-filter, applies to .accordion-item by data-cat) ----
  document.querySelectorAll('.filter-bar').forEach(function (bar) {
    var targetSel = bar.getAttribute('data-filter-target');
    bar.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        if (!targetSel) return;
        document.querySelectorAll(targetSel + ' .accordion-item').forEach(function (item) {
          if (cat === 'all' || item.getAttribute('data-cat') === cat) item.style.display = '';
          else item.style.display = 'none';
        });
      });
    });
  });
});
