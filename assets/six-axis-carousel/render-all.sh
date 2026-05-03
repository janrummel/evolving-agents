#!/bin/bash
set -euo pipefail

# Renders all six slides to 1080x1350 PNG (4:5 portrait) using Headless Chrome.
# Window-size includes 30px buffer (1080x1380) to prevent footer clipping.
# Usage: ./render-all.sh

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ ! -x "$CHROME" ]]; then
  echo "Error: Chrome not found at $CHROME" >&2
  exit 1
fi

for n in 1 2 3 4 5 6; do
  HTML=$(ls "$DIR"/slide-${n}-*.html 2>/dev/null | head -1)
  if [[ -z "$HTML" ]]; then
    echo "Skip: no slide-${n}-*.html"
    continue
  fi
  PNG="$DIR/slide-${n}.png"
  echo "Rendering: $(basename "$HTML") → $(basename "$PNG")"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --window-size=1080,1380 \
    --screenshot="$PNG" \
    "file://$HTML"
done

echo ""
echo "Cropping PNGs to exact 1080x1350 (LinkedIn carousel spec)…"
for png in "$DIR"/slide-*.png; do
  sips -c 1350 1080 "$png" >/dev/null 2>&1 || true
done

echo ""
echo "Done. PNGs:"
ls -lh "$DIR"/slide-*.png
