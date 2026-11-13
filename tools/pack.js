'use strict';
// Đóng gói src/ lại thành file game chạy được.
// Dùng: node tools/pack.js [--src src] [--out docs/index.html]
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { MIME_BY_EXT, TEMPLATE_MARK, DC_MARK, ASSET_RE, parseArgs, encodeTemplate } = require('./common');

const { opts } = parseArgs(process.argv.slice(2));
const root = path.resolve(__dirname, '..');
const srcDir = path.resolve(opts.src || path.join(root, 'src'));
const outPath = path.resolve(opts.out || path.join(root, 'docs', 'index.html'));

const read = (f) => fs.readFileSync(path.join(srcDir, f), 'utf8');
const game = read('game.js'), tpl = read('template.html'), frame = read('frame.html');

// Kiểm tra trước khi đóng gói
try { new vm.Script(game, { filename: 'game.js' }); }
catch (e) { console.error('game.js có lỗi cú pháp, chưa đóng gói:\n' + e.stack.split('\n').slice(0, 5).join('\n')); process.exit(1); }
if (/<\/script/i.test(game)) { console.error('game.js chứa "</script", sẽ làm vỡ trang. Hãy viết "<\\/script" thay thế.'); process.exit(1); }
for (const [mark, text, file] of [[DC_MARK, tpl, 'template.html'], [TEMPLATE_MARK, frame, 'frame.html']])
  if (text.split(mark).length !== 2) { console.error(`${file} phải chứa đúng một ${mark}.`); process.exit(1); }

const missing = [];
const code = game.replace(ASSET_RE, (m, name) => {
  const p = path.join(srcDir, 'assets', name);
  const mime = MIME_BY_EXT[path.extname(name).slice(1).toLowerCase()];
  if (!fs.existsSync(p) || !mime) { missing.push(name); return m; }
  return `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
});
if (missing.length) { console.error('Thiếu file hoặc loại file không hỗ trợ trong assets/: ' + missing.join(', ')); process.exit(1); }

// Biểu tượng tab: src/icon.svg được nhúng vào chỗ @@ICON@@ trong template.html
const iconPath = path.join(srcDir, 'icon.svg');
const icon = fs.existsSync(iconPath)
  ? 'data:image/svg+xml,' + encodeURIComponent(fs.readFileSync(iconPath, 'utf8').replace(/>\s+</g, '><').trim())
  : '';
const template = tpl.replace(DC_MARK, () => code).split('@@ICON@@').join(icon);
const out = frame.split('@@ICON@@').join(icon).replace(TEMPLATE_MARK, () => encodeTemplate(template));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log(`Đã đóng gói: ${outPath} (${(out.length / 1048576).toFixed(1)} MB)`);
