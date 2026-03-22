// Interactive Originator Equation Simulator
// ẋᵢ = aᵢ·xᵢ' − (d + aᵢ₀ + aᵢ₁)·xᵢ + r·xᵢ·(fᵢ − φ)
(function() {
  var canvas, ctx, slider, rLabel, phaseLabel;
  var termPrelife, termDecay, termSelection;
  var W = 600, H = 240;
  var running = false;
  var animId = null;

  // Simulation parameters
  var N = 80;           // number of sequences
  var species = [];     // {x, fitness, color, prelife}
  var r = 0.0;          // replication rate (user controls this)
  var d = 0.02;         // decay rate
  var dt = 0.05;
  // Term averages (for live display)
  var avgPrelife = 0, avgDecay = 0, avgSelection = 0;

  function init() {
    canvas = document.getElementById('originator-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;

    slider = document.getElementById('r-slider');
    rLabel = document.getElementById('r-value');
    phaseLabel = document.getElementById('phase-label');
    termPrelife = document.getElementById('term-prelife');
    termDecay = document.getElementById('term-decay');
    termSelection = document.getElementById('term-selection');

    // Initialize species
    resetSpecies();

    slider.addEventListener('input', function() {
      r = parseFloat(this.value);
      rLabel.textContent = r.toFixed(2);
      updatePhaseLabel();
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
        prelife: 0.01 + Math.random() * 0.03, // prelife generation rate
        hue: Math.floor(Math.random() * 360)
      });
    }
  }

  function updatePhaseLabel() {
    var en = document.documentElement.getAttribute('data-lang') === 'de' ? false : true;
    if (r < 0.15) {
      phaseLabel.textContent = en ? '◀ Prelife — no replication, random diversity' : '◀ Prelife — keine Replikation, zufällige Diversität';
      phaseLabel.style.color = '#f59e0b';
    } else if (r < 0.4) {
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

    for (var i = 0; i < N; i++) {
      var s = species[i];
      // Originator equation terms
      var prelifeTerm = s.prelife;                         // aᵢ·xᵢ' (simplified)
      var decayTerm = (d + 0.01) * s.x;                   // (d + aᵢ₀ + aᵢ₁)·xᵢ
      var selectionTerm = r * s.x * (s.fitness - phi);     // r·xᵢ·(fᵢ − φ)

      // Track per-species dominant term for coloring
      s.dominantTerm = Math.abs(selectionTerm) > Math.abs(prelifeTerm) ? 'selection' : 'prelife';
      s.selectionStrength = Math.abs(selectionTerm) / (Math.abs(prelifeTerm) + Math.abs(selectionTerm) + 0.001);

      sumPrelife += prelifeTerm;
      sumDecay += decayTerm;
      sumSelection += Math.abs(selectionTerm);

      s.x += (prelifeTerm - decayTerm + selectionTerm) * dt;

      // Add small noise
      s.x += (Math.random() - 0.5) * 0.002;

      // Clamp
      if (s.x < 0.001) s.x = 0.001;
      if (s.x > 2.0) s.x = 2.0;
    }

    // Smooth average for display
    avgPrelife = avgPrelife * 0.9 + (sumPrelife / N) * 0.1;
    avgDecay = avgDecay * 0.9 + (sumDecay / N) * 0.1;
    avgSelection = avgSelection * 0.9 + (sumSelection / N) * 0.1;

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
    if (maxX < 0.1) maxX = 0.1; // prevent division by tiny numbers

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

    // Y-axis label (rotated)
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    var en = document.documentElement.getAttribute('data-lang') !== 'de';
    ctx.fillText(en ? 'Abundance' : 'Häufigkeit', -30, 0);
    ctx.restore();

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
