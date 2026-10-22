#!/bin/zsh
# Makes the blurred copy of each wallpaper (web/wallpapers/<id>-blur.jpg, for the frosted glass) and prints how bright
# and how busy each photo is behind the title and the clock. Paste those two numbers into WALLS in web/home.js.
#
#   tools/m5/wallpaper-gen.sh
#
# To add a wallpaper: put <id>.jpg (1600x900) and <id>-thumb.jpg (400x225) in web/wallpapers, add its id to IDS in
# tools/m5/wallpaper-gen.html and a row to WALLS in web/home.js (and its credit to web/wallpapers/SOURCES.json), then run this.
set -e
ROOT=${0:A:h:h:h}
DIR="$ROOT/web/wallpapers"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cp "$ROOT/tools/m5/wallpaper-gen.html" "$DIR/_gen.html"
python3 -m http.server 8765 --bind 127.0.0.1 --directory "$DIR" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; rm -f "$DIR/_gen.html"' EXIT
for i in 1 2 3 4 5; do curl -s -o /dev/null http://127.0.0.1:8765/_gen.html && break; sleep 1; done
"$CHROME" --headless=new --disable-gpu --virtual-time-budget=30000 --dump-dom http://127.0.0.1:8765/_gen.html 2>/dev/null |
python3 -c '
import sys, re, json, html, base64, os
out = json.loads(html.unescape(re.search(r"<pre id=\"out\">(.*?)</pre>", sys.stdin.read(), re.S).group(1)))
for k, v in sorted(out.items()):
    open(os.path.join(sys.argv[1], k + "-blur.jpg"), "wb").write(base64.b64decode(v["blur"].split(",")[1]))
    print("%-10s light %.3f  busy %.3f" % (k, v["mean"], v["sd"]))
' "$DIR"
