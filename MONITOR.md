# monitor-os: a custom home screen for the Samsung M5 Smart Monitor

A custom home screen for the Samsung M5 Smart Monitor (Tizen 5.5), with wallpapers, a screensaver page, a List layout,
a long-press menu and shortcuts for the monitor's inputs. This repository is <https://github.com/patelkev/monitor-os>,
a fork of Free My TV; the work is on the `m5-monitor` branch (the default branch).

> **Not affiliated with Samsung, Netflix or any other brand shown.** All trademarks and logos belong to their
> owners. This is an unofficial, personal project.

## Credit

Built on [Free My TV](https://github.com/simbasjungles/free-my-tv) by simbasjungles and contributors, released under
the MIT licence. This fork keeps the upstream licence and copyright notice, and the upstream README and `CLAUDE.md`
still apply. The rest of this file covers only what is different on this branch.

## What was changed

- Adapted the Samsung (Tizen) web app to the M5 monitor: monitor inputs (HDMI 1 and 2), no TV tuner.
- Wallpapers, a screensaver page with a configurable photo interval, and a List layout.
- A long-press menu, a light/dark button and a stronger focus ring.
- Helper scripts in `tools/m5/`: preview without the monitor, wallpaper generator, remote-key sender.

## Install with your own certificate

Samsung requires apps to be signed. No certificate is included in this repository, so you make your own:

1. Install Tizen Studio and turn on Developer mode on the monitor.
2. Create your own author certificate and signing profile (`tools/m5/make-cert.sh` does this; you type the password
   yourself).
3. Build and install: `python3 tizen/install.py <monitor-ip>`.

Keep your certificate and its password safe; updates must be signed with the same certificate. The detailed steps are
further down in this file.

## Third-party assets

- Wallpapers: photographs from Unsplash, credited in `web/wallpapers/SOURCES.json`. They are licensed for use in an
  app, not for redistribution as a standalone wallpaper collection.
- Fonts: Geist, Manrope and Newsreader, under the SIL Open Font License (`web/typefaces/`).
- Brand logos come from upstream Free My TV and remain the property of their owners.

## Disclaimer

Developer mode and sideloading are at your own risk. The software is provided as is, without warranty, under the MIT
licence.

## Privacy

Do not post your monitor's serial number, MAC addresses, device IDs or Netflix ESN in issues or pull requests.

## The device

| | |
|---|---|
| Model | LS24AM506NNXZA (Samsung M5, 24", 2021, US) |
| Platform | `20_KANTSU2_FHD_MNT` (Samsung's 2020 platform), **Tizen 5.5**, 32-bit ARM (`armv7`) |
| Developer channel | SDB on port 26101; `sdbd 2.2.31`; root disabled; files can be pushed and pulled |
| Install folder | `/home/owner/share/tmp/sdk_tools` |
| Inputs | HDMI 1 (ARC) and HDMI 2; no TV tuner |
| Network | DHCP. Last seen at `<monitor-ip>`; the Mac at `<mac-ip>`. Check both if anything stops connecting. |

Read-only facts about the monitor, without pairing anything:

```bash
curl -s http://<monitor-ip>:8001/api/v2/ | python3 -m json.tool   # model, OS, developerMode, developerIP
```

`developerMode: "1"` and `developerIP` equal to the Mac's address mean the install channel is open.

## One-time setup

### On the monitor
1. **Developer Mode.** Home → Apps → highlight the settings gear → type `1 2 3 4 5` (don't press Done). On this
   monitor the physical remote with a low battery didn't work; the **SmartThings** phone app's virtual remote did.
   Turn Developer mode on, set **Host PC IP** to the Mac's address, then unplug the monitor for 10 seconds.
2. **Start into the app (optional).** Settings → General → Smart Features → **Autorun Last App**: the monitor comes back
   to Free My TV after power off/on if it was the last app open.

The monitor's network remote API (port 8002, `tools/m5/remote.mjs`) connected but never showed its *Allow* prompt, even
with Settings → General → External Device Manager → Device Connection Manager → Access Notification turned on. It
isn't needed for anything; it's kept in case it works later.

### On the Mac (Apple Silicon, no Rosetta)
1. `brew install openjdk@17`
2. Samsung's CLI from `download.tizen.org/sdk/tizenstudio/official` (`pkg_list_macos-64`, check each SHA256): unzip the
   `data/` of `new-common-cli`, `certificate-generator`, `sdk-utils` and `sdk-utils-core` into `~/tizen-studio`, then
   `~/tizen-studio/sdk.info`:
   ```
   TIZEN_SDK_INSTALLED_PATH=/Users/<you>/tizen-studio
   TIZEN_SDK_DATA_PATH=/Users/<you>/tizen-studio-data
   JDK_PATH=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk
   ```
3. Certificate (a plain Tizen one is enough on this Tizen 5.5 monitor): run `zsh tools/m5/make-cert.sh` in your own
   terminal. It asks for a password twice and creates the `freemytv` signing profile.
   **Keep `~/tizen-studio-data/keystore/author/freemytv.p12` and its password.** Updates must be signed with the same
   certificate, or the monitor refuses them (uninstall first in that case).

## Build and install

```bash
python3 tizen/build.py --generic --sign freemytv   # must end: Built FreeMyTV-tizen.wgt (..., signed with "freemytv")
python3 tizen/install.py <monitor-ip>             # must end: Installed and open on the TV.
python3 tizen/install.py <monitor-ip> --uninstall # remove it
```

`--generic` means no `config.properties`: no TMDB key (so no movie/show picks) and the city from the network. That's
the intended setup here. With a TMDB key, the Explore/Movies/Shows tabs and the "For You" title come back on their own.

Note for AI assistants: commands that reach the monitor over the LAN need the shell sandbox off (inside it, macOS
answers `No route to host`).

## What this branch changes

All in `web/` (the Samsung/LG web app), plus `tools/webapp.py` (packs `web/wallpapers` and `web/typefaces` too).

| Feature | What it does | Where |
|---|---|---|
| Focus ring | A 4px blue ring and glow on whatever has focus; amber while moving an app | end of `home.css` |
| Light/dark button | Sun/moon round button at the top right; Home Settings → Theme still has Automatic | `renderTop`, `toggleTheme` in `home.js` |
| Top buttons | Built from a list (`topActions`): Live TV only when there's a tuner | `renderTop`, `activate` |
| Monitor inputs | On a Samsung Smart Monitor (model `LS…` or platform `…_MNT`): no Live TV, only HDMI 1 (tagged **ARC**) and HDMI 2 | `samsungMonitor`, `samsungInputs` in `tv.js` |
| Long press on an app | Hold OK about 0.6 s: Open / Move / Remove from shelf / Undo last change / Cancel; in All Apps, Add to shelf. Move mode: ← → (↑ ↓ in List), OK or Back to drop | `openMenu`, `showMenu`, `startMoving`, key handlers |
| Undo, recently removed | Every shelf change this session can be undone; removed apps show first in All Apps with a tag | `saveShelf`, `undoShelf`, `Prefs.recent` |
| Leave prompt | Back on Home asks Stay here / Open Samsung Home | `askLeave` |
| Weather location | From the network's public IP (geojs.io), checked every 3 h and when the app comes back; or the time zone | `refreshGeo`, `here()` in `data.js`; Home Settings → Weather location |
| No tabs without TMDB | Explore/Movies/Shows hidden, the title becomes Good morning/afternoon/evening | `TABS`, `greeting` |
| Wallpapers | 15 photos (from CleanFrame, Unsplash License), one for the day look and one for the night look, cross-fading. Gallery from Home Settings or the drawer's Wallpaper key | `WALLS`, `applyWall`, `openWalls`, `web/wallpapers/` |
| Text colour per photo | Each photo's brightness and busyness behind the clock (measured once) picks white or dark text and the halo | `WALLS` columns 4-5, `ink-light`/`ink-busy` in CSS |
| Frosted glass | The shelf, drawer keys and cards show a pre-blurred copy of the photo, lined up with it | `frost()`, `web/wallpapers/<id>-blur.jpg` |
| Rotation | Never / each time Home opens / every 5, 15, 60 min of Home on screen | `checkRotation`, `rotateWall` |
| Dock or List | Apps along the bottom, or a column on the right with icon and name | `renderList`, `move()` |
| Font | Inter, Manrope, Geist or Newsreader (all OFL) | `applyFont`, `web/typefaces/` |
| Screensaver | Its own Home Settings page (and drawer key): start after, wallpaper on/off, photos, change every (10 s–1 h), clock, seconds, date, weather now, hourly forecast, crypto, photo name, position (moving round the corners against burn-in), preview. One glass card | `saverRows`, `fillSaverCard`, `showSaver` |

Settings are kept in the monitor's local storage (`fmtv.prefs`), so they survive app updates but not an uninstall.

### Design decisions worth keeping
- **Day wallpapers are shown as they are.** A light fade over the photo was tried and rejected: it looked washed out
  and didn't switch to dark smoothly. Only the night look darkens the photo, through one veil whose colour fades.
- **The focused item is always a white plate with dark text and icon**, in both looks (round buttons, drawer keys, tabs,
  List rows). Frosted elements need `!important` for that, because the frost is an inline background.
- **Old browser:** the monitor runs a Chromium from around 2018. Keep the JavaScript ES5 (no `let`, `const`, arrow
  functions or template strings) and the CSS free of variables, grid and `backdrop-filter`. Blur is done ahead of time.
- Home Settings → Shelf is two rows from the end of the list on purpose: Back from the shelf editor relies on it.

## Testing without the monitor

```bash
tools/m5/preview.sh home.png                 # the home screen
tools/m5/preview.sh drawer.png "40"          # after Down
tools/m5/preview.sh menu.png "39,L13"        # Right, then hold OK
```

It builds the browser preview and screenshots it in headless Chrome after the given key presses (37 ← 38 ↑ 39 → 40 ↓,
13 OK, 8 Back, `L` = held). The preview shows a TV's inputs (Live TV, HDMI 1-4), not the monitor's. For the monitor
input logic, there's no device-free check beyond reading `samsungInputs`. Look at the result on the monitor too: the
preview can't show how the remote feels or how the monitor's browser draws.

## Wallpaper assets

`web/wallpapers/<id>.jpg` (1600×900), `<id>-thumb.jpg` (400×225), `<id>-blur.jpg` (480×270, for the glass), credits in
`SOURCES.json`. `tools/m5/wallpaper-gen.sh` remakes the blurred copies and prints each photo's brightness and busyness
for `WALLS`. Its header says how to add a photo.

## Open ideas

- **Home button opens Free My TV.** CleanFrame does this on a Tizen 9 Frame TV with an undocumented native helper
  (`scripts/native-home` in github.com/nthnclrk/CleanFrame). Untested on Tizen 5.5. Only with a read-only check first
  and a tested way to restore Samsung's Home.
- **City search** for the weather, if the network location is ever wrong (VPN, ISP hub city).
- A smaller screensaver card size, or the forecast on its own line.
- Samsung's own screen protection can still start on its own; it's set on the monitor, not in the app.

## Credits

Free My TV (MIT) by simbasjungles. Wallpapers and the font files come from CleanFrame (MIT code) by Nathan Clark. The
photos are under the Unsplash License, by the photographers in `web/wallpapers/SOURCES.json`. Manrope, Geist and
Newsreader are under the SIL Open Font License (texts in `web/typefaces/`). Weather: Open-Meteo. Location: geojs.io.
