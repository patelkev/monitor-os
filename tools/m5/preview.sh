#!/bin/zsh
# Screenshots the web app in headless Chrome after a series of remote-key presses, without the monitor.
#
#   tools/m5/preview.sh shot.png                      # the home screen
#   tools/m5/preview.sh drawer.png "40"               # after pressing Down
#   tools/m5/preview.sh menu.png "39,L13"             # Right, then hold OK (L = held 900 ms)
#
# Key codes: 37 left, 38 up, 39 right, 40 down, 13 OK, 8 Back. Animations are switched off so the shot is final.
# The preview is the TV build (Live TV + HDMI 1-4), not the monitor's (HDMI 1-2): the monitor check needs the device.
set -e
ROOT=${0:A:h:h:h}
OUT=${1:-preview.png}
KEYS=${2:-}
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WORK=$(mktemp -d)
python3 "$ROOT/tizen/build.py" --generic --preview >/dev/null
cp -R "$ROOT/out/tizen/." "$WORK/"
cp "$ROOT/tools/m5/preview-keys.js" "$WORK/keys.js"
sed -i '' 's#</body>#<script src="keys.js"></script></body>#' "$WORK/index.html"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --user-data-dir="$WORK/profile" \
  --window-size=1920,1080 --virtual-time-budget=25000 --screenshot="${OUT:A}" "file://$WORK/index.html#$KEYS" >/dev/null 2>&1
rm -rf "$WORK"
echo "Saved ${OUT:A}"
