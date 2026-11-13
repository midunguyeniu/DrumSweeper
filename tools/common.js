'use strict';
// Dùng chung cho unpack.js và pack.js.
const MIME_BY_EXT = { ogg: 'audio/ogg', wav: 'audio/wav', mp3: 'audio/mpeg', png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
const EXT_BY_MIME = Object.fromEntries(Object.entries(MIME_BY_EXT).map(([e, m]) => [m, e]));

const TEMPLATE_MARK = '@@TEMPLATE@@';   // trong frame.html: chỗ đặt template
const DC_MARK = '@@DC_SCRIPT@@';         // trong template.html: chỗ đặt code game
const ASSET_RE = /@@ASSET:([\w.-]+)@@/g; // trong game.js: chỗ đặt file nhạc/ảnh

// Đọc tham số dạng --key value hoặc --flag
function parseArgs(argv) {
  const opts = {}, rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      if (argv[i + 1] && !argv[i + 1].startsWith('--')) opts[k] = argv[++i]; else opts[k] = true;
    } else rest.push(a);
  }
  return { opts, rest };
}

// Chuỗi template được lưu trong bundle dưới dạng JSON; mọi "</" đều viết thành "</" (để không đóng nhầm thẻ script).
function encodeTemplate(str) {
  return JSON.stringify(str).replace(/<\//g, '<\\u002F');
}

module.exports = { MIME_BY_EXT, EXT_BY_MIME, TEMPLATE_MARK, DC_MARK, ASSET_RE, parseArgs, encodeTemplate };
