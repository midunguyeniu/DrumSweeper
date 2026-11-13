
class Component extends DCLogic {
  STEPS = 32; // steps in the visible bar window (2 bars)

  // 6 songs, difficulty rising. Each pattern is one 4/4 bar = 16 sixteenth-steps
  // (4 steps per beat). F = red drum, A = blue drum. The bar repeats `bars` times.
  SONGS = [
    { id: 's1', num: 1, title: 'Red Drum Introduction', bpm: 60,  difficulty: 'Easy',   bars: 9, sections: [{ count: 6, notes: [[0, 'red'], [8, 'red']] }, { count: 2, notes: [[0, 'red'], [4, 'red'], [8, 'red'], [12, 'red']] }, { count: 1, notes: [[0, 'red'], [8, 'red']] }] },
    { id: 's2', num: 2, title: 'Steady Beat', bpm: 80,  difficulty: 'Easy',   bars: 8, sections: [{ count: 4, notes: [[0, 'red'], [8, 'red']] }, { count: 4, notes: [[0, 'red'], [4, 'red'], [8, 'red'], [12, 'red']] }] },
    { id: 's3', num: 3, title: 'Blue Drum Introduction',  bpm: 90,  difficulty: 'Normal', bars: 8, sections: [{ count: 2, notes: [[0, 'red'], [8, 'red']] }, { count: 2, notes: [[0, 'red'], [4, 'red'], [8, 'red'], [12, 'red']] }, { count: 4, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }] },
    { id: 's4', num: 4, title: 'Climb Up',    bpm: 100, difficulty: 'Normal', bars: 8, sections: [{ count: 2, notes: [[0, 'red'], [4, 'red'], [8, 'red'], [12, 'red']] }, { count: 2, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 4, notes: [[0, 'red'], [4, 'blue'], [8, 'blue'], [12, 'blue']] }] },
    { id: 's4b', num: 5, title: 'Groove In',  bpm: 80, difficulty: 'Normal', bars: 8, sections: [{ count: 7, notes: [[0, 'red'], [2, 'red'], [4, 'blue'], [8, 'red'], [10, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [2, 'red'], [4, 'blue']] }] },
    { id: 's5', num: 6, title: 'Off Beat',    bpm: 98, difficulty: 'Hard',   bars: 12, sections: [{ count: 4, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 8, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [10, 'red'], [12, 'blue']] }] },
    { id: 's6', num: 7, title: 'Double Time', bpm: 110, difficulty: 'Hard',   bars: 14, barList: [
      [[0,'red'],[4,'blue'],[8,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue'],[14,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[4,'blue'],[8,'red'],[10,'red'],[12,'blue']],
      [[0,'red'],[2,'blue'],[4,'red'],[6,'blue'],[8,'red'],[10,'red'],[12,'blue'],[14,'blue']],
      [[0,'red']]
    ] },
    { id: 's7', num: 8, title: 'Full Beat',   bpm: 129, difficulty: 'Hard',   bars: 35, sections: [{ count: 8, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 2, notes: [[0, 'red'], [0, 'blue'], [3, 'red'], [3, 'blue'], [6, 'red'], [6, 'blue']] }, { count: 2, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 2, notes: [[0, 'red'], [0, 'blue'], [3, 'red'], [3, 'blue'], [6, 'red'], [6, 'blue']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 2, notes: [[0, 'red'], [0, 'blue'], [3, 'red'], [3, 'blue'], [8, 'red'], [8, 'blue']] }, { count: 1, notes: [[0, 'red'], [0, 'blue'], [2.67, 'red'], [2.67, 'blue'], [5.33, 'red'], [5.33, 'blue'], [8, 'red'], [8, 'blue'], [12, 'red'], [13.33, 'red'], [14.67, 'red']] }, { count: 1, notes: [[0, 'red']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue'], [14, 'red']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue'], [14, 'red']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue'], [14, 'red']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue'], [14, 'red']] }, { count: 3, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue'], [14, 'red']] }, { count: 4, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'blue']] }] },
    { id: 's8', num: 9, title: 'Syncopation', bpm: 113, difficulty: 'Hard', bars: 16, sections: [{ count: 3, notes: [[0, 'red'], [4, 'blue'], [6, 'red'], [10, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [0, 'blue'], [4, 'red'], [4, 'blue'], [8, 'red'], [8, 'blue'], [12, 'red'], [12, 'blue']] }, { count: 3, notes: [[0, 'red'], [4, 'blue'], [6, 'red'], [10, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [2, 'blue'], [4, 'blue'], [5, 'red'], [8, 'blue'], [10, 'red'], [12, 'blue'], [14, 'blue']] }, { count: 3, notes: [[0, 'red'], [4, 'blue'], [6, 'red'], [10, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [0, 'blue'], [4, 'red'], [4, 'blue'], [8, 'red'], [10, 'red'], [12, 'blue'], [14, 'blue']] }, { count: 3, notes: [[0, 'red'], [4, 'blue'], [6, 'red'], [10, 'red'], [12, 'blue']] }, { count: 1, notes: [[0, 'red'], [0, 'blue']] }] }
    ,
    { id: 's3d1', num: 1, title: 'Hi-Hat Intro', bpm: 79, difficulty: 'Normal', bars: 17, drums: 3, sections: [{ count: 4, notes: [[0, 'red'], [4, 'yellow'], [8, 'red'], [12, 'yellow']] }, { count: 11, notes: [[0, 'red'], [4, 'blue'], [8, 'red'], [12, 'yellow']] }, { count: 1, notes: [[0, 'red'], [0, 'yellow'], [2, 'red'], [2, 'yellow'], [4, 'red'], [4, 'yellow'], [6, 'red'], [6, 'yellow'], [8, 'red'], [8, 'yellow']] }, { count: 1, notes: [[0, 'red'], [4, 'blue']] }] }
  ];
  currentSong() { return this.SONGS.find(s => s.id === this.state.songId) || this.SONGS[0]; }
  songLen() { return 32 + this.currentSong().bars * 16; }

  tabStyle(n) {    const on = this.state.tab === n;
    return {
      flex: 1, padding: '11px 0', borderRadius: '13px', cursor: 'pointer',
      border: on ? '2px solid #ffcc33' : '2px solid rgba(255,255,255,.1)',
      background: on ? 'linear-gradient(180deg,#ffcc33,#ff9c1a)' : 'rgba(255,255,255,.04)',
      color: on ? '#5a2a00' : '#c9b8a6', fontSize: '15px', fontWeight: 700, letterSpacing: '.5px',
      boxShadow: on ? '0 4px 0 #a24a08' : 'none', transition: 'all .12s'
    };
  }

  modeStyle(m) {
    const on = this.state.mode === m;
    return {
      flex: 1, padding: '9px 0', borderRadius: '11px', cursor: 'pointer',
      border: on ? '2px solid #4bd0ff' : '2px solid rgba(255,255,255,.1)',
      background: on ? 'linear-gradient(180deg,#4bd0ff,#2a8fd0)' : 'rgba(255,255,255,.04)',
      color: on ? '#04283a' : '#c9b8a6', fontSize: '14px', fontWeight: 700, letterSpacing: '.5px',
      boxShadow: on ? '0 4px 0 #175f86' : 'none', transition: 'all .12s'
    };
  }

  state = {
    playing: false, songId: null, showResult: false, showFail: false, tab: 2, mode: 'play',
    score: 0, combo: 0, best: 0, hits: 0,
    nPerfect: 0, nGreat: 0, nGood: 0, nMiss: 0,
    judge: '', judgeSeq: 0,
    flashBlue: 0, flashRed: 0, flashYellow: 0,
    tick: 0, countdown: null
  };

  bpm() { return this.currentSong().bpm; }
  diff() { return this.currentSong().difficulty; }
  windows() {
    // uniform hit windows in milliseconds, converted to 16th-note steps for the current tempo.
    // 1 step = 15000 / bpm ms, so steps = ms * bpm / 15000.
    const k = this.bpm() / 15000;
    return { perfect: 80 * k, great: 180 * k, good: 250 * k };
  }

  buildNotes() {
    const song = this.currentSong();
    const out = [];
    let id = 0;
    if (song.barList) {
      // barList: explicit array of bars, each an array of [step, color]
      song.barList.forEach((barNotes, b) => {
        const off = b * 16;
        barNotes.forEach(([st, color]) => out.push({ id: id++, step: st + off, color }));
      });
    } else if (song.sections) {
      // sections: [{count, notes}] — different patterns for groups of bars
      let b = 0;
      song.sections.forEach(sec => {
        for (let k = 0; k < sec.count; k++, b++) {
          const off = b * 16;
          sec.notes.forEach(([st, color]) => out.push({ id: id++, step: st + off, color }));
        }
      });
    } else {
      for (let b = 0; b < song.bars; b++) {
        const off = b * 16;
        song.notes.forEach(([st, color]) => out.push({ id: id++, step: st + off, color }));
      }
    }
    out.sort((a, b) => a.step - b.step);
    // Prepend 2 intro bars: bar -1 (count-in, no notes) + bar 0 (4 red beats). Song content shifts
    // +32 steps so song bar 1 begins at step 32; music stays synced (see beginPlay).
    const INTRO = 32;
    const introBeats = ({ s1: 1, s2: 1, s3: 1 }[song.id]) ? [0, 8] : [0, 4, 8, 12]; // levels 1-3: beats 1&3 only
    const intro0 = introBeats.map(st => ({ step: 16 + st, color: 'red', intro: true }));
    const final = intro0.concat(out.map(n => ({ step: n.step + INTRO, color: n.color })));
    final.forEach((n, i) => { n.id = i; });
    return final;
  }

  reset(startPlaying) {
    this.notes = this.buildNotes();
    this.status = this.notes.map(() => 'pending');
    this.playhead = 0;
    this.lastMusicStep = -1;
    this.last = null;
    this.setState({
      playing: !!startPlaying, showResult: false,
      score: 0, combo: 0, best: 0, hits: 0, nPerfect: 0, nGreat: 0, nGood: 0, nMiss: 0, judge: '', judgeSeq: 0
    });
  }

  componentDidMount() {
    this.reset(false);
    this.menuClick = new Audio('@@ASSET:menu-click.ogg@@');
    this.menuClick.preload = 'auto';
    // Keyboard: F = blue (left drum), Space = red (middle/right), J = yellow
    this.keyHandler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const isSpace = e.code === 'Space' || e.key === ' ';
      // Space would otherwise scroll the page / re-click the focused button (e.g. Play) on key-up
      if (isSpace) e.preventDefault();
      if (e.repeat) return;
      const k = (e.key || '').toLowerCase();
      if (k === 'f') { this.hit('blue'); }
      else if (isSpace) { this.hit('red'); }
      else if (k === 'j') { this.hit('yellow'); }
    };
    this.keyUpHandler = (e) => { if (e.code === 'Space' || e.key === ' ') e.preventDefault(); };
    window.addEventListener('keydown', this.keyHandler);
    window.addEventListener('keyup', this.keyUpHandler);
    // No page drag while a song screen is open (iOS rubber-band, Android pull-to-refresh). Must be non-passive.
    this.touchMoveHandler = (e) => { if (this.state.songId != null && e.cancelable) e.preventDefault(); };
    document.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
    this.wheelHandler = (e) => { if (this.state.songId != null) e.preventDefault(); };
    document.addEventListener('wheel', this.wheelHandler, { passive: false });
    // never let a drag chain out of the page (the song list still scrolls inside its own box)
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';
    // a mouse click / tap anywhere also counts as "tap to start" while armed
    this.pointerHandler = (e) => {
      if (!this.state.armed) return;
      // ignore the very tap that armed the song, and any tap on a control button
      if (Date.now() - (this.armedAt || 0) < 250) return;
      if (e.target && e.target.closest && e.target.closest('button')) return;
      this.startFromArmed();
    };
    window.addEventListener('pointerdown', this.pointerHandler);
    // Drum taps (touch / mouse / pen). The dc runtime has no `onpointerdown` binding (its event map only
    // covers click, mousedown, key*, ...), so a template `onpointerdown` is silently dropped and the
    // drums never react. Listen on window instead and find the drum via its data-drum attribute.
    // One pointerdown per finger, so multi-touch (both drums at once) works.
    // Drums can overlap (3-drum kit), and every button is a square, so decide by the drum's CIRCLE:
    // walk the elements under the finger from the top down and take the first drum whose circle contains it.
    // A tap on a button's square corner (outside its circle) still counts for that button if nothing else matches.
    this.drumHandler = (e) => {
      const under = (document.elementsFromPoint ? document.elementsFromPoint(e.clientX, e.clientY) : [e.target])
        .map((n) => n && n.closest && n.closest('[data-drum]')).filter(Boolean);
      const stack = under.filter((el, i) => under.indexOf(el) === i);
      if (!stack.length) return;
      const inCircle = (el) => {
        const r = el.getBoundingClientRect(), rad = Math.min(r.width, r.height) / 2;
        return Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) <= rad;
      };
      const el = stack.find(inCircle) || stack[0];
      e.preventDefault();
      this.hit(el.getAttribute('data-drum'));
    };
    window.addEventListener('pointerdown', this.drumHandler);
    // screen height changes (rotation, Safari toolbar showing/hiding) -> re-fit the stave
    this.onResize = () => this.forceUpdate(); // re-render (3-drum kit size depends on the screen); componentDidUpdate re-measures the stave
    window.addEventListener('resize', this.onResize);
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }
  playBarClick() {
    const ac = this.ac; if (!ac || !this.barClickBuf) return;
    const src = ac.createBufferSource(); src.buffer = this.barClickBuf;
    const g = ac.createGain(); g.gain.value = 1;
    src.connect(g); g.connect(ac.destination); src.start();
  }
  playBarClickSoft() {
    const ac = this.ac; if (!ac || !this.barClickSoftBuf) return;
    const src = ac.createBufferSource(); src.buffer = this.barClickSoftBuf;
    const g = ac.createGain(); g.gain.value = 1;
    src.connect(g); g.connect(ac.destination); src.start();
  }
  playMenuClick() {
    if (!this.menuClick) return;
    try { this.menuClick.currentTime = 0; this.menuClick.play(); } catch (e) {}
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
    if (this.countTimer) clearTimeout(this.countTimer);
    window.removeEventListener('keydown', this.keyHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('touchmove', this.touchMoveHandler);
    document.removeEventListener('wheel', this.wheelHandler);
    window.removeEventListener('pointerdown', this.pointerHandler);
    window.removeEventListener('pointerdown', this.drumHandler);
    window.removeEventListener('resize', this.onResize);
  }

  // 3-2-1 count-in synced to the song tempo (one count per beat), then start.
  // resumeOffset (seconds) continues the backing track mid-way; omit to start from the top.
  beginPlay(resumeOffset) {
    this.ensureAudio();
    if (this.countTimer) clearTimeout(this.countTimer);
    const musicOffset = Math.max(0, resumeOffset || 0);
    const isResume = musicOffset > 0; // resuming mid-track: music waits until GO; fresh start: at count "1"
    // songs that want the backing track to run through the whole count-in start it at "3"
    const musicStartCount = { s5: 3, s6: 3, s8: 2 };
    // songs whose backing track begins only after the count-in ends (on beat 1 of bar 1)
    const musicStartAtGo = { s7: true };
    const startAtGo = isResume || !!musicStartAtGo[this.state.songId];
    const startAt = musicStartCount[this.state.songId] || 1;
    const beatMs = 60000 / this.bpm(); // one quarter-note beat at the song's BPM
    // Visual pre-roll: the yellow sweep flies in from the left ("bar 0", off the playfield) across
    // the whole 4-beat count-in and lands on beat 1 exactly when play begins — pure visuals, so the
    // music/note timing is untouched, but the player gets a full bar of runway for the first hit.
    this.leadIn = !isResume;
    this.leadSteps = 16;          // bar -1 = one full bar of count-in runway (steps 0..16)
    this.countInDur = 4 * beatMs; // 3-2-1-GO spans 4 beats = bar -1
    this.countInStartTs = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (this.leadIn) this.playhead = 0; // fresh: count-in sweeps across bar -1 (steps 0..16)
    // Music is anchored to bar 0 (steps 16..31) so it stays in sync with the song notes (which now
    // begin at bar 1 = step 32) — same real-time gap before song bar 1 as the old count-in.
    this.musicStarted = false;
    this.pendingMusicOffset = musicOffset;
    if (isResume) this.musicStartStep = this.playhead; // resume: music continues right at GO
    else {
      const beatsBeforeBar1 = startAtGo ? 0 : (startAt + 1); // count "3"->4, "2"->3, "1"->2 beats before bar 1
      this.musicStartStep = 32 - beatsBeforeBar1 * 4;        // absolute step during bar 0 (16..31)
    }
    this.pendingSoftSteps = this.leadIn ? [20, 24, 28] : []; // bar 0 beats 2,3,4 (soft click)
    let n = 3;
    this.setState({ countdown: n, playing: false });
    if (this.leadIn) this.playBarClick(); // bar -1 beat 1 (count-in start)
    const step = () => {
      n--;
      if (n > 0) { this.setState({ countdown: n }); if (this.leadIn) this.playBarClickSoft(); this.countTimer = setTimeout(step, beatMs); }
      else {
        this.setState({ countdown: 0 }); if (this.leadIn) this.playBarClickSoft();
        this.countTimer = setTimeout(() => { this.last = null; if (this.leadIn) { this.playhead = this.leadSteps; this.playBarClick(); } this.setState({ countdown: null, playing: true }); }, beatMs);
      }
    };
    this.countTimer = setTimeout(step, beatMs);
  }
  playCount(n) {
    if (!this.ac) return;
    const ac = this.ac, t = ac.currentTime;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.value = n === 0 ? 880 : 440;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (n === 0 ? 0.3 : 0.18));
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.35);
  }
  componentDidUpdate(prev) { this.measureStave(); this.syncScrollLock(); }
  // While a song screen is open (playing, paused, result) lock every page gesture: scroll, rubber-band bounce,
  // pull-to-refresh and pinch zoom. The song list screen keeps its own normal scrolling.
  syncScrollLock() {
    const want = this.state.songId != null;
    if (want === !!this.scrollLocked) return;
    this.scrollLocked = want;
    const de = document.documentElement, b = document.body;
    if (!de || !b) return;
    de.style.touchAction = want ? 'none' : '';
    de.style.overflow = want ? 'hidden' : '';
    b.style.overflow = want ? 'hidden' : '';
  }
  // The stave window is 3 rows (STAVE_FULL_H px) but flex-shrinks on short phone screens so the drums stay
  // on-screen. Instead of cutting off the 3rd row, scale the whole strip down to fit the height we got.
  measureStave() {
    const el = document.querySelector('[data-stave-viewport]');
    if (!el || !el.clientHeight) return;
    const k = Math.max(0.4, Math.min(1, el.clientHeight / this.STAVE_FULL_H));
    if (Math.abs(k - (this.stripScale || 1)) > 0.004) { this.stripScale = k; this.forceUpdate(); }
  }

  // staggered star reveal (0.4s each) with a rising chime; the score counts up in lockstep,
  // finishing exactly when the last star lands.
  revealStars(count, target) {
    if (this.starTimers) this.starTimers.forEach(clearTimeout);
    this.starTimers = [];
    const STAR_MS = 400;      // gap between each star landing
    const START = 350;        // delay before first star
    const REVEAL_DUR = 500;   // matches the CSS starReveal duration
    for (let i = 0; i < count; i++) {
      this.starTimers.push(setTimeout(() => {
        this.setState({ starsRevealed: i + 1 });
        this.playStarDing(i);
      }, START + i * STAR_MS));
    }
    // score count-up: ends when the last star's reveal animation finishes
    const scoreEnd = count > 0 ? START + (count - 1) * STAR_MS + REVEAL_DUR : 1000;
    this.animateScore(target, scoreEnd);
  }
  animateScore(target, durMs) {
    if (this.scoreRaf) cancelAnimationFrame(this.scoreRaf);
    const t0 = performance.now();
    this.setState({ scoreShown: 0, countP: 0 });
    this.startRainbowSfx();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / durMs);
      const eased = 1 - Math.pow(1 - p, 2); // ease-out
      this.setState({ scoreShown: Math.round(target * eased), countP: eased });
      if (p < 1) { this.scoreRaf = requestAnimationFrame(step); }
      else { this.stopRainbowSfx(); }
    };
    this.scoreRaf = requestAnimationFrame(step);
  }
  playStarDing(i) {
    const ac = this.ac; if (!ac) return;
    const t = ac.currentTime;
    const base = [660, 830, 1050][i] || 1050; // rising pitch per star
    [base, base * 1.5].forEach((f, k) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(k === 0 ? 0.4 : 0.16, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.55);
    });
  }

  // pick a song from the list, arm it, then wait for the player to tap D/F (or a drum) to start
  selectSong(id) {
    this.ensureAudio();
    this.armedAt = Date.now();
    if (this.countTimer) clearTimeout(this.countTimer);
    this.setState({ songId: id, showResult: false, showFail: false, armed: true, playing: false, score: 0, combo: 0, best: 0, hits: 0, nPerfect: 0, nGreat: 0, nGood: 0, nMiss: 0, judge: '', countdown: null }, () => {
      this.missStreak = 0; this.scoreFactor = 1; this.beatShown = false; this.learnHitsSinceShow = 0; this.beatFadeStart = 80; this.beatFadeEnd = 88;
      this.notes = this.buildNotes();
      this.status = this.notes.map(() => 'pending');
      this.playhead = 0; this.lastMusicStep = -1; this.last = null;
      this.forceUpdate(); // re-render so staves + HITS total reflect the new song's notes
    });
  }

  // fired by the first drum hit / D-F key press while armed
  startFromArmed() {
    if (!this.state.armed) return;
    this.setState({ armed: false, starting: true });
    // brief 0.25s beat before the count-in kicks off
    if (this.startDelayTimer) clearTimeout(this.startDelayTimer);
    this.startDelayTimer = setTimeout(() => { this.setState({ starting: false }); this.beginPlay(); }, 250);
  }

  tick(ts) {
    this.raf = requestAnimationFrame((t) => this.tick(t));
    if (!this.state.playing) {
      // count-in fly-in: glide the sweep from -leadSteps to 0 across the count-in so it lands on beat 1
      if (this.leadIn && this.state.countdown != null && this.countInStartTs != null) {
        const frac = Math.min(1, Math.max(0, (ts - this.countInStartTs) / this.countInDur));
        this.playhead = this.leadSteps * frac; // sweep bar -1 left→right (steps 0→16) across the count-in
        this.setState((s) => ({ tick: s.tick + 1 }));
      }
      this.last = ts; return;
    }
    if (this.last == null) this.last = ts;
    let dt = (ts - this.last) / 1000; this.last = ts;
    if (dt > 0.25) dt = 0.25;
    const sps = this.bpm() / 60 * 4; // 16th-note steps per second
    let ph = this.playhead + dt * sps;
    const win = this.windows().good;

    // background music: fire each 16th step as the playhead crosses it
    const curStep = Math.floor(ph);
    if (curStep !== this.lastMusicStep) {
      this.lastMusicStep = curStep;
      // synthesized backing disabled — songs use their own uploaded .ogg tracks
    }

    // miss detection for notes whose window has fully passed
    let missed = false, missCount = 0;
    this.notes.forEach((n, i) => {
      if (this.status[i] === 'pending' && ph > n.step + win) {
        this.status[i] = 'miss'; missed = true; missCount++;
      }
    });
    // 7 consecutive missed notes → fail the level
    if (missCount > 0) {
      this.missStreak = (this.missStreak || 0) + missCount;
      const learn = this.state.mode === 'learn';
      // Learn only: 7 consecutive misses = fail
      if (learn && this.missStreak >= 7) {
        this.stopMusic(); if (this.countTimer) clearTimeout(this.countTimer);
        this.setState({ playing: false, showFail: true, combo: 0, judge: 'MISS', judgeSeq: this.state.judgeSeq + 1 });
        return;
      }
      // Learn only: 4 misses bring the beat line back (visible again); score is dimmed to 80% each time
      if (learn && this.missStreak >= 4 && !this.beatShown) {
        this.beatShown = true; this.learnHitsSinceShow = 0;
        this.beatFadeStart = Infinity; this.beatFadeEnd = Infinity;
        this.scoreFactor = (this.scoreFactor == null ? 1 : this.scoreFactor) * 0.8;
      }
    }

    if (ph >= this.songLen()) {
      this.playhead = this.songLen();
      const rs = Math.round(this.state.score);
      const sc = rs > 950 ? 3 : rs > 800 ? 2 : rs > 500 ? 1 : 0;
      this.stopMusic();
      this.setState({ playing: false, showResult: true, starsRevealed: 0, scoreShown: 0 });
      this.revealStars(sc, rs);
      return;
    }
    this.playhead = ph;
    // soft bar-clicks on beats 2,3,4 of bar 0 (steps 20/24/28)
    while (this.pendingSoftSteps && this.pendingSoftSteps.length && this.playhead >= this.pendingSoftSteps[0]) {
      this.pendingSoftSteps.shift(); this.playBarClickSoft();
    }
    // music is anchored to bar 0 (see beginPlay) — fire it once the sweep reaches its start step
    if (!this.musicStarted && this.playhead >= this.musicStartStep) {
      this.musicStarted = true;
      this.startMusic(this.pendingMusicOffset || 0);
    }

    if (missed) {
      this.setState((s) => ({ combo: 0, judge: 'MISS', judgeTiming: '', judgeSeq: s.judgeSeq + 1, tick: s.tick + 1 }));
    } else {
      this.setState((s) => ({ tick: s.tick + 1 }));
    }
  }

  // ---- audio ----
  ensureAudio() {
    if (!this.ac) {
      try { this.ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { }
    }
    if (this.ac && this.ac.state === 'suspended') this.ac.resume();
    // preload the result count-up sfx
    if (this.ac && !this.rainbowBuf && !this.rainbowLoading) {
      this.rainbowLoading = true;
      fetch('@@ASSET:rainbow.wav@@')
        .then((r) => r.arrayBuffer())
        .then((b) => this.ac.decodeAudioData(b))
        .then((buf) => { this.rainbowBuf = buf; })
        .catch(() => { });
    }
    // preload per-song backing tracks (id -> file)
    if (!this.musicBufs) this.musicBufs = {};
    if (!this.musicLoading) this.musicLoading = {};
    // preload the red-drum hit sample
    if (this.ac && !this.redKickBuf && !this.redKickLoading) {
      this.redKickLoading = true;
      fetch('@@ASSET:red-kick.wav@@')
        .then((r) => r.arrayBuffer())
        .then((b) => this.ac.decodeAudioData(b))
        .then((buf) => { this.redKickBuf = buf; })
        .catch(() => { });
    }
    // preload the blue-drum hit sample
    if (this.ac && !this.blueDrumBuf && !this.blueDrumLoading) {
      this.blueDrumLoading = true;
      fetch('@@ASSET:blue-drum.wav@@')
        .then((r) => r.arrayBuffer())
        .then((b) => this.ac.decodeAudioData(b))
        .then((buf) => { this.blueDrumBuf = buf; })
        .catch(() => { });
    }
    // preload the bar-click sample (played on beat 1 of bar -1 and bar 0)
    if (this.ac && !this.barClickBuf && !this.barClickLoading) {
      this.barClickLoading = true;
      fetch('@@ASSET:bar-click.wav@@')
        .then((r) => r.arrayBuffer())
        .then((b) => this.ac.decodeAudioData(b))
        .then((buf) => { this.barClickBuf = buf; })
        .catch(() => { });
    }
    // preload the soft bar-click sample (beats 2,3,4 of bar -1 and bar 0)
    if (this.ac && !this.barClickSoftBuf && !this.barClickSoftLoading) {
      this.barClickSoftLoading = true;
      fetch('@@ASSET:bar-click-soft.wav@@')
        .then((r) => r.arrayBuffer())
        .then((b) => this.ac.decodeAudioData(b))
        .then((buf) => { this.barClickSoftBuf = buf; })
        .catch(() => { });
    }
    const tracks = { s1: '@@ASSET:track-s1.ogg@@', s2: '@@ASSET:track-s2.ogg@@', s3: '@@ASSET:track-s3.ogg@@', s4: '@@ASSET:track-s4.ogg@@', s4b: '@@ASSET:track-s4b.ogg@@', s5: '@@ASSET:track-s5.ogg@@', s6: '@@ASSET:track-s6.ogg@@', s7: '@@ASSET:track-s7.ogg@@', s8: '@@ASSET:track-s8.ogg@@', s3d1: '@@ASSET:track-s3d1.ogg@@' };
    Object.keys(tracks).forEach((id) => {
      if (this.ac && !this.musicBufs[id] && !this.musicLoading[id]) {
        this.musicLoading[id] = true;
        fetch(tracks[id])
          .then((r) => r.arrayBuffer())
          .then((b) => this.ac.decodeAudioData(b))
          .then((buf) => { this.musicBufs[id] = buf; })
          .catch(() => { });
      }
    });
  }
  // backing track for the current song. Starts on the count-in.
  // offset (seconds) resumes mid-track; defaults to the beginning.
  startMusic(offset) {
    this.stopMusic();
    const buf = this.musicBufs && this.musicBufs[this.state.songId];
    if (!this.ac || !buf) return;
    const off = Math.max(0, offset || 0);
    const src = this.ac.createBufferSource();
    src.buffer = buf;
    const g = this.ac.createGain();
    g.gain.value = 0.7;
    src.connect(g); g.connect(this.ac.destination);
    // per-song fine timing nudge (seconds): positive = start the backing track later
    const delayMap = { s1: 0.05, s2: 0.05 };
    const delay = Math.max(0, delayMap[this.state.songId] || 0);
    const when = this.ac.currentTime + delay;
    src.start(when, off);
    this.musicSrc = src;
    this.musicStartAc = when; // wall-clock when playback began
    this.musicStartOffset = off;             // where in the buffer it began
  }
  stopMusic() {
    if (this.musicSrc) {
      // remember how far into the track we got, so a resume can continue from here
      if (this.ac && this.musicStartAc != null)
        this.musicPausedAt = (this.musicStartOffset || 0) + (this.ac.currentTime - this.musicStartAc);
      try { this.musicSrc.stop(); } catch (e) { }
      this.musicSrc = null;
    }
  }
  // loop the rainbow sfx while the result numbers count up, stop when done
  startRainbowSfx() {
    if (!this.ac || !this.rainbowBuf) return;
    this.stopRainbowSfx();
    const src = this.ac.createBufferSource();
    src.buffer = this.rainbowBuf;
    src.loop = true;
    const g = this.ac.createGain();
    g.gain.value = 0.6;
    src.connect(g); g.connect(this.ac.destination);
    src.start();
    this.rainbowSrc = src;
  }
  stopRainbowSfx() {
    if (this.rainbowSrc) { try { this.rainbowSrc.stop(); } catch (e) { } this.rainbowSrc = null; }
  }
  flash(color) {
    const n = Date.now();
    if (color === 'blue') this.setState({ flashBlue: n });
    else if (color === 'yellow') this.setState({ flashYellow: n });
    else this.setState({ flashRed: n });
  }
  playSound(color, vol) {
    if (!this.ac) return;
    const ac = this.ac, t = ac.currentTime;
    const v = vol || 1;
    if (color === 'yellow') { // hi-hat — short bright metallic noise burst
      const dur = 0.09;
      const nb = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
      const nd = nb.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / nd.length, 1.5);
      const src = ac.createBufferSource(); src.buffer = nb;
      const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
      const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 10000; bp.Q.value = 0.7;
      const g = ac.createGain(); g.gain.setValueAtTime(0.5 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      src.connect(hp); hp.connect(bp); bp.connect(g); g.connect(ac.destination); src.start(t);
      return;
    }
    if (color === 'red') { // kick — sampled from the red drum wav
      const buf = this.redKickBuf;
      if (buf) {
        const src = ac.createBufferSource(); src.buffer = buf;
        const g = ac.createGain(); g.gain.value = 0.95 * v;
        src.connect(g); g.connect(ac.destination); src.start(t);
      } else { // fallback synth until the sample loads
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(170, t);
        o.frequency.exponentialRampToValueAtTime(45, t + 0.16);
        g.gain.setValueAtTime(0.9 * v, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.22);
      }
    } else { // snare — sampled from the blue drum wav
      const buf = this.blueDrumBuf;
      if (buf) {
        const src = ac.createBufferSource(); src.buffer = buf;
        const g = ac.createGain(); g.gain.value = 0.95 * v;
        src.connect(g); g.connect(ac.destination); src.start(t);
        return;
      }
      // fallback synth until the sample loads
      const dur = 0.14, buf2 = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
      const data = buf2.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
      const src = ac.createBufferSource(); src.buffer = buf2;
      const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400;
      const g = ac.createGain(); g.gain.setValueAtTime(0.6 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      src.connect(hp); hp.connect(g); g.connect(ac.destination); src.start(t);
      const o = ac.createOscillator(), g2 = ac.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(190, t);
      g2.gain.setValueAtTime(0.3 * v, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      o.connect(g2); g2.connect(ac.destination); o.start(t); o.stop(t + 0.1);
    }
  }

  // ---- backing music (synced to the same playhead as the sweep) ----
  playMusicStep(globalStep) {
    if (!this.ac) return;
    const ps = ((globalStep % 32) + 32) % 32;
    // 2-bar progression: Am - F - C - G (2 beats each)
    const chords = [
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [261.63, 329.63, 392.00], // C
      [196.00, 246.94, 392.00]  // G
    ];
    const basses = [110.00, 87.31, 130.81, 98.00];
    const ci = Math.floor(ps / 8);
    if (ps % 8 === 0) this.playPad(chords[ci]);
    if (ps % 4 === 0) this.playBass(basses[ci]);
    if (ps % 2 === 0) this.playHat(ps % 4 === 0 ? 0.05 : 0.085);
  }
  playPad(freqs) {
    const ac = this.ac, t = ac.currentTime;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    g.connect(ac.destination);
    freqs.forEach(f => { const o = ac.createOscillator(); o.type = 'triangle'; o.frequency.value = f; o.connect(g); o.start(t); o.stop(t + 1.5); });
  }
  playBass(f) {
    const ac = this.ac, t = ac.currentTime;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.20, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.30);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.33);
  }
  playHat(vol) {
    const ac = this.ac, t = ac.currentTime, dur = 0.035;
    const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    const src = ac.createBufferSource(); src.buffer = buf;
    const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    const g = ac.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(hp); hp.connect(g); g.connect(ac.destination); src.start(t);
  }

  hit(color) {
    this.ensureAudio();
    // 2-drum song that never uses blue: the blue drum / D key is disabled
    if (color === 'blue' && (this.currentSong().drums || 2) !== 3 && !((this.notes || []).some((n) => n.color === 'blue'))) return;
    // armed (waiting for Tap to Start): the first D/F press or drum tap begins the song
    if (this.state.armed) { this.flash(color); this.startFromArmed(); return; }
    const now = Date.now();
    this.flash(color);
    // Allow tapping during the final count-in beat ("GO", countdown===0): the playhead is
    // still parked at 0, so the first note gets an early judgement window instead of late-only.
    if (!this.state.playing && this.state.countdown !== 0) { this.playSound(color, 1); return; }

    const ph = this.playhead, { good, great, perfect } = this.windows();
    let best = -1, bestd = 1e9;
    this.notes.forEach((n, i) => {
      if (this.status[i] === 'pending' && n.color === color) {
        const d = Math.abs(n.step - ph);
        if (d < bestd) { bestd = d; best = i; }
      }
    });

    // beat-1 (downbeat) notes play the SFX 20% louder
    const isDownbeat = best >= 0 && bestd <= good && (this.notes[best].step % 16 === 0);
    this.playSound(color, isDownbeat ? 1.2 : 1);

    if (best >= 0 && bestd <= good) {
      this.status[best] = 'hit';
      this.missStreak = 0; // successful hit breaks the miss streak
      // Learn: after the beat line has reappeared, 3 clean hits fade it out again over 2 beats
      if (this.state.mode === 'learn' && this.beatShown) {
        this.learnHitsSinceShow = (this.learnHitsSinceShow || 0) + 1;
        if (this.learnHitsSinceShow >= 3) {
          this.beatShown = false;
          this.beatFadeStart = this.playhead;
          this.beatFadeEnd = this.playhead + 8; // fade over 2 beats
        }
      }
      // total 1000 pts split evenly across all notes; Great = 70%, Good = 50% of a Perfect
      const perNote = 1000 / (this.notes.length || 1);
      const sf = this.scoreFactor == null ? 1 : this.scoreFactor;
      let tier, mult;
      if (bestd <= perfect) { tier = 'PERFECT!'; mult = 1; }
      else if (bestd <= great) { tier = 'GREAT'; mult = 0.75; }
      else { tier = 'GOOD'; mult = 0.5; }
      // early/late relative to the note (only shown for GREAT/GOOD, not the perfect window)
      const timing = tier === 'PERFECT!' ? '' : (this.playhead < this.notes[best].step ? 'Early' : 'Late');
      this.setState((s) => {
        // GREAT keeps the combo; GOOD breaks it (Perfect keeps it too)
        const combo = tier === 'GOOD' ? 0 : s.combo + 1;
        const bump = tier === 'PERFECT!' ? { nPerfect: s.nPerfect + 1 } : tier === 'GREAT' ? { nGreat: s.nGreat + 1 } : { nGood: s.nGood + 1 };
        return {
          score: s.score + perNote * mult * sf, combo, best: Math.max(s.best, combo), hits: s.hits + 1,
          judge: tier, judgeTiming: timing, judgeSeq: s.judgeSeq + 1, ...bump
        };
      });
    } else {
      // wrong tap only counts if a note was actually there
      const near = this.notes.some((n, i) => this.status[i] === 'pending' && Math.abs(n.step - ph) <= good);
      if (near) this.setState((s) => ({ combo: 0, judge: 'MISS', judgeTiming: '', judgeSeq: s.judgeSeq + 1 }));
    }
  }

  renderVals() {
    const S = this.STEPS;
    const ph = this.playhead || 0;
    const ROW = 32;   // steps per stave (2 bars)
    const drums3 = (this.currentSong().drums || 2) === 3; // 3-lane layout for 3-drum songs
    // 2-drum songs whose chart never uses the blue drum: dim it, disable tapping, hide the D key hint.
    const blueDisabled = !drums3 && !((this.notes || []).some((n) => n.color === 'blue'));
    // Learn mode: the beat line disappears after 3 music bars, and dynamically reappears/re-fades
    // (see tick/hit). beatFadeStart/End (playhead steps) drive the fade; Infinity = fully visible.
    let sweepFade = 1;
    if (this.state.mode === 'learn') {
      const s = this.beatFadeStart == null ? 80 : this.beatFadeStart;
      const e = this.beatFadeEnd == null ? 88 : this.beatFadeEnd;
      sweepFade = ph <= s ? 1 : ph >= e ? 0 : (e - ph) / (e - s);
    }
    const LEAD = 1.8; // 0.45 beat: staves hand off early so the next beat-1 note shows before the sweep
    const maxSeg = Math.max(0, Math.ceil(this.songLen() / ROW) - 1);
    const curSeg = Math.max(0, Math.min(Math.floor((ph + LEAD) / ROW), maxSeg)); // 2-bar segment the sweep is in
    const activeLocalPh = ph - curSeg * ROW;                        // sweep pos within the active stave
    const revealFrac = Math.max(0, Math.min(1, activeLocalPh / ROW));// how far the sweep has crossed it
    // Scrolling-strip model: the ACTIVE row is always pinned at the top and its sweep runs across it;
    // the row below is always the NEXT segment (prep). Completing the top row scrolls the strip up one
    // row (prep slides to the top, a fresh prep row enters at the bottom) via a translateY transition.
    const ROWH = 159, ROWGAP = 9, STRIDE = ROWH + ROWGAP;
    const notes = this.notes || [];
    const status = this.status || [];
    const win = this.windows().good;
    const showFaces = this.props.showFaces !== false;
    const song = this.currentSong();
    const totalBars = song.bars;
    const bar = Math.max(-1, Math.min(totalBars, Math.floor(ph / 16) - 1));

    const buildStave = (seg, active) => {
      const rowStart = seg * ROW;
      const empty = seg > maxSeg || rowStart >= this.songLen();
      // how many bars this row actually contains (1 for the last row of an odd-bar song, else 2)
      const barsInRow = Math.max(1, Math.min(2, Math.ceil((this.songLen() - rowStart) / 16)));
      const rowSteps = barsInRow * 16; // a 1-bar row fills the whole track width so no empty bar shows
      const localPh = ph - rowStart;
      const staveNotes = empty ? [] : notes
        .map((n, i) => ({ n, i }))
        .filter(({ n }) => n.step >= rowStart && n.step < rowStart + rowSteps)
        .map(({ n, i }) => {
          const st = status[i] || 'pending';
          const p = (n.step - rowStart) / ROW;                 // 0..1 at 2-bar scale (natural per-bar width)
          const leftPct = 5 + p * 93;                          // beat 1 inset enough that the larger downbeat note isn't clipped; spans to ~98%
          const isBlue = n.color === 'blue';
          const isYellow = n.color === 'yellow';
          // lane centers within the 130px track. 3-drum songs use 3 lanes (yellow top, blue mid, red bottom).
          const top = drums3 ? (isYellow ? 26 : isBlue ? 65 : 104) : (isBlue ? 35 : 95);
          const isHere = active && st === 'pending' && Math.abs(n.step - ph) < 0.6;
          const glow = isYellow ? 'rgba(255,200,40,.9)' : isBlue ? 'rgba(41,197,230,.85)' : 'rgba(255,90,50,.85)';
          let transform = 'translate(-50%,-50%) scale(1)';
          let opacity = 1, filter = 'drop-shadow(0 2px 3px rgba(0,0,0,.55))';
          if (st === 'hit') { transform = 'translate(-50%,-50%) scale(1.7)'; opacity = 0; }
          else if (st === 'miss') { opacity = 0.2; }
          else if (isHere) { transform = 'translate(-50%,-50%) scale(1.16)'; filter = `drop-shadow(0 0 8px ${glow})`; }
          // (no gradual reveal — preview rows show all notes at full opacity under the dim overlay)
          // beat-1 (downbeat) notes render 20% larger
          const isDownbeat = (n.step % 16) === 0;
          const sz = isDownbeat ? '32px' : '27px';
          const style = {
            position: 'absolute', left: leftPct + '%', top: top + 'px', width: sz, height: sz,
            transform, opacity, filter, zIndex: Math.round((2000 - n.step) * 10),
            backgroundImage: isYellow ? 'url(@@ASSET:note-yellow.png@@)' : isBlue ? 'url(@@ASSET:note-blue.png@@)' : 'url(@@ASSET:note-red.png@@)',
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            transition: 'transform .16s ease-out, opacity .3s ease-out, filter .16s ease-out',
            pointerEvents: 'none', display: 'block'
          };
          return { id: n.id, style };
        });
      // beat-number markers — only the bars this row contains, at natural (2-bar) width
      const beats = Array.from({ length: barsInRow * 4 }, (_, b) => {
        const step = b * 4;
        const x = 5 + (step / ROW) * 93;
        const isDown = (b % 4) === 0;
        return {
          id: b, label: String((b % 4) + 1),
          style: {
            position: 'absolute', left: x + '%', top: '1px', transform: 'translateX(-50%)',
            fontSize: '10px', fontWeight: isDown ? 700 : 500,
            color: isDown ? '#ffcc33' : '#7a86a8', letterSpacing: '.5px'
          }
        };
      });
      // grid lines at constant per-bar width; a 1-bar row only covers the left half (no stretch)
      const gridStyle = {
        position: 'absolute', top: 0, bottom: 0, left: '5%', width: (barsInRow * 46.5) + '%', pointerEvents: 'none',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px calc(100%/' + (rowSteps / 2) + ')),' +
          'repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 1px, transparent 1px calc(100%/' + (rowSteps / 4) + ')),' +
          'repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 2px, transparent 2px calc(100%/' + barsInRow + '))'
      };
      const wrap = {
        display: 'flex', alignItems: 'stretch', gap: '6px', padding: '5px',
        position: 'relative', boxSizing: 'border-box', height: ROWH + 'px',
        borderRadius: '13px',
        border: active ? '2px solid #ffd23f' : '2px solid transparent',
        boxShadow: active ? '0 0 14px 1px rgba(255,204,51,.55), inset 0 0 12px rgba(255,204,51,.12)' : 'none',
        background: active ? 'rgba(255,204,51,.04)' : 'transparent',
        transition: 'border-color .15s, box-shadow .15s'
      };
      const sweepStyle = {
        position: 'absolute', top: '-2px', bottom: '-2px',
        left: (5 + localPh / ROW * 93) + '%', width: '3px', transform: 'translateX(-50%)',
        background: 'linear-gradient(180deg,#fff,#ffcc33)',
        boxShadow: '0 0 10px 2px rgba(255,204,51,.9), 0 0 22px 6px rgba(255,150,40,.5)',
        borderRadius: '2px', pointerEvents: 'none',
        opacity: active ? sweepFade : 0
      };
      const overlay = {
        position: 'absolute', inset: 0, borderRadius: '13px', pointerEvents: 'none',
        background: 'rgba(0,0,0,.6)', zIndex: 40000,
        opacity: active ? 0 : 1, transition: 'opacity .18s'
      };
      const R = React.createElement;
      const decorEls = drums3
        ? R(React.Fragment, null,
            R('div', { key: 'y', style: { position: 'absolute', left: 0, right: 0, top: 0, height: '33.34%', background: 'linear-gradient(90deg, rgba(255,200,40,.07), transparent)' } }),
            R('div', { key: 'b', style: { position: 'absolute', left: 0, right: 0, top: '33.34%', height: '33.33%', background: 'linear-gradient(90deg, rgba(41,197,230,.07), transparent)' } }),
            R('div', { key: 'r', style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '33.33%', background: 'linear-gradient(90deg, rgba(255,90,50,.07), transparent)' } }))
        : R(React.Fragment, null,
            R('div', { key: 'c', style: { position: 'absolute', left: 0, right: 0, top: '50%', height: '2px', background: 'rgba(255,255,255,.08)' } }),
            R('div', { key: 'b', style: { position: 'absolute', left: 0, right: 0, top: 0, height: '50%', background: 'linear-gradient(90deg, rgba(41,197,230,.06), transparent)' } }),
            R('div', { key: 'r', style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', background: 'linear-gradient(90deg, rgba(255,77,77,.06), transparent)' } }));
      return { id: 'r' + seg, notes: staveNotes, beats, gridStyle, wrap, sweepStyle, overlay, decorEls };
    };
    // build every 2-bar row; the strip scrolls so the active row sits at the top of the viewport
    const rows = [];
    for (let seg = 0; seg <= maxSeg; seg++) rows.push(buildStave(seg, seg === curSeg));
    // 3 visible rows. The active row normally sits in the MIDDLE slot; at the very start it's in the
    // top slot (nothing above yet) and on the final segment it drops to the bottom slot (no more scroll).
    // The active row is the top FULL row; the row you just finished peeks in above it showing its
    // bottom 2/3 (nothing above at the very start), and the following rows fill downward.
    // On the final rows the strip stops scrolling (capped), so the last bar is played in the bottom
    // slot with no further transition.
    const viewportH = Math.round(ROWH * 8 / 3 + 2 * ROWGAP);
    this.STAVE_FULL_H = viewportH;
    const k = this.stripScale || 1; // <1 on short screens: strip is scaled down so all 3 rows fit (see measureStave)
    const maxScrollY = Math.max(0, maxSeg * STRIDE + ROWH - viewportH);
    const scrollY = Math.min(curSeg === 0 ? 0 : (curSeg - 1) * STRIDE + Math.round(ROWH / 3), maxScrollY);
    // viewport flex-shrinks on short screens (so the drums always stay on-screen & tappable), but never
    // taller than the full 3-row window. The strip is normal-flow (not absolute) so overflow can clip it.
    const viewportStyle = { position: 'relative', flex: '1 1 auto', minHeight: '0', maxHeight: viewportH + 'px', overflow: 'hidden' };
    const stripStyle = {
      position: 'relative', left: 0, right: 0, top: 0,
      display: 'flex', flexDirection: 'column', gap: ROWGAP + 'px',
      width: (100 / k) + '%', transformOrigin: 'top left',
      transform: 'scale(' + k + ') translateY(' + (-scrollY) + 'px)',
      transition: 'transform .7s cubic-bezier(.4,0,.2,1)'
    };

    const now = Date.now();
    const bluePressed = now - this.state.flashBlue < 110;
    const redPressed = now - this.state.flashRed < 110;
    const drumBase = {
      position: 'relative', flex: 1, aspectRatio: '1', maxHeight: '215px', marginBottom: '-34px', border: 'none', cursor: 'pointer',
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'transform .09s ease-out, box-shadow .09s', outline: 'none'
    };
    // Each drum has a large rectangular TAP ZONE (generous invisible padding) with the drum image
    // centered inside — a big, reliable touch target for mobile. No visible border.
    const drumImgBase = {
      position: 'relative', flex: 1, height: 'min(210px, 22dvh)', maxWidth: '48%', marginBottom: '0',
      cursor: 'pointer', padding: '10px', boxSizing: 'border-box', transformOrigin: 'center bottom',
      border: 'none', background: 'transparent',
      backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain',
      backgroundOrigin: 'content-box',
      transition: 'transform .09s ease-out, filter .09s', outline: 'none', touchAction: 'none',
      WebkitTapHighlightColor: 'transparent'
    };
    const PRESS = 'translateY(3px) scale(.96)', REST = 'translateY(0) scale(1)';
    // 2-drum layout: BIG drums, each ~72% of the screen width (capped at 32% of the screen height so the
    // stave stays usable), side by side, with the outer part of each drum running off the screen edge.
    // Change DRUM2_D to resize (e.g. 'min(60%, 28dvh)' = smaller). Not used for 3-drum songs.
    const DRUM2_D = 'min(72%, 32dvh)';
    const big2 = drums3 ? {} : { flex: 'none', width: DRUM2_D, height: 'auto', aspectRatio: '1', maxWidth: 'none', padding: '4px' };
    const KEY_PAD2 = 'max(0px, calc(50% - ' + DRUM2_D + ' / 2 - 42px))'; // key (84px wide) centred over a drum centre
    const blueStyle = {
      ...drumImgBase, ...big2,
      ...(drums3 ? {} : { marginLeft: 'min(0px, calc(50% - ' + DRUM2_D + '))' }),
      backgroundImage: 'url(@@ASSET:blue-drum.png@@)',
      filter: blueDisabled ? 'grayscale(1) brightness(.55) opacity(.6)' : (bluePressed ? 'drop-shadow(0 0 26px rgba(41,197,230,.85)) brightness(1.12)' : 'drop-shadow(0 10px 16px rgba(0,0,0,.45))'),
      transform: (!blueDisabled && bluePressed) ? PRESS : REST,
      pointerEvents: blueDisabled ? 'none' : 'auto', cursor: blueDisabled ? 'default' : 'pointer'
    };
    const redStyle = {
      ...drumImgBase, ...big2,
      ...(drums3 ? {} : { marginRight: 'min(0px, calc(50% - ' + DRUM2_D + '))' }),
      backgroundImage: 'url(@@ASSET:red-drum.png@@)',
      filter: redPressed ? 'drop-shadow(0 0 26px rgba(255,90,50,.85)) brightness(1.12)' : 'drop-shadow(0 10px 16px rgba(0,0,0,.45))',
      transform: redPressed ? PRESS : REST
    };
    const yellowPressed = now - this.state.flashYellow < 110;
    const yellowStyle = {
      ...drumImgBase,
      backgroundImage: 'url(@@ASSET:yellow-drum.png@@)',
      filter: yellowPressed ? 'drop-shadow(0 0 26px rgba(255,200,40,.9)) brightness(1.12)' : 'drop-shadow(0 10px 16px rgba(0,0,0,.45))',
      transform: yellowPressed ? PRESS : REST
    };
    // 3-drum KIT layout: big red tom front-and-center, blue tom tucked behind-left, gold cymbal
    // behind-right, overlapping like a real kit (matches the reference).
    // Layout (px, from the screen size): the red drum is big and centred with its bottom edge running a bit
    // off-screen; blue (left) and yellow (right) are ~60% of its size, sit higher, overlap the red drum's edges
    // IN FRONT of it, and run off the left/right screen edge. Tweak the 0.70 / 0.31 (size), 0.6 (side drum
    // size), 0.59 (side offset) and 0.32 (side height) below. Taps are resolved by circle (see drumHandler).
    let kit = null;
    if (drums3) {
      const colW = Math.min(window.innerWidth || 390, 430), winH = window.innerHeight || 800;
      const Dr = Math.round(Math.min(0.70 * colW, 0.31 * winH)), Ds = Math.round(Dr * 0.6);
      const cyR = Math.round(0.12 * Dr) + Dr / 2; // centre y of the red drum
      const place = (cx, cy, d) => ({
        position: 'absolute', flex: 'none', maxWidth: 'none', marginBottom: '0', marginLeft: '0', marginRight: '0',
        width: d + 'px', height: d + 'px', left: Math.round(cx - d / 2) + 'px', top: Math.round(cy - d / 2) + 'px', padding: '4px'
      });
      Object.assign(redStyle,    place(colW / 2, cyR, Dr),                  { zIndex: 1 });
      // The blue drum image has more empty margin (its rim is only 88% of the image width) than the gold cymbal
      // image (99%), so give the blue box 12% more size to make the two look equally big.
      const Dsb = Math.round(Ds * 0.99 / 0.884);
      Object.assign(blueStyle,   place(colW / 2 - 0.59 * Dr, cyR - 0.31 * Dr, Dsb), { zIndex: 3 });
      Object.assign(yellowStyle, place(colW / 2 + 0.59 * Dr, cyR - 0.31 * Dr, Ds),  { zIndex: 3 });
      kit = { Dr, rowH: Math.round(1.02 * Dr), keyGap: Math.max(0, Math.round(0.59 * Dr - 84)) };
    }
    const drumsRowStyle = drums3
      ? { position: 'relative', zIndex: 10, width: '100%', height: kit.rowH + 'px', marginTop: 'auto', flexShrink: 0 }
      : { position: 'relative', zIndex: 10, padding: '0 0 6px', marginTop: 'auto', flexShrink: 0,
          display: 'flex', gap: '0', alignItems: 'flex-end', justifyContent: 'space-between' };

    // judgment element (keyed so animation restarts on each new judgment)
    const jColors = { 'PERFECT!': '#ffcc33', 'GREAT': '#b57cff', 'GOOD': '#6ee87a', 'MISS': '#ff5a5a' };
    const timingColors = { 'Early': '#4bd0ff', 'Late': '#ff6a3c' };
    const jTiming = this.state.judgeTiming;
    const judgeEl = this.state.judge ? React.createElement('div', {
      key: this.state.judgeSeq,
      style: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        whiteSpace: 'nowrap', lineHeight: 1, animation: 'popC .55s ease-out forwards', pointerEvents: 'none'
      }
    },
      (jTiming ? React.createElement('span', {
        style: { fontSize: '18px', fontWeight: 700, letterSpacing: '1px', color: timingColors[jTiming] || '#fff', textShadow: '0 2px 0 rgba(0,0,0,.4)' }
      }, jTiming) : null),
      React.createElement('span', {
        style: {
          fontSize: '38px', fontWeight: 700, letterSpacing: '1px', color: jColors[this.state.judge] || '#fff',
          textShadow: '0 3px 0 rgba(0,0,0,.4), 0 0 24px currentColor'
        }
      }, this.state.judge)
    ) : null;

    const cd = this.state.countdown;
    const countEl = (cd !== null && cd !== undefined) ? React.createElement('div', {
      key: 'c' + cd,
      style: {
        fontSize: cd === 0 ? '96px' : '110px', fontWeight: 700,
        color: cd === 0 ? '#ffcc33' : '#ffcc33',
        textShadow: '0 4px 0 #a24a08, 0 0 40px rgba(255,150,40,.6)',
        animation: 'popC .55s ease-out forwards', lineHeight: 1
      }
    }, cd === 0 ? 'GO!' : String(cd)) : null;

    const roundedScore = Math.round(this.state.score);
    const accuracy = Math.round(this.state.score / 10); // 1000 pts == 100%
    const rank = accuracy >= 100 ? 'All Perfect!!!' :
      accuracy >= 98 ? 'Nearly Perfect!' :
        accuracy >= 95 ? 'Marvelous game!' :
          accuracy >= 90 ? 'Superb game!' :
            accuracy >= 85 ? 'Talented game!' :
              accuracy >= 80 ? 'Fair game!' :
                accuracy >= 75 ? 'Rough game!' :
                  accuracy >= 60 ? 'Keep it up' :
                    accuracy >= 50 ? 'Need more practicing' : 'Try again and catch the beat';
    // stars: >500 = 1, >750 = 2, >950 = 3
    const starCount = roundedScore > 950 ? 3 : roundedScore >= 750 ? 2 : roundedScore > 500 ? 1 : 0;
    const revealed = this.state.starsRevealed || 0;
    const starsEls = React.createElement('div', {
      style: { display: 'flex', gap: '18px', margin: '6px 0 4px', height: '72px', alignItems: 'center' }
    }, [0, 1, 2].map((i) => {
      const on = i < starCount && i < revealed;
      return React.createElement('span', {
        key: `star-${i}-${on ? 'on' : 'off'}`,
        style: {
          fontSize: '64px', lineHeight: 1, display: 'inline-block',
          color: on ? '#ffcc33' : '#39332b',
          textShadow: on ? '0 4px 0 #a24a08, 0 0 26px rgba(255,190,60,.9)' : 'none',
          transform: on ? 'scale(1)' : 'scale(1)', opacity: (i < starCount ? 1 : 0.55),
          animation: on ? 'starReveal .5s cubic-bezier(.2,1.4,.5,1) both' : 'none'
        }
      }, '★');
    }));
    const nPerfect = this.state.nPerfect, nGreat = this.state.nGreat, nGood = this.state.nGood;
    const nMiss = Math.max(0, notes.length - this.state.hits);
    // count-up progress (0..1) drives the animated stat numbers in lockstep with the score
    const cp = this.state.showResult ? (this.state.countP ?? 1) : 1;
    const ci = (v) => Math.round(v * cp);
    const nPerfectShown = ci(nPerfect), nGreatShown = ci(nGreat), nGoodShown = ci(nGood), nMissShown = ci(nMiss);
    const bestShown = ci(this.state.best), hitsShown = ci(this.state.hits);
    // next level available if score > 900 and there's a higher level
    const curIdx = this.SONGS.findIndex(s => s.id === this.state.songId);
    const hasNext = curIdx >= 0 && curIdx < this.SONGS.length - 1;
    const showNext = roundedScore > 800 && hasNext;

    return {
      rows, stripStyle, viewportStyle, blueStyle, redStyle, yellowStyle, drumsRowStyle, judgeEl,
      show3: this.state.songId != null ? drums3 : (this.state.tab === 3),
      showBlueKey: !blueDisabled,
      keycapRowStyle: blueDisabled
        ? { display: 'flex', width: '100%', justifyContent: 'flex-end', paddingRight: KEY_PAD2, alignItems: 'flex-end', boxSizing: 'border-box' }
        : (drums3
            ? { display: 'flex', gap: kit.keyGap + 'px', alignItems: 'flex-end' }
            // 2 drums: put each key over the visible centre of its (big) drum
            : { display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 ' + KEY_PAD2, alignItems: 'flex-end', boxSizing: 'border-box' }),
      // Tap-to-Start overlay: sits just above the drums (the 2-drum layout has big drums, so lift it with them)
      armedOverlayStyle: {
        position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none', background: 'rgba(6,4,3,.7)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '26px',
        paddingBottom: drums3 ? (kit.rowH + 18) + 'px' : 'calc(' + DRUM2_D + ' + 26px)'
      },
      showLearnIntro: this.state.armed && this.state.mode === 'learn',
      keyHint: (() => {
        const R = React.createElement;
        const k = (c, t) => R('b', { style: { color: c } }, t);
        return this.state.tab === 3
          ? R(React.Fragment, null, 'keys ', k('#29c5e6', 'F'), ' = blue · ', k('#ff6a5a', 'Space'), ' = red · ', k('#ffcc33', 'J'), ' = yellow')
          : R(React.Fragment, null, 'keys ', k('#29c5e6', 'F'), ' = blue (La) · ', k('#ff6a5a', 'Space'), ' = red (Fa)');
      })(),
      score: roundedScore, resultScore: (this.state.scoreShown ?? roundedScore), accuracy, combo: this.state.combo, best: this.state.best,
      hits: this.state.hits, total: notes.length,
      hitsShown, bestShown, nPerfectShown, nGreatShown, nGoodShown, nMissShown,
      starsEls, nPerfect, nGreat, nGood, nMiss, showNext,
      nextLevel: () => { this.playMenuClick(); this.stopRainbowSfx(); if (hasNext) this.selectSong(this.SONGS[curIdx + 1].id); },
      showCombo: this.state.combo >= 2, showFaces,
      bpm: this.bpm(), diffLabel: this.diff().toUpperCase(), bar: bar < 0 ? '--' : bar, totalBars,
      songTitle: song.title,
      songs: this.SONGS.filter(s => (s.drums || 2) === this.state.tab).map(s => ({
        id: s.id, num: s.num, title: s.title, bpm: s.bpm,
        diffLabel: s.difficulty.toUpperCase(),
        dots: '●'.repeat(Math.min(s.num, 9)) + '○'.repeat(Math.max(0, 9 - s.num)),
        play: () => { this.playMenuClick(); this.selectSong(s.id); },
        playPlay: () => { this.playMenuClick(); this.setState({ mode: 'play' }); this.selectSong(s.id); },
        playLearn: () => { this.playMenuClick(); this.setState({ mode: 'learn' }); this.selectSong(s.id); }
      })),
      tab: this.state.tab,
      emptyTab: this.SONGS.filter(s => (s.drums || 2) === this.state.tab).length === 0,
      tab2Style: this.tabStyle(2), tab3Style: this.tabStyle(3),
      playModeStyle: this.modeStyle('play'), learnModeStyle: this.modeStyle('learn'),
      selectPlayMode: () => { this.playMenuClick(); this.setState({ mode: 'play' }); },
      selectLearnMode: () => { this.playMenuClick(); this.setState({ mode: 'learn' }); },
      selectTab2: () => { this.playMenuClick(); this.setState({ tab: 2 }); },
      selectTab3: () => { this.playMenuClick(); this.setState({ tab: 3 }); },
      showSongSelect: this.state.songId == null,
      playIcon: this.state.playing ? '❚❚' : '▶',
      showResult: this.state.showResult, showFail: this.state.showFail, rank,
      countEl, armed: this.state.armed,
      showPauseMenu: this.state.songId != null && !this.state.playing && !this.state.showResult && !this.state.showFail && !this.state.armed && !this.state.starting && this.state.countdown == null,
      resume: () => { this.playMenuClick(); this.beginPlay(this.musicPausedAt || 0); },
      quit: () => { this.playMenuClick(); this.stopMusic(); if (this.countTimer) clearTimeout(this.countTimer); this.setState({ songId: null, showResult: false, playing: false, countdown: null }); },
      togglePlay: () => { if (this.state.songId != null && !this.state.showResult) { this.playMenuClick(); this.last = null; if (this.state.playing) this.stopMusic(); this.setState((s) => ({ playing: !s.playing })); } },
      restart: () => { this.playMenuClick(); this.stopRainbowSfx(); this.stopMusic(); if (this.countTimer) clearTimeout(this.countTimer); this.ensureAudio(); this.musicPausedAt = 0; this.armedAt = Date.now(); this.setState({ showResult: false, showFail: false, armed: true, playing: false, countdown: null, score: 0, combo: 0, best: 0, hits: 0, nPerfect: 0, nGreat: 0, nGood: 0, nMiss: 0, judge: '' }, () => { this.missStreak = 0; this.scoreFactor = 1; this.beatShown = false; this.learnHitsSinceShow = 0; this.beatFadeStart = 80; this.beatFadeEnd = 88; this.notes = this.buildNotes(); this.status = this.notes.map(() => 'pending'); this.playhead = 0; this.lastMusicStep = -1; this.last = null; this.forceUpdate(); }); },
      backToList: () => { this.playMenuClick(); this.stopRainbowSfx(); this.stopMusic(); if (this.countTimer) clearTimeout(this.countTimer); this.setState({ songId: null, showResult: false, showFail: false, playing: false, countdown: null }); },
      tapBlue: (e) => { e.preventDefault(); if (!blueDisabled) this.hit('blue'); },
      tapRed: (e) => { e.preventDefault(); this.hit('red'); },
      tapYellow: (e) => { e.preventDefault(); this.hit('yellow'); }
    };
  }
}
