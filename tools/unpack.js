'use strict';
// Tách file bundle thành các file nhỏ để sửa:
//   src/game.js        logic game (file chính để sửa)
//   src/template.html  phần HTML/CSS bao quanh
//   src/assets/*       nhạc, âm thanh, ảnh (sửa/thay trực tiếp được)
//   src/frame.html     vỏ bundle (font, React...), không sửa
// Dùng: node tools/unpack.js [bundle.html] [--out src] [--force]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { EXT_BY_MIME, TEMPLATE_MARK, DC_MARK, parseArgs } = require('./common');

const { opts, rest } = parseArgs(process.argv.slice(2));
const root = path.resolve(__dirname, '..');
const bundlePath = path.resolve(rest[0] || path.join(root, 'DrumStar-Sweep-v2-phone.html'));
const outDir = path.resolve(opts.out || path.join(root, 'src'));

if (fs.existsSync(outDir) && fs.readdirSync(outDir).length && !opts.force) {
  console.error(`Thư mục ${outDir} đã có file. Chạy lại với --force nếu muốn ghi đè (sẽ MẤT các chỗ đã sửa trong đó).`);
  process.exit(1);
}

const html = fs.readFileSync(bundlePath, 'utf8');
const open = '<script type="__bundler/template">';
const a = html.indexOf(open);
if (a < 0) throw new Error('Không thấy khối __bundler/template, đây không phải file bundle.');
const bodyStart = a + open.length;
const bodyEnd = html.indexOf('</script>', bodyStart);
const raw = html.slice(bodyStart, bodyEnd);
const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
const template = JSON.parse(raw.slice(lead.length, raw.length - trail.length));

const frame = html.slice(0, bodyStart) + lead + TEMPLATE_MARK + trail + html.slice(bodyEnd);

// Tách code game khỏi template
const tag = template.match(/<script type="text\/x-dc"[^>]*>/);
if (!tag) throw new Error('Không thấy thẻ <script type="text/x-dc"> trong template.');
const codeStart = tag.index + tag[0].length;
const codeEnd = template.indexOf('</script>', codeStart);
let code = template.slice(codeStart, codeEnd);
const tpl = template.slice(0, codeStart) + DC_MARK + template.slice(codeEnd);

// Tách nhạc/ảnh nhúng dạng base64 ra file
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
function nameFor(ctx) {
  let m;
  if ((m = ctx.match(/this\.(\w+) = new Audio\('$/))) return kebab(m[1]);
  if ((m = ctx.match(/this\.(\w+)Loading = true;\s*fetch\('$/))) return kebab(m[1]);
  if ((m = ctx.match(/\b(\w+): '$/))) return 'track-' + m[1];
  if ((m = ctx.match(/const (\w+)Style = \{[^{}]{0,160}$/))) return kebab(m[1]) + '-drum';
  if (/isYellow \? 'url\($/.test(ctx)) return 'note-yellow';
  if (/isBlue \? 'url\($/.test(ctx)) return 'note-blue';
  if (/\)' : 'url\($/.test(ctx)) return 'note-red';
  return null;
}

fs.mkdirSync(path.join(outDir, 'assets'), { recursive: true });
const byHash = new Map(), usedNames = new Set(), report = [];
code = code.replace(/data:([a-z]+\/[\w.+-]+);base64,([A-Za-z0-9+\/=]*)/g, (full, mime, b64, offset, whole) => {
  const ext = EXT_BY_MIME[mime];
  if (!ext) throw new Error('Chưa hỗ trợ loại file nhúng: ' + mime);
  const bytes = Buffer.from(b64, 'base64');
  if (bytes.toString('base64') !== b64) throw new Error('Chuỗi base64 không khớp khi mã hoá lại, dừng để khỏi làm hỏng dữ liệu.');
  const hash = crypto.createHash('sha1').update(bytes).digest('hex').slice(0, 8);
  if (!byHash.has(hash)) {
    const base = nameFor(whole.slice(Math.max(0, offset - 200), offset)) || `${mime.split('/')[0]}-${hash}`;
    let name = `${base}.${ext}`, n = 2;
    while (usedNames.has(name)) name = `${base}-${n++}.${ext}`;
    usedNames.add(name);
    byHash.set(hash, name);
    fs.writeFileSync(path.join(outDir, 'assets', name), bytes);
    report.push(`${name} (${(bytes.length / 1024).toFixed(0)} KB)`);
  }
  return `@@ASSET:${byHash.get(hash)}@@`;
});

if (/;base64,[A-Za-z0-9+\/=]{1000,}/.test(tpl)) console.warn('Cảnh báo: template.html vẫn còn dữ liệu base64 lớn chưa được tách.');
fs.writeFileSync(path.join(outDir, 'game.js'), code);
fs.writeFileSync(path.join(outDir, 'template.html'), tpl);
fs.writeFileSync(path.join(outDir, 'frame.html'), frame);
console.log(`Đã tách ${path.basename(bundlePath)} vào ${outDir}`);
console.log(`  game.js ${(code.length / 1024).toFixed(0)} KB, template.html ${(tpl.length / 1024).toFixed(0)} KB, frame.html ${(frame.length / 1024).toFixed(0)} KB`);
console.log('  assets:\n    ' + report.join('\n    '));
