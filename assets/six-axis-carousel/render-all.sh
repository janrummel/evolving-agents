#!/bin/bash
set -euo pipefail

# Renders all six slides to 1200x627 PNG using Headless Chrome.
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
    --window-size=1200,627 \
    --screenshot="$PNG" \
    "file://$HTML"
done

echo ""
echo "Done. PNGs:"
ls -lh "$DIR"/slide-*.png
