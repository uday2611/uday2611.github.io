(() => {
  "use strict";
  const D = window.PORTFOLIO || {};
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ph = (val, fallback) => (val ? esc(val) : `<span class="placeholder">${esc(fallback)}</span>`);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof gsap !== "undefined";
  if (hasGsap && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------ */
  /* Render content from data.js                                         */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    github: '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>',
    linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>',
    x: '<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"/>',
    instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/>',
  };
  const LABELS = { github: "GitHub", linkedin: "LinkedIn", x: "X / Twitter", instagram: "Instagram" };
  const socials = D.socials || {};
  const contact = D.contact || {};

  const socialKeys = Object.keys(ICONS).filter((k) => socials[k]);
  $("#socialRail").innerHTML = socialKeys
    .map((k) => `<a href="${esc(socials[k])}" target="_blank" rel="noopener" aria-label="${LABELS[k]}" data-hover><svg viewBox="0 0 24 24">${ICONS[k]}</svg></a>`)
    .join("");

  // Name / initials
  const fullName = D.name || "Your Name";
  const [first, ...rest] = fullName.trim().split(/\s+/);
  $("#heroFirst").textContent = first.toUpperCase();
  $("#heroLast").textContent = rest.join(" ").toUpperCase();
  const initials = D.initials || fullName.split(/\s+/).map((w) => w[0]).join("").toUpperCase();
  $("#navLogo").textContent = $("#loaderLogo").textContent = initials;
  $("#footName").textContent = $("#footName2").textContent = fullName;

  $("#heroLocation").textContent = D.location || "";

  // Roles: need ≥3 elements so a word can sit faded above the active one while the next slides in
  let roles = (D.roles || []).filter(Boolean);
  if (roles.length === 2) roles = roles.concat(roles);
  $("#roleSwap").innerHTML = roles.map((r) => `<span>${esc(r.toUpperCase())}</span>`).join("");

  // Resume
  const resumeEl = $("#resumeLink"), navResume = $("#navResume");
  if (D.resume) resumeEl.href = navResume.href = D.resume;
  else { resumeEl.remove(); navResume.remove(); }

  // Loader marquee words
  const lm = (D.marquee || roles).map((m) => `<span>${esc(m.toUpperCase())}</span>`).join("");
  $("#loaderMarquee").innerHTML = lm + lm;

  // About
  const aboutText = D.about || "Your introduction goes here — who you are, what you build, and what drives your work. Fill this in from data.js.";
  $("#aboutText").innerHTML = aboutText.split(/\s+/).map((w) => `<span class="w${D.about ? "" : " placeholder"}">${esc(w)}</span>`).join("");
  $("#aboutStats").innerHTML = (D.stats || [])
    .map((s) => `<div class="stat"><b class="${s.value ? "" : "placeholder"}">${s.value ? esc(s.value) : "—"}</b><span class="mono">${esc(s.label)}</span></div>`)
    .join("");

  // Marquee (duplicated for seamless loop)
  const mq = (D.marquee || []).map((m) => `<span>${esc(m)}</span>`).join("");
  $("#marqueeTrack").innerHTML = mq + mq;

  // Services
  $("#servicesList").innerHTML = (D.services || [])
    .map((s, i) => `
      <article class="service${i === 0 ? " is-open" : ""}">
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        <h3>${esc((s.title || "").toUpperCase())}</h3>
        <p class="service-sub">${ph(s.subtitle, "Short subtitle")}</p>
        <p class="service-desc">${ph(s.description, "Describe what you offer here.")}</p>
        <div class="service-body"><div>
          <h5>Skillset &amp; tools</h5>
          <div class="tags">${(s.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div></div>
        <button class="service-toggle" aria-expanded="${i === 0}" aria-label="Toggle ${esc(s.title)} details" data-hover>
          <svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg>
        </button>
      </article>`)
    .join("");
  document.querySelectorAll(".service").forEach((card) => {
    const btn = card.querySelector(".service-toggle");
    const toggle = () => {
      const open = !card.classList.contains("is-open");
      document.querySelectorAll(".service").forEach((s) => { s.classList.remove("is-open"); s.querySelector(".service-toggle").setAttribute("aria-expanded", "false"); });
      if (open) { card.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
      setTimeout(() => hasGsap && window.ScrollTrigger && ScrollTrigger.refresh(), 650);
    };
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(); });
    card.addEventListener("click", (e) => { if (!card.classList.contains("is-open") && !e.target.closest("a")) toggle(); });
  });

  // Career
  $("#timeline").insertAdjacentHTML("beforeend", (D.career || [])
    .map((c) => `
      <div class="tl-item">
        <div>
          <h4>${ph(c.role, "Position in company")}</h4>
          <h5>${ph(c.company, "Company name")}</h5>
        </div>
        <h3>${c.year ? esc(c.year) : "20XX"}</h3>
        <p>${ph(c.description, "A short summary of your responsibilities and achievements.")}</p>
      </div>`)
    .join(""));

  // Work slider
  const projects = D.projects || [];
  $("#workTrack").innerHTML = projects
    .map((p, i) => `
      <article class="work-slide" aria-roledescription="slide" aria-label="${i + 1} of ${projects.length}">
        <div class="work-info">
          <span class="num">${String(i + 1).padStart(2, "0")}</span>
          <div>
            <h4>${ph(p.title, "Project name")}</h4>
            <p class="work-cat">${ph(p.category, "Category")}</p>
            ${p.description ? `<p class="work-desc">${esc(p.description)}</p>` : ""}
            <h5 class="mono">Tools &amp; features</h5>
            <p class="work-tools">${ph(p.tools, "Add the stack used")}</p>
            ${p.link ? `<a class="work-visit" href="${esc(p.link)}" target="_blank" rel="noopener" data-hover>View project ↗</a>` : ""}
          </div>
        </div>
        <div class="work-media">
          ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" />` : `<div class="work-ph" style="--x:${20 + ((i * 37) % 60)}%;--y:${20 + ((i * 53) % 60)}%"><span>Project image</span></div>`}
        </div>
      </article>`)
    .join("");
  $("#workDots").innerHTML = projects.map((_, i) => `<button role="tab" aria-label="Project ${i + 1}" data-hover></button>`).join("");
  (function slider() {
    const track = $("#workTrack"), dots = [...document.querySelectorAll("#workDots button")];
    const n = projects.length;
    let cur = 0;
    const go = (i) => {
      cur = (i + n) % n;
      track.style.transform = `translateX(${-cur * 100}%)`;
      dots.forEach((d, k) => { d.classList.toggle("is-active", k === cur); d.setAttribute("aria-selected", k === cur); });
      [...track.children].forEach((s, k) => s.toggleAttribute("inert", k !== cur));
    };
    $("#workPrev").addEventListener("click", () => go(cur - 1));
    $("#workNext").addEventListener("click", () => go(cur + 1));
    dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
    // swipe
    let sx = null;
    track.addEventListener("pointerdown", (e) => (sx = e.clientX));
    addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
    });
    $("#workSlider").addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
    });
    if (n < 2) document.querySelectorAll(".work-arrow, #workDots").forEach((el) => (el.style.display = "none"));
    if (n) go(0);
  })();

  // Contact
  const mailEl = $("#contactMail");
  const navEmail = $("#navEmail");
  if (contact.email) {
    mailEl.href = navEmail.href = `mailto:${contact.email}`;
    mailEl.innerHTML = `${esc(contact.email)} <span>↗</span>`;
    navEmail.textContent = contact.email;
  } else {
    mailEl.href = navEmail.href = "#contact";
    mailEl.innerHTML = `<span class="placeholder">your@email.com</span> <span>↗</span>`;
    navEmail.innerHTML = `<span class="placeholder">your@email.com</span>`;
  }
  const socialLinks = socialKeys
    .map((k) => `<a href="${esc(socials[k])}" target="_blank" rel="noopener" data-hover>${LABELS[k]} ↗</a>`)
    .join("") || `<p class="placeholder">Not added yet</p>`;
  $("#contactGrid").innerHTML = `
    <div><h4 class="mono">Email</h4>${contact.email ? `<a href="mailto:${esc(contact.email)}" data-hover>${esc(contact.email)}</a>` : `<p class="placeholder">Not added yet</p>`}</div>
    <div><h4 class="mono">Phone</h4>${contact.phone ? `<a href="tel:${esc(contact.phone.replace(/\s/g, ""))}" data-hover>${esc(contact.phone)}</a>` : `<p class="placeholder">Not added yet</p>`}</div>
    <div><h4 class="mono">Social</h4>${socialLinks}</div>
    ${D.resume ? `<div><h4 class="mono">Resume</h4><a href="${esc(D.resume)}" target="_blank" rel="noopener" data-hover>View resume ↗</a><a href="${esc(D.resume)}" download="Uday-Chahal-Resume.pdf" data-hover>Download PDF ↓</a></div>` : ""}`;
  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* Nav                                                                 */
  /* ------------------------------------------------------------------ */
  const nav = $("#nav");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", scrollY > 40);
    document.body.classList.toggle("past-hero", scrollY > innerHeight * 0.6);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  $("#navToggle").addEventListener("click", () => document.body.classList.toggle("menu-open"));
  document.querySelectorAll("#navLinks a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));

  /* ------------------------------------------------------------------ */
  /* Cursor                                                              */
  /* ------------------------------------------------------------------ */
  const cursor = $("#cursor");
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", (e) => cursor.classList.toggle("is-hover", !!e.target.closest("[data-hover], a, button")));
  }

  /* ------------------------------------------------------------------ */
  /* Shared 3D helpers                                                   */
  /* ------------------------------------------------------------------ */
  const ACCENT = 0xc8f560;
  function setupRenderer(canvas) {
    let r;
    try { r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return null; }
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    r.outputEncoding = THREE.sRGBEncoding;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.05;
    return r;
  }
  // Small studio environment (soft boxes) for glossy reflections — no external HDR needed
  function makeEnv(renderer) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshBasicMaterial({ color: 0x15161b, side: THREE.BackSide })));
    const panel = (c, x, y, z, w, h) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m);
    };
    panel(0xffffff, 0, 6, 5, 9, 3);
    panel(0xdde6ff, -7, 2, 3, 3, 5);
    panel(ACCENT, 7, 0, -3, 3, 7);
    panel(0x9aa8ff, -6, -1, -5, 4, 5);
    const tex = pmrem.fromScene(s, 0.04).texture;
    pmrem.dispose();
    return tex;
  }

  /* ------------------------------------------------------------------ */
  /* Hero 3D — character (Three.js)                                      */
  /* ------------------------------------------------------------------ */
  const heroState = { scroll: 0, intro: 0 };
  (function initHero() {
    const canvas = $("#heroCanvas");
    if (typeof THREE === "undefined" || !canvas) return;
    const renderer = setupRenderer(canvas);
    if (!renderer) return;
    const scene = new THREE.Scene();
    scene.environment = makeEnv(renderer);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1b20, 0.35));
    const key = new THREE.DirectionalLight(0xfff0e4, 0.9); key.position.set(-3, 4, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(ACCENT, 2.2); rim.position.set(4, 3, -4); scene.add(rim);
    const rim2 = new THREE.DirectionalLight(0x8fa6ff, 1.1); rim2.position.set(-5, 1, -3); scene.add(rim2);

    /* --- stylised character (original design, built from primitives) --- */
    const M = (c, r = 0.55, extra = {}) => new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.5, envMapIntensity: 0.35, ...extra });
    const skinMat = M(0xc68863, 0.5), hairMat = M(0x0b0908, 0.6, { clearcoat: 0.5 }), darkMat = M(0x0d0d10, 0.35);
    const hoodMat = M(0x1b1d23, 0.9, { clearcoat: 0, envMapIntensity: 0.25 }), whiteMat = M(0xf7f5f0, 0.15, { clearcoat: 1, envMapIntensity: 0.6 }), accMat = M(ACCENT, 0.5);
    const S = (r, ...a) => new THREE.SphereGeometry(r, 48, 32, ...a);
    const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };

    const character = new THREE.Group();
    const proc = new THREE.Group();
    character.add(proc);

    // torso (hoodie) from a lathe profile, flattened front-to-back
    const prof = new THREE.SplineCurve([
      new THREE.Vector2(0.001, 0.15), new THREE.Vector2(0.55, 0.12), new THREE.Vector2(1.2, -0.12),
      new THREE.Vector2(1.6, -0.55), new THREE.Vector2(1.72, -1.3), new THREE.Vector2(1.78, -3.2),
    ]).getPoints(40);
    const torso = new THREE.Mesh(new THREE.LatheGeometry(prof, 64), hoodMat);
    torso.scale.set(1, 1, 0.62);
    torso.position.y = -1.0;
    const collar = mesh(new THREE.TorusGeometry(0.5, 0.16, 20, 48), hoodMat, 0, -0.92, 0);
    collar.rotation.x = Math.PI / 2; collar.scale.set(1, 0.8, 1);
    const cordGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.7, 10);
    const cordL = mesh(cordGeo, accMat, -0.2, -1.35, 0.55), cordR = mesh(cordGeo, accMat, 0.2, -1.4, 0.55);
    cordL.rotation.z = 0.05; cordR.rotation.z = -0.04;
    const tipGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 10);
    cordL.add(mesh(tipGeo, accMat, 0, -0.38, 0)); cordR.add(mesh(tipGeo, accMat, 0, -0.38, 0));
    const body = new THREE.Group();
    body.add(torso, collar, cordL, cordR);
    body.add(mesh(new THREE.CylinderGeometry(0.31, 0.36, 0.6, 32), skinMat, 0, -0.62, 0)); // neck
    proc.add(body);

    // head — pivots at the neck
    const head = new THREE.Group();
    head.position.y = -0.45;
    const skull = mesh(S(0.95), skinMat, 0, 0.78, 0); skull.scale.set(0.9, 1.08, 0.95);
    head.add(skull);
    const hairCap = mesh(S(1.0, 0, Math.PI * 2, 0, Math.PI * 0.5), hairMat, 0, 0.86, -0.04);
    hairCap.material.side = THREE.DoubleSide; hairCap.scale.set(0.96, 1.1, 1.0); hairCap.rotation.x = -0.32;
    head.add(hairCap);
    [[-0.45, 1.55, 0.42, 0.34], [-0.1, 1.68, 0.46, 0.38], [0.28, 1.62, 0.44, 0.36], [0.55, 1.45, 0.32, 0.3]].forEach(([x, y, z, r]) => {
      const tuft = mesh(S(r), hairMat, x, y, z); tuft.scale.set(1.15, 0.6, 0.9); tuft.rotation.z = -x * 0.4; head.add(tuft);
    });
    [-1, 1].forEach((s) => { const ear = mesh(S(0.2), skinMat, s * 0.86, 0.72, 0); ear.scale.set(0.5, 1, 0.8); head.add(ear); });
    const eyes = [], pupils = [];
    [-1, 1].forEach((s) => {
      const eye = new THREE.Group(); eye.position.set(s * 0.32, 0.86, 0.78);
      const white = mesh(S(0.16), whiteMat); white.scale.set(1, 1.12, 0.6);
      const pupil = new THREE.Group(); pupil.position.z = 0.07;
      pupil.add(mesh(S(0.085), darkMat), mesh(S(0.024), whiteMat, 0.03, 0.035, 0.07));
      eye.add(white, pupil); head.add(eye); eyes.push(eye); pupils.push(pupil);
      const brow = mesh(new THREE.BoxGeometry(0.34, 0.07, 0.08), hairMat, s * 0.33, 1.1, 0.8);
      brow.rotation.z = s * -0.1; head.add(brow);
    });
    const nose = mesh(S(0.11), skinMat, 0, 0.64, 0.93); nose.scale.set(1, 1.15, 1); head.add(nose);
    const mouth = mesh(new THREE.TorusGeometry(0.16, 0.028, 12, 32, Math.PI), darkMat, 0, 0.36, 0.8);
    mouth.rotation.z = Math.PI; mouth.scale.set(1, 0.55, 1); head.add(mouth);
    proc.add(head);
    character.position.y = 0.15;
    scene.add(character);

    /* --- optional: your own .glb avatar (data.js → avatar.model) --- */
    const cfg = D.avatar || {};
    let mixer = null, headBone = null, headBase = null;
    if (cfg.model && THREE.GLTFLoader) {
      new THREE.GLTFLoader().load(cfg.model, (g) => {
        const model = g.scene;
        const box = new THREE.Box3().setFromObject(model);
        model.scale.setScalar((cfg.height || 4.4) / box.getSize(new THREE.Vector3()).y);
        box.setFromObject(model);
        const c = box.getCenter(new THREE.Vector3());
        model.position.sub(c);
        model.position.y += cfg.offsetY ?? -0.9;
        model.traverse((o) => { if (!headBone && /head/i.test(o.name) && (o.isBone || o.type === "Object3D")) headBone = o; });
        if (headBone) headBase = headBone.rotation.clone();
        if (g.animations && g.animations.length) { mixer = new THREE.AnimationMixer(model); mixer.clipAction(g.animations[0]).play(); }
        character.remove(proc);
        character.add(model);
      }, undefined, (err) => console.warn("Avatar model failed to load — using the built-in character.", err));
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    addEventListener("pointermove", (e) => { mouse.tx = (e.clientX / innerWidth) * 2 - 1; mouse.ty = -(e.clientY / innerHeight) * 2 + 1; });

    let mobile = false;
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      mobile = w < 900;
      // mobile: pull back and sit the character higher (text sits underneath)
      camera.position.set(0, mobile ? -1.6 : 0.1, mobile ? 15 : 9.5);
      camera.lookAt(0, mobile ? -1.6 : 0.1, 0);
      camera.updateProjectionMatrix();
    }
    resize();
    addEventListener("resize", resize);

    let visible = true, nextBlink = 2.5;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
    const clock = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const I = heroState.intro, s = heroState.scroll;


      // character: rise in on intro, follow the cursor, breathe, blink
      character.position.y = 0.15 - (1 - I) * 1.2 + s * 2;
      character.scale.setScalar(0.85 + I * 0.15);
      body.rotation.y = mouse.x * 0.12;
      head.rotation.y = mouse.x * 0.45;
      head.rotation.x = -mouse.y * 0.22;
      head.rotation.z = -mouse.x * 0.05;
      if (!reduced) { torso.scale.y = 1 + Math.sin(t * 1.6) * 0.006; head.position.y = -0.45 + Math.sin(t * 1.6) * 0.008; }
      pupils.forEach((p) => { p.position.x = mouse.x * 0.045; p.position.y = mouse.y * 0.04; });
      if (t > nextBlink) { const k = t - nextBlink; const sy = k < 0.07 ? 1 - k / 0.07 * 0.9 : k < 0.16 ? 0.1 + (k - 0.07) / 0.09 * 0.9 : 1; eyes.forEach((e) => (e.scale.y = sy)); if (k >= 0.16) nextBlink = t + 2.5 + Math.random() * 3; }

      if (mixer) mixer.update(dt);
      if (headBone) {
        if (!mixer) headBone.rotation.copy(headBase);
        headBone.rotation.y += mouse.x * 0.45;
        headBone.rotation.x += -mouse.y * 0.22;
      }
      renderer.render(scene, camera);
    })();
  })();

  /* ------------------------------------------------------------------ */
  /* Tech stack — 3D glossy balls with physics (Three.js)                */
  /* ------------------------------------------------------------------ */
  (function initStack() {
    const canvas = $("#stackCanvas");
    const labels = D.techStack || [];
    if (typeof THREE === "undefined" || !canvas || !labels.length) return;
    const renderer = setupRenderer(canvas);
    if (!renderer) return;
    const scene = new THREE.Scene();
    scene.environment = makeEnv(renderer);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x111114, 0.4));
    const kl = new THREE.DirectionalLight(0xffffff, 0.9); kl.position.set(-1, 2, 3); scene.add(kl);
    const rl = new THREE.DirectionalLight(ACCENT, 0.9); rl.position.set(2, -1, 1); scene.add(rl);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 5000);
    camera.position.z = 2500;

    // Label texture: equirectangular canvas, text centred where the sphere faces the camera (u = .25)
    const STYLES = [
      { bg: "#c8f560", fg: "#0b0d04" },
      { bg: "#1c1d23", fg: "#ecebe6" },
      { bg: "#1c1d23", fg: "#ecebe6" },
      { bg: "#ecebe6", fg: "#0b0c0e" },
      { bg: "#1c1d23", fg: "#c8f560" },
    ];
    function labelTexture(text, st) {
      const c = document.createElement("canvas"); c.width = 1024; c.height = 512;
      const x = c.getContext("2d");
      x.fillStyle = st.bg; x.fillRect(0, 0, 1024, 512);
      let fs = 74;
      x.font = `600 ${fs}px "Space Grotesk", sans-serif`;
      const w = x.measureText(text).width;
      if (w > 190) { fs = Math.floor(fs * 190 / w); x.font = `600 ${fs}px "Space Grotesk", sans-serif`; }
      x.fillStyle = st.fg; x.textAlign = "center"; x.textBaseline = "middle";
      x.fillText(text, 256, 260); x.fillText(text, 768, 260);
      const tex = new THREE.CanvasTexture(c);
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    }

    const sphereGeo = new THREE.SphereGeometry(1, 64, 40);
    let W = 0, H = 0, balls = [], started = false, running = false;
    const mouse = { x: -9999, y: -9999 };

    function build() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      renderer.setSize(W, H, false);
      Object.assign(camera, { left: -W / 2, right: W / 2, top: H / 2, bottom: -H / 2 });
      camera.updateProjectionMatrix();
      balls.forEach((b) => { scene.remove(b.mesh); b.mesh.material.map.dispose(); b.mesh.material.dispose(); });
      let scale = Math.max(0.6, Math.min(1.15, W / 1150));
      const radii = labels.map((_, i) => 46 + (i % 4) * 11);
      const area = radii.reduce((a, r) => a + Math.PI * r * r, 0) * scale * scale;
      if (area > W * H * 0.3) scale *= Math.sqrt((W * H * 0.3) / area);
      balls = labels.map((label, i) => {
        const r = radii[i] * scale;
        const mat = new THREE.MeshPhysicalMaterial({
          map: labelTexture(label, STYLES[i % STYLES.length]), roughness: 0.28, metalness: 0.05,
          clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.1,
        });
        const m = new THREE.Mesh(sphereGeo, mat);
        m.scale.setScalar(r);
        scene.add(m);
        return {
          mesh: m, r, ph: Math.random() * 6.28,
          x: W / 2 + (Math.random() - 0.5) * W * 0.8,
          y: H / 2 + (Math.random() - 0.5) * H * 0.6,
          vx: 0, vy: 0,
        };
      });
    }

    function step() {
      const cx = W / 2, cy = H / 2;
      for (const b of balls) {
        b.vx += (cx - b.x) * 0.0009;
        b.vy += (cy - b.y) * 0.0012;
        const dx = b.x - mouse.x, dy = b.y - mouse.y, d = Math.hypot(dx, dy), R = b.r + 80;
        if (d < R && d > 0.01) { const f = (1 - d / R) * 2.4; b.vx += (dx / d) * f; b.vy += (dy / d) * f; }
        b.vx *= 0.9; b.vy *= 0.9;
        b.x += b.vx; b.y += b.vy;
      }
      for (let k = 0; k < 5; k++)
        for (let i = 0; i < balls.length; i++)
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i], b = balls[j];
            const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01, min = a.r + b.r + 4;
            if (d < min) {
              const o = (min - d) / 2, nx = dx / d, ny = dy / d;
              a.x -= nx * o; a.y -= ny * o; b.x += nx * o; b.y += ny * o;
            }
          }
      for (const b of balls) {
        b.x = Math.max(b.r, Math.min(W - b.r, b.x));
        b.y = Math.max(b.r, Math.min(H - b.r, b.y));
      }
    }

    const t0 = performance.now();
    function draw() {
      const t = (performance.now() - t0) / 1000;
      balls.forEach((b, i) => {
        b.mesh.position.set(b.x - W / 2, H / 2 - b.y, -i * 140); // own depth: overlaps occlude instead of intersecting
        // tilt with velocity + a gentle idle wobble; labels settle back facing the viewer
        b.mesh.rotation.y = b.vx * 0.05 + (reduced ? 0 : Math.sin(t * 0.7 + b.ph) * 0.18);
        b.mesh.rotation.x = b.vy * 0.05 + (reduced ? 0 : Math.cos(t * 0.6 + b.ph) * 0.1);
      });
      renderer.render(scene, camera);
    }

    function loop() { if (!running) return; step(); draw(); requestAnimationFrame(loop); }

    canvas.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });

    build();
    document.fonts && document.fonts.ready.then(() => { build(); draw(); });
    addEventListener("resize", () => { started = true; build(); draw(); });
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { started = true; if (!running) { running = true; loop(); } }
      else running = false;
    }, { threshold: 0.15 }).observe(canvas);
  })();

  /* ------------------------------------------------------------------ */
  /* Loader → intro → scroll animations                                  */
  /* ------------------------------------------------------------------ */
  // Stacked roles: active word solid, previous word faded above it, next slides up from below
  function rolesLoop() {
    const words = [...document.querySelectorAll("#roleSwap span")];
    if (!words.length) return;
    words.forEach((w, k) => w.classList.toggle("is-active", k === 0));
    if (!hasGsap || words.length < 3) return;
    gsap.set(words, { yPercent: 100, opacity: 0 });
    gsap.set(words[0], { yPercent: 0, opacity: 1 });
    gsap.set(words[words.length - 1], { yPercent: -100, opacity: 1 });
    words[words.length - 1].classList.add("is-prev");
    let i = 0;
    const n = words.length;
    const apply = () => words.forEach((w, k) => {
      w.classList.toggle("is-active", k === i);
      w.classList.toggle("is-prev", k === (i - 1 + n) % n);
    });
    setInterval(() => {
      if (document.hidden) return;
      const prev = words[(i - 1 + n) % n], cur = words[i];
      i = (i + 1) % n;
      const next = words[i];
      const opts = { duration: 0.9, ease: "expo.inOut", overwrite: true };
      gsap.to(prev, { yPercent: -200, opacity: 0, ...opts });
      gsap.to(cur, { yPercent: -100, opacity: 1, ...opts });
      gsap.fromTo(next, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ...opts });
      apply();
    }, 2800);
  }

  function intro() {
    document.body.classList.remove("is-loading");
    if (!hasGsap || reduced) { heroState.intro = 1; $("#loader").remove(); rolesLoop(); scrollAnimations(); return; }
    const tl = gsap.timeline();
    tl.to(".loader-pill-inner", { opacity: 0, duration: 0.25, onStart: () => $("#loaderPill").classList.add("is-done") })
      .to("#loaderPill", { scaleX: () => (innerWidth / $("#loaderPill").offsetWidth) * 1.6, scaleY: () => (innerHeight / $("#loaderPill").offsetHeight) * 1.6, duration: 0.9, ease: "expo.in" })
      .to("#loader", { opacity: 0, duration: 0.5, onComplete: () => $("#loader").remove() })
      .to(heroState, { intro: 1, duration: 2.2, ease: "expo.out" }, "-=0.5")
      .from(".hero-name .line > span", { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out" }, "-=2.0")
      .from([".hero-hello", ".hero-loc", ".role-swap", ".scroll-hint", ".social-rail", ".resume-link", ".nav"], { opacity: 0, y: 20, duration: 1, stagger: 0.06, ease: "power3.out" }, "-=1.4");
    rolesLoop();
    scrollAnimations();
  }

  function scrollAnimations() {
    if (typeof ScrollTrigger === "undefined") return;

    // Hero orb drifts up on scroll
    ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", scrub: true, onUpdate: (s) => (heroState.scroll = s.progress) });
    gsap.to([".hero-name", ".hero-roles"], { yPercent: -30, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    // About words light up
    gsap.to("#aboutText .w", {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: "#aboutText", start: "top 80%", end: "bottom 45%", scrub: true },
    });

    // Titles & generic reveals
    document.querySelectorAll(".big-title, .services-title, .contact-title, .section-label, .stat, .service, .work-slider, .contact-mail, .contact-grid > div").forEach((el) =>
      gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } })
    );

    // Timeline
    gsap.to("#timelineProgress", { height: "100%", ease: "none", scrollTrigger: { trigger: "#timeline", start: "top 65%", end: "bottom 65%", scrub: true } });
    document.querySelectorAll(".tl-item").forEach((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 65%", onEnter: () => el.classList.add("is-active"), onLeaveBack: () => el.classList.remove("is-active") })
    );

    addEventListener("load", () => ScrollTrigger.refresh());
  }

  // Loader counter (waits for window load, minimum ~1.4s for the effect)
  const numEl = $("#loaderNum"), barEl = $("#loaderPill");
  let shown = 0, loaded = document.readyState === "complete";
  const t0 = performance.now();
  addEventListener("load", () => (loaded = true));
  (function count() {
    const elapsed = performance.now() - t0;
    const cap = loaded ? 100 : Math.min(90, (elapsed / 1400) * 90);
    const target = loaded && elapsed > 1200 ? 100 : cap;
    shown += (target - shown) * 0.08 + 0.15;
    shown = Math.min(shown, target);
    numEl.textContent = Math.floor(shown);
    barEl.style.setProperty("--p", shown.toFixed(1));
    if (shown >= 99.9) { numEl.textContent = "100"; setTimeout(intro, reduced ? 0 : 250); }
    else requestAnimationFrame(count);
  })();
})();
