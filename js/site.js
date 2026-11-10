/* Shared behaviour for every page. Content lives in content.js. */
(function () {
  const page = document.body.dataset.page;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');

  /* ---------- Header & footer ---------- */
  const links = [
    ...Object.entries(SECTIONS).map(([key, s]) => [s.page, s.title, key]),
    ['services.html', 'Services', 'services'],
    ['contact.html', 'Contact', 'contact'],
  ];
  $('#site-header').outerHTML = `
    <header class="site-header">
      <div class="wrap">
        <a class="logo" href="index.html">${esc(SITE.name)}</a>
        <button class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
        <nav class="nav">
          ${links.map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
      </div>
    </header>`;
  $('#site-footer').outerHTML = `
    <footer class="site-footer">
      <div class="wrap">
        <span>© ${new Date().getFullYear()} ${esc(SITE.name)} · ${esc(SITE.location)}</span>
        <div class="socials">
          ${SITE.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}
          <a href="mailto:${esc(SITE.email)}">Email</a>
        </div>
      </div>
    </footer>`;

  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  $('.menu-btn').addEventListener('click', (e) => {
    const open = document.body.classList.toggle('menu-open');
    e.currentTarget.setAttribute('aria-expanded', open);
  });

  /* ---------- Media helpers ---------- */
  // Use your own still if set; otherwise YouTube's full-size thumbnail; otherwise the placeholder.
  const thumbOf = (p) => p.thumb || (p.video && p.video.type === 'youtube' ? `https://i.ytimg.com/vi/${p.video.id}/maxresdefault.jpg` : '');
  // Vertical work (Instagram reels, or anything marked vertical: true) gets a tall layout.
  const isVertical = (p) => p.vertical ?? (p.video && (p.video.type === 'instagram' || !!p.video.vertical));
  // onPage = the section page (wide still with a play button). A project can set pageThumb / pageThumbPos /
  // pageThumbZoom to use a different still or crop there, without changing its home-page card.
  const still = (p, onPage = false) => {
    const src = (onPage && p.pageThumb) || thumbOf(p);
    const pos = onPage && p.pageThumb ? p.pageThumbPos : (onPage && p.pageThumbPos) || p.thumbPos;
    const zoom = onPage && (p.pageThumb || p.pageThumbZoom) ? p.pageThumbZoom : p.thumbZoom;
    return src
      ? `<img src="${esc(src)}" alt="" loading="lazy" style="${pos ? `object-position:${esc(pos)};--o:${esc(pos)};` : ""}${zoom ? `--z:${Number(zoom)};` : ""}">`
      : `<div class="ph" style="--h:${p.hue ?? 210}"></div>`;
  };

  /* ---------- Lightbox ---------- */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `<span class="lightbox-title"></span><button class="lightbox-close">Close ✕</button><div class="lightbox-frame"></div>`;
  document.body.appendChild(lb);
  const frame = $('.lightbox-frame', lb);

  function openVideo(video, title) {
    $('.lightbox-title', lb).textContent = title || '';
    frame.classList.toggle('vertical', !!(video && (video.type === 'instagram' || video.vertical)));
    frame.classList.toggle('tiktok', !!(video && video.type === 'tiktok'));
    if (video && video.type === 'tiktok') {
      frame.innerHTML = `<iframe src="https://www.tiktok.com/player/v1/${encodeURIComponent(video.id)}?autoplay=1&rel=0&description=0&music_info=1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (video && video.type === 'instagram') {
      frame.innerHTML = `<iframe src="https://www.instagram.com/reel/${encodeURIComponent(video.id)}/embed/" allow="autoplay; encrypted-media; fullscreen" allowfullscreen scrolling="no"></iframe>`;
    } else if (video && video.type === 'youtube') {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(video.id)}?autoplay=1&rel=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (video && video.type === 'vimeo') {
      frame.innerHTML = `<iframe src="https://player.vimeo.com/video/${esc(video.id)}?autoplay=1&title=0&byline=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (video && video.type === 'file') {
      frame.innerHTML = `<video src="${esc(video.src)}" controls autoplay playsinline></video>`;
    } else {
      frame.innerHTML = `<div class="lightbox-empty"><div><strong>Coming soon</strong>This film will be up shortly.</div></div>`;
    }
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('.lightbox-close', lb).focus();
  }
  function closeVideo() {
    delete lb.dataset.fs;
    if (document.fullscreenElement === lb && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { frame.innerHTML = ''; }, 300);
  }
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lightbox-close')) closeVideo(); });
  // Leaving full screen (Esc) also closes the video, so one Esc gets you back to the grid.
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && lb.dataset.fs && lb.classList.contains('open')) closeVideo();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('open')) closeVideo(); });

  /* ---------- Pages ---------- */
  if (page === 'home') {
    $('#hero-tagline').textContent = SITE.tagline;
    // Background reel: only shown if the file actually loads; otherwise the gradient stays.
    if (SITE.reel.background) {
      const v = document.createElement('video');
      Object.assign(v, { muted: true, loop: true, autoplay: true, playsInline: true, src: SITE.reel.background });
      v.addEventListener('loadeddata', () => { $('.hero-media').prepend(v); $('.hero-media .ph').remove(); $('.hero').classList.add('has-video'); }, { once: true });
      v.load();
    }
    // A showreel button can be added back later: give a button id="watch-reel" and set SITE.reel.full.
    const reelBtn = $('#watch-reel');
    if (reelBtn) reelBtn.addEventListener('click', () => openVideo(SITE.reel.full, 'Showreel'));

    const inSection = (key) => PROJECTS.filter((p) => p.section === key);

    // Two doorways: Commercial / Filmmaking
    $('#paths').innerHTML = Object.entries(SECTIONS).map(([key, s]) => {
      const list = inSection(key);
      const cover = (s.cover && PROJECTS.find((p) => p.id === s.cover)) || list.find(thumbOf);
      return `
      <a class="path reveal" href="${s.page}">
        ${s.coverImage || cover ? `<img src="${esc(s.coverImage || thumbOf(cover))}" alt="" loading="lazy" style="object-position:${esc(s.coverPos || '50% 30%')}">` : `<div class="ph" style="--h:${s.hue}"></div>`}
        ${s.coverLabel ? `<span class="path-label"><small>Featuring</small>${esc(s.coverLabel)}</span>` : ""}
        <div class="path-body">
          <h2 class="display">${esc(s.title)}</h2>
          <p>${esc(s.intro)}</p>
          <span class="path-go">Enter →</span>
        </div>
      </a>`;
    }).join('');

    const card = (p) => `
      <a class="card reveal" data-id="${esc(p.id)}" href="${SECTIONS[p.section].page}#${esc(p.id)}">
        <div class="card-media">
          ${still(p)}
          ${p.preview ? `<video muted loop playsinline preload="none" data-src="${esc(p.preview)}"></video>` : ''}
          <span class="card-tag">${esc(p.category)}</span>
          <span class="card-view">View project →</span>
        </div>
        <div class="card-info">
          <h3 class="card-title">${esc(p.title)}</h3>
          <span class="card-meta">${[p.artist || p.client, p.year].filter(Boolean).map(esc).join(" · ")}</span>
        </div>
        <p class="card-summary">${esc(p.summary)}</p>
      </a>`;

    // A preview strip per section: 1 large + 2 small cards
    const previewKeys = (typeof HOME_PREVIEW_ORDER !== 'undefined' ? HOME_PREVIEW_ORDER : Object.keys(SECTIONS)).filter((k) => SECTIONS[k]);
    $('#previews').innerHTML = previewKeys.map((key) => [key, SECTIONS[key]]).map(([key, s]) => {
      const list = inSection(key);
      const picks = (list.filter((p) => p.featured).length ? list.filter((p) => p.featured) : list).slice(0, 3);
      if (!picks.length) return '';
      return `
      <section class="section preview" id="${key}">
        <div class="wrap">
          <div class="section-head reveal">
            <div>
              <span class="eyebrow">${esc(s.eyebrow)}</span>
              <h2 class="display">${esc(s.headline)}</h2>
            </div>
            <a class="link-arrow" href="${s.page}">See all ${esc(s.title.toLowerCase())} <span>→</span></a>
          </div>
          <div class="work-grid n${picks.length}">${picks.map(card).join("")}</div>
        </div>
      </section>`;
    }).join('');

    // Hover previews: play the project's short `preview` clip (if it has one) while the cursor is on its card.
    document.querySelectorAll('.card').forEach((card) => {
      const v = $('video', card);
      if (!v) return;
      card.addEventListener('mouseenter', () => {
        if (!v.src) { v.src = v.dataset.src; v.addEventListener('canplay', () => v.classList.add('ready'), { once: true }); }
        v.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => v.pause());
    });

    // YouTube hover previews (for cards without a preview clip).
    // The players are created and buffered in the background when the card scrolls near the
    // screen, so hovering only has to press play.
    const ytCards = [...document.querySelectorAll('.card')].filter((card) => {
      const p = PROJECTS.find((x) => x.id === card.dataset.id);
      return !$('video', card) && p && p.video && p.video.type === 'youtube';
    });
    const canHover = matchMedia('(hover: hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (canHover && ytCards.length) {
      const apiReady = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = resolve;
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      });
      const LEN = 6; // seconds of preview before it loops

      const setup = async (card) => {
        await apiReady;
        const p = PROJECTS.find((x) => x.id === card.dataset.id);
        const media = $('.card-media', card);
        const start = Math.floor(p.previewStart ?? 30);
        const holder = document.createElement('div');
        holder.className = 'card-yt';
        holder.appendChild(document.createElement('div'));
        media.appendChild(holder);
        const size = () => {
          const r = media.getBoundingClientRect();
          const w = Math.max(r.width, r.height * 16 / 9) * 1.15; // cover the card, crop YouTube's edges
          holder.style.width = `${w}px`; holder.style.height = `${w * 9 / 16}px`;
        };
        size();
        window.addEventListener('resize', size);

        // The preview plays silently and invisibly on a short loop while its card is on screen.
        // Hovering just fades it in (pure CSS), so it appears instantly and YouTube's own
        // play/pause icon has already disappeared by the time anyone sees it.
        let readyTimer;
        const player = new YT.Player(holder.firstChild, {
          host: 'https://www.youtube-nocookie.com',
          videoId: p.video.id,
          width: '100%', height: '100%',
          playerVars: { autoplay: 1, mute: 1, controls: 0, playsinline: 1, rel: 0, disablekb: 1, fs: 0,
                        iv_load_policy: 3, cc_load_policy: 0, start },
          events: {
            onReady: (e) => { e.target.mute(); e.target.playVideo(); },
            onStateChange: (e) => {
              clearTimeout(readyTimer);
              if (e.data === YT.PlayerState.PLAYING) {
                // Only allow it to show once it has played long enough for YouTube's icon to fade.
                readyTimer = setTimeout(() => media.classList.add('yt-ready'), 2000);
              } else if (e.data === YT.PlayerState.ENDED) {
                player.seekTo(start, true); player.playVideo();
              } else if (e.data !== YT.PlayerState.BUFFERING) {
                media.classList.remove('yt-ready');
              }
            },
          },
        });
        // Loop the few seconds after `previewStart`.
        setInterval(() => {
          if (player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING &&
              player.getCurrentTime() > start + LEN) player.seekTo(start, true);
        }, 250);
        // Pause when the card is scrolled off screen; resume when it comes back.
        new IntersectionObserver(([en]) => {
          if (!player.playVideo) return;
          if (en.isIntersecting) player.playVideo(); else player.pauseVideo();
        }).observe(card);
      };

      const near = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { near.unobserve(en.target); setup(en.target); }
      }), { rootMargin: '600px 0px' });
      ytCards.forEach((c) => near.observe(c));
    }
    $('#svc-list').innerHTML = SERVICES.map((s, i) => `
      <div class="svc reveal">
        <span class="num">${pad(i + 1)}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.blurb)}</p>
      </div>`).join('');
  }

  if (SECTIONS[page]) {
    const s = SECTIONS[page];
    const list = PROJECTS.filter((p) => p.section === page);
    // "Also see" points to the next section in menu order (wrapping around).
    const keys = Object.keys(SECTIONS);
    const other = SECTIONS[keys[(keys.indexOf(page) + 1) % keys.length]];

    // Small label above the page title; leave pageEyebrow empty to hide it.
    if (s.pageEyebrow) $('#page-eyebrow').textContent = s.pageEyebrow;
    else $('#page-eyebrow').remove();
    $('#page-title').textContent = s.title;
    $('#page-lede').textContent = s.intro;
    $('#cross-eyebrow').textContent = `Also see`;
    $('#cross-link').href = other.page;
    $('#cross-title').innerHTML = `${esc(other.title)} <em>→</em>`;
    $('#cross-lede').textContent = other.intro;

    const cats = ['All', ...new Set(list.map((p) => p.category))];
    if (cats.length > 2) {
      $('#filters').innerHTML = cats.map((c) => {
        const n = c === 'All' ? list.length : list.filter((p) => p.category === c).length;
        return `<button class="chip" data-cat="${esc(c)}" aria-pressed="${c === 'All'}">${esc(c)}<span class="count">${n}</span></button>`;
      }).join('');
    } else {
      $('#filters').hidden = true;
    }

    // Sections with layout: 'grid' (Music Videos) show a wall of thumbnails; hovering shows the details,
    // clicking plays the video full screen.
    const grid = s.layout === 'grid';
    const tile = (p, i) => `
      <article class="tile${p.description.some((d) => /flash/i.test(d)) ? ' has-flash' : ''}" id="${esc(p.id)}" data-cat="${esc(p.category)}">
        <div class="tile-media project-media" data-i="${i}" role="button" tabindex="0" aria-label="Play ${esc(p.title)}${p.artist ? ` by ${esc(p.artist)}` : ''}">
          ${still(p)}
          <div class="tile-info">
            <span class="tile-cat">${esc(p.category)}</span>
            <h2 class="tile-title">${esc(p.title)}</h2>
            <p class="tile-meta">${[p.artist, p.role, p.year].filter(Boolean).map(esc).join(' · ')}</p>
            <p class="tile-sum">${esc(p.summary)}</p>
            ${p.description.some((d) => /flash/i.test(d)) ? '<p class="tile-warn">Flash warning</p>' : ''}
            <span class="tile-play"><span class="play"></span> Play</span>
          </div>
        </div>
      </article>`;
    if (grid) $('#projects').classList.add('tile-grid');
    $('#projects').innerHTML = !list.length ? `<p class="empty">New work coming soon.</p>` : grid ? list.map(tile).join('') : list.map((p, i) => `
      <article class="project${isVertical(p) ? " is-vertical" : ""}" id="${esc(p.id)}" data-cat="${esc(p.category)}">
        <div class="project-media reveal" data-i="${i}" role="button" tabindex="0" aria-label="Play ${esc(p.title)}">
          ${still(p, true)}
          <span class="play-badge"></span>
        </div>
        <div class="reveal">
          <span class="project-num">${pad(i + 1)} · ${esc(p.category)}</span>
          <h2>${esc(p.title)}</h2>
          <dl>
            ${p.artist ? `<dt>Artist</dt><dd>${esc(p.artist)}</dd>` : ""}
            ${p.client ? `<dt>Client</dt><dd>${esc(p.client)}</dd>` : ""}
            ${p.role ? `<dt>Role</dt><dd>${esc(p.role)}</dd>` : ""}
            ${p.year ? `<dt>Year</dt><dd>${esc(p.year)}</dd>` : ""}
          </dl>
          <div class="project-desc">${p.description.map((d) => `<p>${esc(d)}</p>`).join('')}</div>
        </div>
      </article>`).join('');

    $('#filters').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      document.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', c === chip));
      document.querySelectorAll('.project, .tile').forEach((el) => {
        el.hidden = chip.dataset.cat !== 'All' && el.dataset.cat !== chip.dataset.cat;
      });
    });
    const play = (el) => {
      const p = list[el.dataset.i];
      openVideo(p.video, p.artist ? `${p.title} · ${p.artist}` : p.title);
      // Grid pages go straight to full screen (the click counts as the required user gesture).
      if (grid && lb.requestFullscreen) lb.requestFullscreen().then(() => { lb.dataset.fs = '1'; }).catch(() => {});
    };
    document.querySelectorAll('.project-media').forEach((el) => {
      el.addEventListener('click', () => play(el));
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(el); } });
    });

    // Arriving from a home-page card: jump to and highlight that project.
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView());
      target.classList.add('flash');
      setTimeout(() => target.classList.remove('flash'), 1800);
    }
  }

  if (page === 'services') {
    $('#svc-rows').innerHTML = SERVICES.map((s, i) => `
      <div class="svc-row reveal">
        <span class="num">${pad(i + 1)}</span>
        <div><h2>${esc(s.title)}</h2><p>${esc(s.blurb)}</p></div>
        <ul>${s.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
      </div>`).join('');
  }

  if (page === 'contact') {
    $('#contact-mail').href = `mailto:${SITE.email}`;
    $('#contact-mail').textContent = SITE.email;
    $('#contact-socials').innerHTML = SITE.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}<span>↗</span></a></li>`).join('');
    // No backend on GitHub Pages: the form opens the visitor's email app with everything filled in.
    $('#contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const subject = `Project enquiry: ${f.get('type')}`;
      const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nProject type: ${f.get('type')}\nBudget: ${f.get('budget')}\n\n${f.get('message')}`;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  document.querySelectorAll('[data-email]').forEach((a) => { a.href = `mailto:${SITE.email}`; a.textContent = SITE.email; });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
