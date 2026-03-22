// Language Toggle for Evolving Agents
(function() {
  // Create toggle UI
  var toggle = document.createElement('div');
  toggle.className = 'lang-toggle';
  toggle.innerHTML = '<button class="lang-btn" data-lang="en" onclick="setLang(\'en\')">EN</button><button class="lang-btn" data-lang="de" onclick="setLang(\'de\')">DE</button>';
  document.body.appendChild(toggle);

  // Apply language
  window.setLang = function(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('ea-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };

  // Init
  var saved = localStorage.getItem('ea-lang');
  var lang = saved || (navigator.language.startsWith('de') ? 'de' : 'en');
  setLang(lang);
})();
