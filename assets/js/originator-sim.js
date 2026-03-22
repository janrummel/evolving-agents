// Interactive Originator Equation Simulator
// ẋᵢ = aᵢ·xᵢ' − (d + aᵢ₀ + aᵢ₁)·xᵢ + r·xᵢ·(fᵢ − φ)
(function() {
  var canvas, ctx, slider, rLabel, phaseLabel;
  var termPrelife, termDecay, termSelection;
  var W = 600, H = 240;
  var isMobile = (typeof window !== 'undefined' && window.innerWidth < 500);
  var running = false;
  var animId = null;

  // Simulation parameters
  var N = 80;           // number of sequences
  var species = [];     // {x, fitness, color, prelife}
  var r = 0.0;          // replication rate (user controls this, 0-3 internally)
  var d = 0.02;         // decay rate
  var dt = 0.05;
  var rScale = 3.0;     // slider 0-1 maps to r 0-3 for dramatic effect
  // Term averages (for live display)
  var avgPrelife = 0, avgDecay = 0, avgSelection = 0;

  function init() {
    canvas = document.getElementById('originator-canvas');
    if (!canvas) { console.warn('Originator sim: canvas not found'); return; }
    ctx = canvas.getContext('2d');

    // Responsive: fit canvas to container width on mobile
    if (isMobile && canvas.parentElement) {
      var containerW = canvas.parentElement.clientWidth - 48; // padding
      if (containerW < W) {
        W = Math.max(300, containerW);
        H = Math.round(W * 0.4); // keep aspect ratio
      }
    }

    // Retina / HiDPI support
    var dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    slider = document.getElementById('r-slider');
    rLabel = document.getElementById('r-value');
    phaseLabel = document.getElementById('phase-label');
    termPrelife = document.getElementById('term-prelife');
    termDecay = document.getElementById('term-decay');
    termSelection = document.getElementById('term-selection');

    if (!slider) { console.warn('Originator sim: slider not found'); return; }

    // Initialize species
    resetSpecies();

    // Slider event — use both 'input' (dragging) and 'change' (release)
    function onSliderChange() {
      r = parseFloat(slider.value) * rScale;  // map 0-1 slider to 0-3
      if (rLabel) rLabel.textContent = r.toFixed(2);
      updatePhaseLabel();
    }
    slider.addEventListener('input', onSliderChange);
    slider.addEventListener('change', onSliderChange);

    // Also handle touch events for mobile
    slider.addEventListener('touchmove', function(e) {
      onSliderChange();
    });

    running = true;
    loop();
  }

  function resetSpecies() {
    species = [];
    for (var i = 0; i < N; i++) {
      species.push({
        x: Math.random(),                    // abundance
        fitness: 0.3 + Math.random() * 0.7,  // fitness [0.3, 1.0]
        prelife: 0.002 + Math.random() * 0.005, // prelife generation rate (small, so selection can dominate)
        hue: Math.floor(Math.random() * 360)
      });
    }
  }

  function updatePhaseLabel() {
    var en = document.documentElement.getAttribute('data-lang') === 'de' ? false : true;
    if (r < 0.3) {
      phaseLabel.textContent = en ? '◀ Prelife — no replication, random diversity' : '◀ Prelife — keine Replikation, zufällige Diversität';
      phaseLabel.style.color = '#f59e0b';
    } else if (r < 1.2) {
      phaseLabel.textContent = en ? '⚡ Phase Transition — selection switches on at rₓ' : '⚡ Phasenübergang — Selektion schaltet ein bei rₓ';
      phaseLabel.style.color = '#60a5fa';
    } else {
      phaseLabel.textContent = en ? '▶ Life — fittest replicators dominate' : '▶ Life — fitteste Replikatoren dominieren';
      phaseLabel.style.color = '#34d399';
    }
  }

  function step() {
    // Calculate average fitness φ
    var totalX = 0, totalFX = 0;
    for (var i = 0; i < N; i++) {
      totalX += species[i].x;
      totalFX += species[i].x * species[i].fitness;
    }
    var phi = totalX > 0 ? totalFX / totalX : 0;

    var sumPrelife = 0, sumDecay = 0, sumSelection = 0;
    var maxAbundance = 0, maxIdx = 0;

    for (var i = 0; i < N; i++) {
      if (species[i].x > maxAbundance) { maxAbundance = species[i].x; maxIdx = i; }
    }

    for (var i = 0; i < N; i++) {
      var s = species[i];
      // Originator equation terms
      var prelifeTerm = s.prelife;                         // aᵢ·xᵢ' (simplified)
      var decayTerm = (d + 0.005) * s.x;                   // (d + aᵢ₀ + aᵢ₁)·xᵢ
      var selectionTerm = r * s.x * (s.fitness - phi);     // r·xᵢ·(fᵢ − φ)

      // Track per-species dominant term for coloring
      s.dominantTerm = Math.abs(selectionTerm) > Math.abs(prelifeTerm) ? 'selection' : 'prelife';
      s.selectionStrength = Math.abs(selectionTerm) / (Math.abs(prelifeTerm) + Math.abs(selectionTerm) + 0.001);

      // Use dominant species for display (more dynamic than average)
      if (i === maxIdx) {
        sumPrelife = prelifeTerm;
        sumDecay = decayTerm;
        sumSelection = Math.abs(selectionTerm);
      }

      s.x += (prelifeTerm - decayTerm + selectionTerm) * dt;

      // Add small noise
      s.x += (Math.random() - 0.5) * 0.0005;

      // Floor only — no ceiling clamp
      if (s.x < 0.0001) s.x = 0.0001;
    }

    // Normalize: abundances are frequencies (sum to 1)
    var totalAbundance = 0;
    for (var i = 0; i < N; i++) totalAbundance += species[i].x;
    if (totalAbundance > 0) {
      for (var i = 0; i < N; i++) species[i].x /= totalAbundance;
    }

    // Smooth display values (tracking dominant species, not average)
    avgPrelife = avgPrelife * 0.9 + sumPrelife * 0.1;
    avgDecay = avgDecay * 0.9 + sumDecay * 0.1;
    avgSelection = avgSelection * 0.9 + sumSelection * 0.1;

    // Update live indicators
    if (termPrelife) termPrelife.textContent = avgPrelife.toFixed(3);
    if (termDecay) termDecay.textContent = '-' + avgDecay.toFixed(3);
    if (termSelection) termSelection.textContent = avgSelection.toFixed(3);
  }

  function draw() {
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    // Sort by fitness for visual layering
    var sorted = species.slice().sort(function(a, b) { return a.fitness - b.fitness; });

    // Find max abundance for relative scaling
    var maxX = 0;
    for (var i = 0; i < N; i++) {
      if (sorted[i].x > maxX) maxX = sorted[i].x;
    }
    if (maxX < 0.001) maxX = 0.001; // prevent division by tiny numbers

    var barW = W / N;
    var maxBarH = H - 20; // leave 20px padding at top

    for (var i = 0; i < N; i++) {
      var s = sorted[i];
      var barH = (s.x / maxX) * maxBarH;

      // Color shifts from amber (prelife) to green (selection) based on dominant term
      var selStr = s.selectionStrength || 0;
      // Amber: hsl(38, 92%, 50%), Green: hsl(160, 60%, 50%)
      var hue = 38 + selStr * 122;         // 38 (amber) → 160 (green)
      var sat = 70 + s.fitness * 25;       // brighter = fitter
      var light = 25 + s.fitness * 30;     // brighter = fitter

      ctx.fillStyle = 'hsl(' + Math.round(hue) + ',' + sat + '%,' + light + '%)';
      ctx.fillRect(i * barW + 1, H - barH, barW - 2, barH);
    }

    // Phase transition line
    if (r > 0.1 && r < 0.5) {
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Axis labels
    ctx.fillStyle = 'rgba(139, 148, 158, 0.6)';
    ctx.font = '11px -apple-system, sans-serif';
    var en = document.documentElement.getAttribute('data-lang') !== 'de';

    // Y-axis label (rotated) + percentage
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(en ? 'Frequency (%)' : 'Häufigkeit (%)', -35, 0);
    ctx.restore();

    // Y-axis tick: show max percentage
    var maxPct = (maxX * 100).toFixed(0);
    ctx.fillText(maxPct + '%', 18, 18);
    ctx.fillText('0%', 18, H - 6);

    // X-axis label
    ctx.fillText(en ? 'Sequences (sorted by fitness →)' : 'Sequenzen (sortiert nach Fitness →)', W / 2 - 80, H - 4);
  }

  function loop() {
    if (!running) return;
    step();
    draw();
    animId = requestAnimationFrame(loop);
  }

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
