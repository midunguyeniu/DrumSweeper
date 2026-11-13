'use strict';
// Nhập bài từ một bảng Google Sheets vào docs/freeplay/ (nhạc .ogg + level .json + index.json).
//
// Bảng có các cột: số thứ tự | tên bài | nghệ sĩ | link level design (JSON) | link audio (mp3/ogg)
// Dùng:  node tools/import-songs.js <link bảng hoặc file .csv> --prefix fp [--lanes 1:blue,2:red,3:yellow] [--only 1,2]
//   --prefix  tiền tố id bài: id = prefix + số thứ tự (ví dụ fp12, s3d5)
//   --lanes   làn nào của file level là trống nào (mặc định 1:blue,2:red,3:yellow; các làn khác bỏ, như làn phách 4/5)
//   --only    chỉ nhập các số thứ tự này
// Cần ffmpeg + ffprobe trong PATH.
//
// Quy ước (đã thống nhất với chủ dự án):
// - Thời gian (giây) đổi sang step 16 (1 ô nhịp = 16 step) theo (time - audioOffset) / (60/bpm) * 4. Lệch lưới dưới 0,05 step thì làm tròn
//   về lưới, lệch hơn thì giữ số lẻ (không ép sai nhịp).
// - Bài vào sớm: nếu ô nhịp đầu không có nốt nào (nốt đầu tiên từ step 16 trở đi) thì cắt bỏ ô nhịp đầu của nhạc, nốt dời -16 step.
//   Nếu có nốt trong ô nhịp đầu thì giữ nguyên.
// - Nhạc nén .ogg 64 kbps, cắt thêm audioOffset để nhạc khớp lưới nốt.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { parseArgs } = require('./common');

const { opts, rest } = parseArgs(process.argv.slice(2));
const src = rest && rest[0];
if (!src || !opts.prefix) { console.error('Dùng: node tools/import-songs.js <link bảng | file .csv> --prefix fp [--lanes 1:blue,2:red,3:yellow] [--only 1,2]'); process.exit(1); }
const prefix = String(opts.prefix);
const laneMap = {};
String(opts.lanes || '1:blue,2:red,3:yellow').split(',').forEach((p) => { const [l, c] = p.split(':'); laneMap[+l] = c; });
const only = opts.only ? String(opts.only).split(',').map(Number) : null;

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs', 'freeplay');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-import-'));

function parseCsv(t) {
  const rows = []; let r = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { r.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; r.push(f); rows.push(r); r = []; f = ''; }
    else f += c;
  }
  if (f || r.length) { r.push(f); rows.push(r); }
  return rows;
}
const encodeUrl = (u) => u.replace(/ /g, '%20');
async function download(url, file) {
  const res = await fetch(encodeUrl(url));
  if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + url);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}
const probeDuration = (file) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());

(async () => {
  let csv;
  if (/^https?:/.test(src)) {
    const m = /spreadsheets\/d\/([\w-]+)/.exec(src), g = /gid=(\d+)/.exec(src);
    if (!m) throw new Error('Không nhận ra link Google Sheets');
    const res = await fetch(`https://docs.google.com/spreadsheets/d/${m[1]}/export?format=csv${g ? '&gid=' + g[1] : ''}`);
    if (!res.ok) throw new Error('Không tải được bảng (HTTP ' + res.status + '). Bảng cần để chế độ "ai có link cũng xem được".');
    csv = await res.text();
  } else csv = fs.readFileSync(src, 'utf8');
  const rows = parseCsv(csv).slice(1).filter((r) => r[0] && /^\d+$/.test(r[0].trim()));

  fs.mkdirSync(outDir, { recursive: true });
  const indexPath = path.join(outDir, 'index.json');
  const index = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, 'utf8')) : { songs: [] };
  const report = [];

  for (const r of rows) {
    const num = +r[0], title = r[1].trim(), artist = (r[2] || '').trim(), jsonUrl = r[3].trim(), audioUrl = r[4].trim();
    if (only && !only.includes(num)) continue;
    const id = prefix + num;
    const ext = (audioUrl.split('?')[0].match(/\.(\w+)$/) || [])[1] || 'mp3';
    const jf = path.join(tmp, id + '.json'), af = path.join(tmp, id + '.' + ext);
    await download(jsonUrl, jf); await download(audioUrl, af);

    const j = JSON.parse(fs.readFileSync(jf, 'utf8'));
    const bpm = j.songMeta.bpm, off = j.songMeta.audioOffset || 0, spb = 60 / bpm;
    const by = { red: [], blue: [], yellow: [] }, seen = new Set();
    for (const n of j.notes) {
      const color = laneMap[n.lane];
      if (!color || (n.metas || []).some((m) => m.key === 'fake')) continue;
      let st = (n.time - off) / spb * 4;
      st = Math.abs(st - Math.round(st)) < 0.05 ? Math.round(st) : Math.round(st * 100) / 100;
      const k = color + ':' + st;
      if (seen.has(k)) continue;
      seen.add(k); by[color].push(st);
    }
    const all = [].concat(by.red, by.blue, by.yellow);
    if (!all.length) throw new Error(id + ': không có nốt nào');
    const minStep = Math.min(...all);
    const cutBars = opts['cut-bars'] != null ? +opts['cut-bars'] : (minStep >= 16 ? 1 : 0);
    const shift = cutBars * 16;
    for (const c in by) by[c] = by[c].map((s) => Math.round((s - shift) * 100) / 100).sort((a, b) => a - b);

    const cutSec = Math.max(0, cutBars * 240 / bpm + off);
    const of = path.join(outDir, id + '.ogg');
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', cutSec.toFixed(6), '-i', af, '-ar', '44100', '-ac', '2', '-c:a', 'libvorbis', '-b:a', '64k', of]);
    const dur = probeDuration(of);
    const lastStep = Math.max(...[].concat(by.red, by.blue, by.yellow));
    const bars = Math.max(Math.ceil(dur * bpm / 240 - 1e-9), Math.floor(lastStep / 16) + 1);
    const nps = all.length / dur;
    const stars = Math.max(0.5, Math.min(10, Math.round((0.5 + nps * 1.6) * 2) / 2));
    const drums = by.yellow.length ? 3 : 2;
    fs.writeFileSync(path.join(outDir, id + '.json'), JSON.stringify({ bpm, bars, red: by.red, blue: by.blue, yellow: by.yellow }));

    const entry = { id, num, title, artist, bpm, stars, bars, drums, notes: all.length };
    const i = index.songs.findIndex((s) => s.id === id);
    if (i >= 0) index.songs[i] = entry; else index.songs.push(entry);
    const off16 = all.filter((s) => Math.abs(s - Math.round(s)) > 0.001).length;
    report.push([id, title.slice(0, 26), bpm, 'nốt ' + all.length, 'lệch lưới ' + off16, 'cắt ' + cutBars + ' ô nhịp (' + cutSec.toFixed(2) + 's)', 'bars ' + bars, stars + '★', drums + ' trống', (fs.statSync(of).size / 1024).toFixed(0) + ' KB'].join(' | '));
  }
  index.songs.sort((a, b) => (a.id.replace(/\d+$/, '') === b.id.replace(/\d+$/, '') ? a.num - b.num : a.id.localeCompare(b.id)));
  fs.writeFileSync(indexPath, JSON.stringify(index));
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(report.join('\n'));
  console.log('Đã ghi ' + report.length + ' bài vào ' + outDir);
})().catch((e) => { console.error(e.message || e); process.exit(1); });
