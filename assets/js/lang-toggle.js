// Language Toggle for Evolving Agents
(function() {
  // Nav + breadcrumb translations (EN → DE)
  var translations = {
    'Home': 'Startseite',
    'Research': 'Forschung',
    'Principles': 'Prinzipien',
    'Engineering': 'Engineering',
    'Meta': 'Meta',
    'Nowak Synthesis': 'Nowak-Synthese',
    'Paper Registry': 'Paper-Registry',
    'Deep Dive: EvoFlow, MCE, AgentFactory': 'Deep Dive: EvoFlow, MCE, AgentFactory',
    'Open Questions': 'Offene Fragen',
    'Counter-Arguments': 'Gegenargumente',
    'Phase 1: Feedback Loop': 'Phase 1: Feedback-Loop',
    'Phase 1: Implementation': 'Phase 1: Implementierung',
    'Limitations': 'Einschränkungen',
    'Research Toolkit Audit': 'Research-Toolkit-Audit',
    'Research Learnings': 'Research-Learnings',
    'AgentField = Prelife': 'AgentField = Prelife',
    'Monitoring Keywords': 'Monitoring-Keywords',
    // Site title
    'Evolving Agents': 'Evolving Agents'
  };

  // Translate a single text node
  function tr(el, lang) {
    var text = el.textContent.trim();
    if (!el.dataset.origText) el.dataset.origText = text;
    var orig = el.dataset.origText;
    if (lang === 'de' && translations[orig]) {
      el.textContent = translations[orig];
    } else if (lang === 'en') {
      el.textContent = orig;
    }
  }

  function createToggle() {
    if (document.getElementById('lang-toggle-el')) return;
    var toggle = document.createElement('div');
    toggle.className = 'lang-toggle';
    toggle.id = 'lang-toggle-el';
    toggle.innerHTML = '<button class="lang-btn" data-lang="en">EN</button><button class="lang-btn" data-lang="de">DE</button>';
    document.body.appendChild(toggle);
    toggle.addEventListener('click', function(e) {
      if (e.target.classList.contains('lang-btn')) {
        setLang(e.target.dataset.lang);
      }
    });
  }

  function translateAll(lang) {
    // Sidebar nav links
    document.querySelectorAll('.nav-list-link').forEach(function(el) { tr(el, lang); });

    // Breadcrumbs — both <a> links AND <span> (current page)
    document.querySelectorAll('.breadcrumb-nav-list-item a, .breadcrumb-nav-list-item span').forEach(function(el) { tr(el, lang); });

    // Site title in sidebar
    var siteTitle = document.querySelector('.site-title');
    if (siteTitle) tr(siteTitle, lang);

    // aria-labels on expander buttons (e.g. "toggle items in Research category")
    document.querySelectorAll('.nav-list-expander').forEach(function(btn) {
      var label = btn.getAttribute('aria-label') || '';
      if (!btn.dataset.origLabel) btn.dataset.origLabel = label;
      if (lang === 'de') {
        var m = btn.dataset.origLabel.match(/toggle items in (.+) category/);
        if (m && translations[m[1]]) {
          btn.setAttribute('aria-label', 'Elemente in Kategorie ' + translations[m[1]] + ' umschalten');
        }
      } else {
        btn.setAttribute('aria-label', btn.dataset.origLabel);
      }
    });
  }

  window.setLang = function(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('ea-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    translateAll(lang);
  };

  function init() {
    createToggle();
    var saved = localStorage.getItem('ea-lang');
    var lang = saved || (navigator.language.startsWith('de') ? 'de' : 'en');
    setLang(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-translate after Just-the-Docs finishes rendering
  window.addEventListener('load', function() {
    var lang = localStorage.getItem('ea-lang') || 'en';
    translateAll(lang);
  });
})();
