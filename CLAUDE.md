# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

(Quy tắc chung về cách làm việc với chủ dự án nằm ở `D:\Project\CLAUDE.md`, không lặp lại ở đây.)

## Thư mục này là gì

Sản phẩm chính của chủ dự án (làm từ tháng 4 trên tài khoản Claude của họ, toàn quyền sử dụng): một mini-game gõ trống dạng "sweep" (thanh quét chạy ngang qua khuông nhạc, người chơi gõ trống đỏ/xanh/vàng đúng nhịp). Không có git, không có build, không có test, không có package manager.

Hai file:
- `DrumStar-Sweep-v2-phone.html` (~19 MB): **file chính, chỗ để sửa.** Là bản gốc tải về từ `storage.googleapis.com/pub-taptune.firebasestorage.app/musicverse-2/lessons/demo/DrumStar-Sweep-v2-phone.html` ngày 2026-11-13. Đã kiểm chứng: phục vụ qua http://127.0.0.1 thì chạy được, không lỗi console, bấm Play ra màn "Tap to Start".
- `DrumStar-Sweep-v2-phone.saved-snapshot.html` (~25 MB): bản "Save Page As" cũ, **không chạy được** (3 script `blob:` chết, chỉ còn màn danh sách tĩnh). Chỉ giữ để tham khảo/dự phòng, không sửa trên đó.

Chạy thử: khung thiết kế điện thoại 420x910. Phím (từ 2026-11-13): `F` = trống xanh, `Space` = trống đỏ, `J` = trống vàng; không còn D/G/mũi tên. Phím hiển thị dạng phím bàn phím 3D (class `.keycap` trong `template.html`, vẽ bằng CSS; phím Space là ký hiệu ␣ bằng SVG); khoảng cách hàng phím ở `keycapRowStyle` trong `game.js` (31/43 px cho 3 trống để thẳng hàng với trống). Chữ phím chỉ hiện trên máy có chuột (class `kbd-hint`, ẩn bằng media query `(hover: none) and (pointer: coarse)`), điện thoại/máy tính bảng cảm ứng thì ẩn. Môi trường máy này: không có Python (dùng Node để phục vụ file), trình duyệt Playwright chặn `file://` nên phải phục vụ qua http, cổng 8765 đang bị app khác chiếm. Chưa kiểm chứng: chấm điểm, nhạc, các bài khác, chế độ Learn, tab 3-Drums.

## Cấu trúc file chính (quan trọng khi sửa)

File là một "bundle" tự đóng gói, không phải HTML thường:

- Phần đầu là bộ giải nén (script chạy lúc tải trang, khoảng dòng 34–200).
- `<script type="__bundler/manifest">`: các tài nguyên (font, thư viện) mã hoá base64, có thể nén gzip, khoá theo UUID.
- `<script type="__bundler/ext_resources">`: ánh xạ URL (React 18.3.1, react-dom từ unpkg...) sang UUID trong manifest.
- `<script type="__bundler/template">`: **một chuỗi JSON** chứa toàn bộ HTML của game, trong đó có thẻ `<script type="text/x-dc" data-dc-script>` với `class Component extends DCLogic` (logic game viết theo runtime "dc": `renderVals()`, `setState`). Vì là chuỗi JSON nên dấu xuống dòng, nháy kép và `</script>` đều bị escape (`\n`, `\"`, `\u002F`). **Không sửa tay file bundle này**; dùng bộ công cụ ở mục "Quy trình sửa" bên dưới.

Cảnh báo khi đọc: file chỉ ~207 dòng nhưng có dòng dài hàng MB (manifest, template chứa nhạc nền `.ogg` và mẫu âm `.wav` dạng base64). Dùng `cut -c1-200`, đọc theo offset/limit hoặc trích bằng script; đừng đọc cả file hay in nguyên dòng.

## Quy trình sửa (nguồn thật nằm ở `src/`)

Hai công cụ Node trong `tools/` (không cần cài gì thêm):

- `node tools/unpack.js [bundle.html] [--out src] [--force]`: tách bundle thành `src/`. Chỉ chạy khi muốn bắt đầu lại từ bundle; nếu `src/` đã có file thì từ chối chạy, `--force` sẽ ghi đè và mất các chỗ đã sửa.
- `node tools/pack.js [--src src] [--out docs/index.html]`: đóng gói `src/` thành file chạy được ở `docs/index.html`. Trước khi đóng gói nó kiểm cú pháp `game.js`, kiểm `</script`, kiểm nhạc/ảnh còn đủ.

Nội dung `src/`:
- `game.js`: logic game (class `Component`, ~56 KB). **Sửa ở đây.**
- `template.html`: HTML/CSS bao quanh, chứa `@@DC_SCRIPT@@` là chỗ gắn `game.js`.
- `assets/`: nhạc (`track-<id bài>.ogg`, `menu-click.ogg`), tiếng trống (`red-kick.wav`, `blue-drum.wav`, `bar-click*.wav`, `rainbow.wav`), ảnh (`red/blue/yellow-drum.png`, `note-*.png`). Trong `game.js` chúng hiện là `@@ASSET:tên-file@@`. **Thay nhạc/ảnh bằng cách ghi đè file cùng tên** (giữ đúng đuôi `.ogg`/`.wav`/`.png`); thêm file mới thì viết `@@ASSET:tên@@` đúng chỗ trong `game.js`.
- `frame.html`: vỏ bundle (font, React, bộ giải nén), chứa `@@TEMPLATE@@`. Không sửa phần bộ giải nén và manifest. Phần màn hình chờ (logo + tên game + thanh loading, mốc % set bằng `setProgress`) cũng nằm ở đây và là chỗ sửa được; màn chờ được giữ lại sau khi game thay trang, tự tắt sau khi game vẽ xong (chốt chặn 6 giây).
- `icon.svg`: icon game. `pack.js` nhúng nó vào chỗ `@@ICON@@` trong `frame.html` (logo màn chờ) và `template.html` (biểu tượng tab).

Đã kiểm chứng (2026-11-13): unpack rồi pack ra file **giống từng byte** với bản gốc; sửa thử một tên bài trong `game.js`, đóng gói, mở trong trình duyệt thì tên mới hiện đúng, không lỗi console. Chưa kiểm chứng: đồng bộ nhạc sau khi đổi file nhạc, và chơi trọn một bài sau khi sửa logic.

Không được: sửa `DrumStar-Sweep-v2-phone.html` ở thư mục gốc (đó là bản gốc tham chiếu, `docs/index.html` mới là bản ra từ `src/`), và đừng đưa `</script` vào `game.js`.

## Khung báo lỗi của bundle

`frame.html` có khung đỏ `[bundle] ...` hiện mọi lỗi JavaScript của trang. Mặc định **ẩn** (trình duyệt trong Zalo/Facebook chèn mã gây lỗi `zaloJSV2`... không liên quan game); thêm `?debug` vào cuối link để hiện khi cần kiểm tra trên điện thoại. Lỗi vẫn luôn có trong console. Đã kiểm 2026-11-13 bằng giả lập: không `?debug` thì ẩn, có `?debug` thì hiện.

## Cẩn thận khi thêm sự kiện trong template

Bộ chạy "dc" chỉ gắn các sự kiện trong `EVENT_MAP`: `onclick, onchange, oninput, onsubmit, onkeydown, onkeyup, onkeypress, onmousedown, onmouseup, onmouseenter, onmouseleave, onfocus, onblur, ondoubleclick, oncontextmenu`. Mọi `on...` khác (như `onpointerdown`, `ontouchstart`) **bị bỏ qua âm thầm, không báo lỗi**. Đó là lý do trước đây chạm/nhấp vào trống không ăn (chỉ phím F/D/G chạy), cả ở bản gốc. Đã sửa (2026-11-13): nút trống có `data-drum="blue|red|yellow"` và `game.js` bắt `pointerdown` ở cấp `window` (`this.drumHandler`). Cần sự kiện ngoài danh sách trên thì làm theo cách đó, đừng viết `onpointerdown="{{ ... }}"` trong template. Hàm `tapBlue/tapRed/tapYellow` trong `renderVals()` giờ không còn được gọi.

## Trống lớn ở bài 2 trống

Bài 2 trống dùng trống to: mỗi trống rộng `min(72%, 32dvh)` (hằng `DRUM2_D` trong `renderVals()` của `game.js`), hai trống đứng sát nhau, phần mép ngoài tràn ra cạnh màn hình (margin âm), chạm vẫn ăn vì nút kéo dài ra ngoài. Muốn nhỏ lại thì đổi `DRUM2_D` (ví dụ `min(60%, 28dvh)`). Hệ quả: khuông nhạc bị ép thấp hơn nên co nhiều hơn (tỷ lệ ~0,79 ở màn 844, ~0,61 ở 730, ~0,51 ở 664; giới hạn dưới 0,4). Màn `Tap to Start` (`armedOverlayStyle`) và hàng phím (`KEY_PAD2`) nâng/căn theo cùng `DRUM2_D`. Trên máy cảm ứng hàng phím bị `display:none` nên `Tap to Start` nằm sát trên trống.

## Bố cục 3 trống (kiểu bộ trống)

Bài 3 trống (khối `if (drums3)` trong `renderVals()` của `game.js`) xếp theo hình tham chiếu của chủ dự án: trống đỏ to ở giữa (đường kính `min(70% bề ngang, 31% chiều cao màn)`, đáy tràn ra ngoài ~10%), trống xanh (trái) và vàng (phải) bằng 0,6 lần, nằm cao hơn, **đè lên trước** mép trống đỏ và tràn ra cạnh màn hình. Các trống dùng `position:absolute` tính bằng px từ kích thước màn (đọc `window.innerWidth/innerHeight`, render lại khi `resize`); các hệ số 0,70 / 0,31 / 0,6 / 0,59 / 0,32 chỉnh được tại đó. Vì các nút vuông chồng lên nhau, `drumHandler` chọn trống theo **hình tròn** (duyệt các phần tử dưới ngón tay từ trên xuống, lấy trống đầu tiên có vòng tròn chứa điểm chạm). Ảnh trống xanh/đỏ chừa lề rộng hơn đĩa vàng (vành chỉ chiếm 88% bề ngang ảnh, đĩa vàng 99%; đo bằng canvas trên `src/assets/*.png`), nên khung trống xanh được phóng thêm 0,99/0,884 (`Dsb`) để vành trông bằng đĩa vàng. Hàng phím và `Tap to Start` (`kit.keyGap`, `kit.rowH`) căn theo tâm từng trống. Đã kiểm 2026-11-13 bằng giả lập: chọn đúng trống ở tâm và ở vùng chồng, chạm thật ăn hit; chưa kiểm trống xanh bằng chạm thật.

## Thang thời gian của khuông nhạc

Một hàng khuông = 2 ô nhịp = 32 step (`ROW`). Vạch quét chỉ đi đến step `ROW - LEAD` = 30,2 (`LEAD = 1,8`) vì khuông chuyển sang hàng kế tiếp sớm. Trước đây bước 0 ở 5% và bước 32 ở 98% nên 7% cuối khuông là vùng chết. Nay `SPAN = (TRACK_END - 5) * ROW / (ROW - LEAD)` với `TRACK_END = 98.5` (trong `buildStave`): đường quét tới đúng 98,5% bề rộng, nốt/nhãn nhịp/lưới/vạch quét đều dùng `SPAN`, khoảng cách giữa các nhịp rộng hơn ~6,5% so với trước. Nốt xa nhất trong dữ liệu là step 14 của ô nhịp (step 30 của hàng) nên không bao giờ bị cắt. Đổi `TRACK_END` nếu muốn chừa lề khác.

## Khóa cuộn/cử chỉ ở màn chơi

Bản thân trang không cuộn (chỉ danh sách bài cuộn trong khung riêng). Khi đang mở một bài (`songId != null`: chơi, tạm dừng, kết quả), `syncScrollLock()` đặt `touch-action:none` + `overflow:hidden` lên `html/body`, và `touchMoveHandler`/`wheelHandler` (non-passive, trong `componentDidMount`) `preventDefault` mọi kéo/cuộn; `overscroll-behavior:none` luôn bật. Mục đích: chặn kéo nảy (iOS), kéo-để-tải-lại (Android Chrome), phóng to hai ngón, thanh địa chỉ co giãn. Về danh sách bài thì mở khóa lại. Đã kiểm 2026-11-13 bằng giả lập: ở màn chơi touchmove/wheel bị chặn, chạm trống vẫn ăn, danh sách vẫn cuộn bằng bánh xe; **chưa kiểm trên iPhone/Android thật** (kéo nảy và kéo-để-tải-lại không mô phỏng được). Vuốt từ mép trái/phải để quay lại của iOS Safari là cử chỉ của hệ điều hành, web không chặn được.

## Khuông nhạc co theo chiều cao màn hình

Khung khuông nhạc (3 hàng) cao tối đa 442 px nhưng flex co lại trên màn thấp để hai trống luôn hiện. Trước đây việc co này cắt mất hàng thứ 3 (lỗi trên iPhone, 2026-11-13). Đã sửa: `measureStave()` đo chiều cao thật của `[data-stave-viewport]` (sau mỗi lần render và khi `resize`), rồi `stripStyle` thu nhỏ cả dải hàng bằng `scale(k)` (k = cao thực / 442, tối thiểu 0,5; chiều rộng dải đặt `100/k %` để vẫn kín ngang). Mọi tính toán vị trí/cuộn vẫn dùng đơn vị gốc 159 px/hàng, chỉ phần hiển thị được nhân `k`. Đã kiểm ở 390x664, 390x730, 390x844 (giả lập): đủ 3 hàng, cuộn qua 5 ô nhịp đúng, không lỗi.

## Kiến trúc game trong `Component`

- **`SONGS`**: danh sách bài. Mỗi bài có `bpm`, `difficulty`, `bars`, và nốt mô tả theo 1 trong 3 cách: `sections` (nhóm ô nhịp lặp lại), `barList` (liệt kê từng ô nhịp, dùng cho `s6`), hoặc `notes`. Nốt là `[step, màu]`, 1 ô nhịp 4/4 = 16 step (nốt móc kép). `drums: 3` đánh dấu bài 3 trống (tab 3, thêm màu vàng); bài còn lại 2 trống (đỏ/xanh). `num` hiển thị bị đánh số lại theo tab, còn `id` (`s1`..`s8`, `s4b`, `s3d1`) mới là khoá thật, dùng ở nhiều chỗ.
- **`buildNotes()`**: sinh danh sách nốt, chèn 2 ô nhịp mở đầu (đếm nhịp + 1 ô gõ đỏ) nên mọi nốt của bài bị đẩy +32 step; `songLen() = 32 + bars*16`. Level 1–3 (`s1,s2,s3`) chỉ có nốt dẫn ở phách 1 và 3.
- **`tick()`**: vòng `requestAnimationFrame`, đẩy `playhead` (đơn vị step) theo `bpm/60*4` step/giây, đánh dấu `miss` khi nốt qua cửa sổ chấm, kết thúc bài khi `playhead >= songLen()`, bật nhạc nền khi playhead chạm `musicStartStep`. Nhạc không có đồng hồ riêng mà bám theo playhead, nên chỉnh đồng bộ nhạc–nốt ở `beginPlay()` / `musicStartStep`.
- **`beginPlay()`**: đếm 3-2-1-GO theo BPM, có bảng riêng theo bài: `musicStartCount` (bài nào cho nhạc chạy từ lúc đếm "3"/"2") và `musicStartAtGo` (bài `s7` chỉ phát nhạc sau khi đếm xong). Thêm bài mới có nhạc phải chỉnh các bảng này.
- **`hit(color)`**: chấm điểm. Cửa sổ chấm đổi từ ms sang step theo BPM trong `windows()` (perfect 80ms, great 180ms, good 250ms). Điểm tối đa 1000 (= 100%). Sao: >500 = 1, >800 = 2, >950 = 3 (tính ở `tick()`); comment trong `renderVals()` còn ghi mốc cũ 750 cho 2 sao, mã thật dùng 800.
- **Play / Learn**: Learn có luật riêng: miss liên tiếp ≥4 thì hiện lại vạch phách và nhân điểm 0,8; ≥7 thì thua (`showFail`). Play không có luật thua.
- **Âm thanh**: Web Audio (`ensureAudio()`) nạp mẫu trống, tiếng click ô nhịp và nhạc nền từng bài (`tracks`: id bài → data URI `.ogg`) từ base64 nhúng sẵn. Nhạc tổng hợp trong `tick()` đã tắt. Đổi nhạc/mẫu âm = thay chuỗi base64 đúng chỗ này.
- **`renderVals()`**: dựng khuông nhạc, vị trí nốt (`top` theo màu, nốt phách 1 to hơn 20%), thanh quét, phán định (PERFECT/GREAT/GOOD/MISS), màn kết quả, danh sách bài theo tab; trả về object cho template.

## Bài chuyển từ file level design (3 trống, `s3d2`..`s3d15`)

14 bài (2 đến 15) lấy từ bảng Google Sheets của chủ dự án (cột Level design = file JSON, cột Audio = mp3 trên taptune.musiccdn.net; link bảng: https://docs.google.com/spreadsheets/d/1fADCLylmc_zlIlfn9gdHon7fZtUXQtG_16369Vf_Fx4). File JSON có 5 làn, **chủ dự án quy định**: làn 1 = trống xanh, làn 2 = đỏ, làn 3 = vàng; làn 4 (vạch phách 1) và làn 5 (phách nhẹ 2,3,4) bỏ, không phải nốt. Thời gian (giây) đổi sang step 16 theo `round(time / (60/bpm) * 4)`; mọi nốt của 14 bài đều rơi đúng lưới step 16 (độ lệch 0). Nốt lưu ở trường `abs: { red: [...], blue: [...], yellow: [...] }` = step tuyệt đối tính từ đầu file nhạc **đã cắt bỏ ô nhịp đầu tiên của bản gốc** (chủ dự án yêu cầu 2026-11-13 để bài vào sớm hơn: mỗi file `.ogg` cắt đúng 16 step = 240/bpm giây, nốt dời -16 step, `bars` giảm 1; ô nhịp đầu của 14 file level đều không có nốt nào, nên chỉ mất phần nhạc dạo). Muốn nạp lại từ bản gốc thì cắt và dời lại như vậy. Nhạc và level đã đồng bộ sẵn, **cả hai bắt đầu ngay bar 0** (step 16, ngay sau ô nhịp đếm 3-2-1): `introSteps()` = 16 cho bài có `abs` (bài thường là 32), `buildNotes()` cộng 16 và không chèn 4 nốt đỏ mở đầu, `beginPlay()` bật nhạc ở step 16 và bỏ tiếng click nhẹ ở bar 0, `songLen()` = 16 + bars×16. Độ khó `Normal` nếu dưới 2,2 nốt/giây, còn lại `Hard` (do Claude đặt theo mật độ nốt, chủ dự án chưa duyệt). Số ô nhịp `bars` = ceil(thời lượng nhạc × bpm / 240).

Nhạc: mp3 gốc nén sang `.ogg` 64 kbps (`track-s3d<N>.ogg`, khoảng 0,35 đến 0,55 MB/bài). Khác 10 bài cũ (nạp và giải mã sẵn lúc vào game), 14 bài này chỉ nạp khi chọn bài (`LAZY_TRACKS` + `loadLazyTrack()` gọi trong `selectSong`) để không tốn RAM điện thoại. Thêm bài kiểu này: thêm dòng vào `SONGS` (có `abs`), file `.ogg` vào `assets/`, khoá vào `LAZY_TRACKS`, và sửa regex `musicStartAtGo` trong `beginPlay()`.

Đã kiểm 2026-11-13 (giả lập): bài 2 bấm theo lịch đúng màu ăn 45/45 nốt đầu (sau khi chuyển sang bắt đầu ở bar 0), nhạc bật cách lúc quét vào bar 0 khoảng 20 ms; sau khi cắt ô nhịp đầu, bài 2 ăn 51/51 nốt đầu và độ khớp nhạc–nốt đo lại không đổi; nhạc lệch so với lưới nốt trong khoảng -15 đến +35 ms (đo trên 8 bài, nhỏ hơn cửa sổ perfect 80 ms); bài 9 chạy không lỗi console. Chưa kiểm: nghe thật trên điện thoại, chơi trọn từng bài, độ khó có hợp không.

## Khi chỉnh sửa

- Ảnh trống là `.webp` (đã thu nhỏ, bản gốc PNG ở `backup/assets-before-shrink/`); `rainbow.wav` đã hạ xuống mono 22 kHz.
- Repo git công khai: https://github.com/midunguyeniu/DrumSweeper (nhánh `main`). Trang chơi: https://midunguyeniu.github.io/DrumSweeper/ (GitHub Pages, phục vụ thư mục `docs/` của `main`, cập nhật sau mỗi lần push; build mất ~1 phút). `.gitignore` bỏ qua `backup/` và hai file `.html` ở thư mục gốc. Trước khi sửa lớn, commit hoặc sao lưu `src/` vào `backup/`. Sau mỗi thay đổi: `node tools/pack.js`, rồi phục vụ file `docs/index.html` qua http (Node, cổng khác 8765) và chơi thử một bài; đừng báo "xong" nếu chưa chạy thử. Việc gì chưa kiểm thì nói rõ.
- Đây là bản tải từ mạng; nếu chủ dự án có bản nguồn chỉnh sửa được trên nền tảng gốc, bản đó mới là nguồn thật, file này chỉ là bản đóng gói.
