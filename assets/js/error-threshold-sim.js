/**
 * Error Threshold Simulator
 * Visualizes Nowak's error threshold: u_c = 1 - [(d+2a)/(r·f)]^(1/n)
 * When mutation rate u > u_c, the system collapses from Life back to Prelife.
 */
(function () {
  'use strict';

  // Default parameters from Nowak & Ohtsuki 2008
  var d = 1;     // decay rate
  var a = 1;     // prelife rate
  var r = 10;    // replication rate
  var f = 1;     // fitness

  var canvas, ctx;
  var W = 500, H = 200;

  // DOM elements
  var sliderU, sliderN, labelU, labelN, statusEl, formulaEl;

  function computeThreshold(n) {
    // u_c = 1 - [(d + 2a) / (r * f)]^(1/n)
    var base = (d + 2 * a) / (r * f);
    if (base <= 0 || base >= 1) return 0;
    return 1 - Math.pow(base, 1 / n);
  }

  function draw() {
    if (!ctx) return;
    var u = parseFloat(sliderU.value);
    var n = parseInt(sliderN.value);
    var uc = computeThreshold(n);

    // Update labels
    labelU.textContent = u.toFixed(3);
    labelN.textContent = n;

    // q = (1-u)^n  (error-free replication probability)
    var q = Math.pow(1 - u, n);
    var qc = Math.pow(1 - uc, n);

    // Status
    var isAlive = u < uc;
    statusEl.textContent = isAlive
      ? (document.documentElement.lang === 'de'
          ? '✅ LIFE — Information bleibt erhalten (u < u_c)'
          : '✅ LIFE — Information is maintained (u < u_c)')
      : (document.documentElement.lang === 'de'
          ? '❌ PRELIFE — Informationsverlust (u ≥ u_c)'
          : '❌ PRELIFE — Information loss (u ≥ u_c)');
    statusEl.style.color = isAlive ? '#34d399' : '#f87171';

    // Formula values
    formulaEl.innerHTML = 'u<sub>c</sub> = ' + uc.toFixed(4) + ' &nbsp;|&nbsp; q = (1−u)<sup>n</sup> = ' + q.toFixed(4);

    // === Draw ===
    var dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, W, H);

    var pad = { left: 50, right: 20, top: 20, bottom: 35 };
    var plotW = W - pad.left - pad.right;
    var plotH = H - pad.top - pad.bottom;

    // Draw q curve for varying u (0 to 0.2)
    var uMax = 0.2;
    var steps = 200;

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.stroke();

    // Y-axis label
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(14, pad.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('q = (1−u)ⁿ', 0, 0);
    ctx.restore();

    // X-axis label
    ctx.fillText('Mutation rate u', pad.left + plotW / 2, H - 3);

    // Y ticks
    ctx.textAlign = 'right';
    for (var yt = 0; yt <= 1; yt += 0.25) {
      var yy = pad.top + plotH * (1 - yt);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText(yt.toFixed(2), pad.left - 6, yy + 4);
      if (yt > 0 && yt < 1) {
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.moveTo(pad.left, yy);
        ctx.lineTo(pad.left + plotW, yy);
        ctx.stroke();
      }
    }

    // X ticks
    ctx.textAlign = 'center';
    for (var xt = 0; xt <= uMax; xt += 0.05) {
      var xx = pad.left + (xt / uMax) * plotW;
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText(xt.toFixed(2), xx, pad.top + plotH + 16);
    }

    // Threshold line (vertical)
    var ucX = pad.left + (uc / uMax) * plotW;
    if (uc <= uMax) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(ucX, pad.top);
      ctx.lineTo(ucX, pad.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('u_c = ' + uc.toFixed(3), ucX, pad.top - 5);
    }

    // q curve — Life region (green)
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    var started = false;
    for (var i = 0; i <= steps; i++) {
      var uv = (i / steps) * uMax;
      var qv = Math.pow(1 - uv, n);
      var px = pad.left + (uv / uMax) * plotW;
      var py = pad.top + plotH * (1 - qv);
      if (uv <= uc) {
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      }
    }
    ctx.strokeStyle = '#34d399';
    ctx.stroke();

    // q curve — Prelife region (red)
    ctx.beginPath();
    started = false;
    for (var j = 0; j <= steps; j++) {
      var uv2 = (j / steps) * uMax;
      var qv2 = Math.pow(1 - uv2, n);
      var px2 = pad.left + (uv2 / uMax) * plotW;
      var py2 = pad.top + plotH * (1 - qv2);
      if (uv2 >= uc) {
        if (!started) { ctx.moveTo(px2, py2); started = true; }
        else ctx.lineTo(px2, py2);
      }
    }
    ctx.strokeStyle = '#f87171';
    ctx.stroke();

    // Current position dot
    var curX = pad.left + (u / uMax) * plotW;
    var curY = pad.top + plotH * (1 - q);
    if (u <= uMax) {
      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, 2 * Math.PI);
      ctx.fillStyle = isAlive ? '#34d399' : '#f87171';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Region labels
    ctx.font = 'bold 12px system-ui, sans-serif';
    if (uc > 0.04 && uc <= uMax) {
      ctx.fillStyle = 'rgba(52,211,153,0.4)';
      ctx.textAlign = 'center';
      ctx.fillText('LIFE', pad.left + (ucX - pad.left) / 2, pad.top + plotH - 10);
      ctx.fillStyle = 'rgba(248,113,113,0.4)';
      ctx.fillText('PRELIFE', ucX + (pad.left + plotW - ucX) / 2, pad.top + plotH - 10);
    }
  }

  function init() {
    canvas = document.getElementById('error-threshold-canvas');
    if (!canvas) return;

    sliderU = document.getElementById('et-slider-u');
    sliderN = document.getElementById('et-slider-n');
    labelU = document.getElementById('et-u-value');
    labelN = document.getElementById('et-n-value');
    statusEl = document.getElementById('et-status');
    formulaEl = document.getElementById('et-formula');

    if (!sliderU || !sliderN) return;

    ctx = canvas.getContext('2d');

    // Responsive
    var isMobile = window.innerWidth < 500;
    if (isMobile && canvas.parentElement) {
      var containerW = canvas.parentElement.clientWidth - 48;
      if (containerW < W) {
        W = Math.max(280, containerW);
        H = Math.round(W * 0.4);
      }
    }

    // Retina
    var dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    sliderU.addEventListener('input', draw);
    sliderN.addEventListener('input', draw);

    draw();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
