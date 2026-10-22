// Sends remote-control key presses to the Samsung monitor over its network remote API (port 8002).
// Usage: node tools/m5/remote.mjs KEY_1 KEY_2 ...
// The first run shows an "Allow" prompt on the monitor; the token it grants is saved in .samsung-token.
import fs from 'node:fs';
import path from 'node:path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // the monitor uses a self-signed certificate

const IP = process.env.MONITOR_IP || '<monitor-ip>';
const TOKEN_FILE = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', '.samsung-token');
const keys = process.argv.slice(2);
const name = Buffer.from('monitor-os').toString('base64');
let token = '';
try { token = fs.readFileSync(TOKEN_FILE, 'utf8').trim(); } catch {}

const url = `wss://${IP}:8002/api/v2/channels/samsung.remote.control?name=${name}` + (token ? `&token=${token}` : '');
const ws = new WebSocket(url);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const giveUp = setTimeout(() => { console.log('No answer in 90 s (prompt not accepted?)'); process.exit(1); }, 90000);

ws.onmessage = async ev => {
  const msg = JSON.parse(ev.data);
  console.log('monitor says:', msg.event);
  if (msg.event === 'ms.channel.unauthorized') { console.log('Denied on the monitor.'); process.exit(1); }
  if (msg.event !== 'ms.channel.connect') return;
  clearTimeout(giveUp);
  if (msg.data?.token) { fs.writeFileSync(TOKEN_FILE, msg.data.token); console.log('Paired; token saved.'); }
  await sleep(3000);
  for (const key of keys) {
    ws.send(JSON.stringify({ method: 'ms.remote.control',
      params: { Cmd: 'Click', DataOfCmd: key, Option: 'false', TypeOfRemote: 'SendRemoteKey' } }));
    console.log('sent', key);
    await sleep(700);
  }
  await sleep(500);
  ws.close();
  process.exit(0);
};
ws.onopen = () => console.log('Socket open; waiting for the monitor to allow it.');
ws.onclose = e => { console.log('Socket closed:', e.code, e.reason); process.exit(1); };
ws.onerror = e => { console.log('Connection error:', e.message || e.error?.message || e); process.exit(1); };
console.log('Connecting... accept the prompt on the monitor if it appears.');
