// Language Toggle for Evolving Agents
(function() {
  // Nav translations
  var navTranslations = {
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
    'Monitoring Keywords': 'Monitoring-Keywords'
  };

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

  function translateNav(lang) {
    document.querySelectorAll('.nav-list-link').forEach(function(link) {
      var text = link.textContent.trim();
      if (!link.dataset.origText) link.dataset.origText = text;
      if (lang === 'de' && navTranslations[link.dataset.origText]) {
        link.textContent = navTranslations[link.dataset.origText];
      } else if (lang === 'en' && link.dataset.origText) {
        link.textContent = link.dataset.origText;
      }
    });

    // Also translate the breadcrumb / page heading if it exists outside lang divs
    var breadcrumbs = document.querySelectorAll('.breadcrumb-nav-list-item a');
    breadcrumbs.forEach(function(bc) {
      var text = bc.textContent.trim();
      if (!bc.dataset.origText) bc.dataset.origText = text;
      if (lang === 'de' && navTranslations[bc.dataset.origText]) {
        bc.textContent = navTranslations[bc.dataset.origText];
      } else if (lang === 'en' && bc.dataset.origText) {
        bc.textContent = bc.dataset.origText;
      }
    });
  }

  window.setLang = function(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('ea-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    translateNav(lang);
  };

  // Run when DOM is ready
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

  // Re-translate after Just-the-Docs finishes loading (it may modify nav)
  window.addEventListener('load', function() {
    var lang = localStorage.getItem('ea-lang') || 'en';
    translateNav(lang);
  });
})();
