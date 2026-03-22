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

  // Create toggle UI
  var toggle = document.createElement('div');
  toggle.className = 'lang-toggle';
  toggle.innerHTML = '<button class="lang-btn" data-lang="en" onclick="setLang(\'en\')">EN</button><button class="lang-btn" data-lang="de" onclick="setLang(\'de\')">DE</button>';
  document.body.appendChild(toggle);

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
    // Also translate page title in header
    var pageTitle = document.querySelector('.main-content h1');
    // Don't touch h1 — those are handled by lang divs
  }

  // Apply language
  window.setLang = function(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('ea-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    translateNav(lang);
  };

  // Init
  var saved = localStorage.getItem('ea-lang');
  var lang = saved || (navigator.language.startsWith('de') ? 'de' : 'en');
  setLang(lang);
})();
