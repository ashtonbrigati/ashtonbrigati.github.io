/* =========================================================================
   SITE CONTENT — this is the only file you need to edit to update the site.
   -------------------------------------------------------------------------
   VIDEO SOURCES (pick one per project):
     video: { type: 'youtube', id: 'dQw4w9WgXcQ' }      // the bit after watch?v=
     video: { type: 'vimeo',   id: '76979871' }         // the number in the URL
     video: { type: 'instagram', id: 'DcoVfAJTCD-' }       // the bit after /reel/
     video: { type: 'tiktok',  id: '7568077670219648311' } // the number after /video/
                                                         // add  vertical: true  for a 9:16 TikTok
     video: { type: 'file',    src: 'media/my-film.mp4' }
     video: null                                         // shows "coming soon"

   thumb:   path to a still image (e.g. 'media/thumbs/northbound.jpg').
            Leave '' to use the coloured placeholder.
   preview: optional short, silent, looping .mp4 (3–6s, small file) that
            plays when someone hovers the card on the home page.
   thumbPos: which part of the still to keep when it's cropped, e.g. '25% 50%'
            shifts towards the left. Default is the centre.
   thumbZoom: zoom into the still, e.g. 1.2 (1 = no zoom). Zooms towards thumbPos.
   hue:     colour of the placeholder gradient (0–360) until you add a thumb.
   section: 'client' or 'filmmaking' — which page the project lives on.
   category: a sub-type within that section (e.g. 'Brand Film', 'Documentary').
            Each different category becomes a filter button on that page.
   featured: true = shows up in that section's preview on the home page
            (the first 3 featured per section are shown).
   ========================================================================= */

const SITE = {
  name: 'Ashton Brigati',
  tagline: 'Filmmaker · Director · Camera Operator · Editor',
  email: 'contact@ashtonbrigati.com',
  location: 'Los Angeles, CA',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/_aaaaaaaaaarb/' },
    { label: 'YouTube',   url: 'https://www.youtube.com/@hhttps_who' },
    { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/ashton-brigati-91a95b249/' },
  ],
  // Showreel: plays in the hero background (muted) and in full when "Watch reel" is clicked.
  reel: {
    background: 'media/reel-loop.mp4',          // short muted loop for the hero; optional
    full: null,                                 // e.g. { type: 'vimeo', id: '123456' }
  },
};

// The two halves of the portfolio. Text here appears on the home page and at the top of each page.
const SECTIONS = {
  filmmaking: {
    title: 'Filmmaking',
    page: 'filmmaking.html',
    cover: 'because-of-eachother',          // which project's still is used on the home-page Filmmaking panel
    coverImage: 'media/thumbs/filmmaking-cover.jpg', // Because of Eachother, candle at 1:45 (4K frame)
    eyebrow: 'Filmmaking',
    pageEyebrow: '',                  // small label above the big title on the Filmmaking page (empty = hidden)
    headline: 'Stories I needed to tell.',
    intro: 'Short films, documentaries and music videos — personal work about family, identity and what we choose to keep.',
    hue: 228,
  },
  client: {
    title: 'Client Work',
    page: 'client-work.html',
    cover: 'rocketjump-making-movies',      // which project's still is used on the home-page Client Work panel
    coverImage: 'media/thumbs/rocketjump-cover.jpg', // Freddie Wong at 3:17 of the RocketJump video (1080p frame)
    coverLabel: 'RocketJump · Freddie Wong', // text shown over that still ('' = none)
    eyebrow: 'Client work',
    pageEyebrow: '',                  // small label above the big title on the Client Work page (empty = hidden)
    headline: 'Made for the people I work with.',
    intro: 'Videos for Patreon on YouTube and Instagram, and music videos for Broke Records artists.',
    hue: 205,
  },
};

/* Leave year or role as '' and they simply won't be shown. */
const PROJECTS = [
  // ---------- Filmmaking (first one is the highlight) ----------
  {
    id: 'because-of-eachother',
    title: 'Because of Eachother',
    client: '',                // leave empty for personal work; set e.g. 'A24' later and a "Client" line appears
    section: 'filmmaking',
    category: 'Short Film',
    year: 2025,
    role: 'Director, Editor',
    summary: 'A short film about my adoption process as a teenager.',
    description: [
      'Because of Eachother is a short film about my own adoption, which happened when I was a teenager.',
      // TODO: add a paragraph or two — why you made it, how you approached telling your own story, screenings or awards.
    ],
    video: { type: 'youtube', id: '9w4G4jILxdU' },
    previewStart: 5,         // home-page hover preview plays from this second (YouTube, muted)
    thumb: 'media/thumbs/because-of-eachother.jpg',   // 4K frame from 1:04
    preview: '',
    hue: 222,
    featured: true,
  },
  {
    id: 'buried-in-glass',
    title: 'Buried in Glass',
    client: '',                // leave empty for personal work; set e.g. 'A24' later and a "Client" line appears
    section: 'filmmaking',
    category: 'Documentary',
    year: 2025,
    role: 'Director, Editor',
    summary: 'A short documentary on the ethics of preservation, told through taxidermy.',
    description: [
      'Buried in Glass is a short documentary about what it means to preserve something through any means — told in taxidermy.',
      // TODO: add more — who you filmed, what you found, how it was received.
    ],
    video: { type: 'youtube', id: 'xY8-MV6cBeE' },
    previewStart: 0,         // home-page hover preview plays from this second (YouTube, muted)
    thumb: 'media/thumbs/buried-in-glass.jpg',   // 4K frame from 1:44
    preview: '',
    hue: 195,
    featured: true,
  },

  // ---------- Filmmaking: music videos (self-initiated) ----------
  {
    id: 'glaive-mixed-media',
    title: 'glaive — Mixed Media Animation',
    client: '',
    section: 'filmmaking',
    category: 'Music Video',
    year: 2025,
    role: 'Editor, Animator',
    summary: 'A stop-motion, mixed-media visual for an unreleased glaive song, made from his footage online.',
    description: [
      'An unofficial visual for an unreleased glaive song. I took his footage from online and rebuilt it frame by frame as stop-motion mixed media.',
      'This is the edit that led to my work with Broke Records.',
    ],
    video: { type: 'youtube', id: '0GfxFXm2AjY' },
    thumb: 'media/thumbs/glaive-mixed-media.jpg',
    preview: '',
    hue: 140,
    featured: false,
  },
  {
    id: 'glaive-a-minor-126',
    title: 'glaive — this song is in a minor at 126 bpm',
    client: '',
    section: 'filmmaking',
    category: 'Music Video',
    year: 2025,
    role: 'Editor, Animator, Remix',
    summary: 'An unofficial visualizer for an unreleased glaive song that I remixed and re-edited myself.',
    description: [
      'Made with the same stop-motion, mixed-media process, but this time I also mixed and re-edited the unreleased song myself before building the visuals to it.',
    ],
    video: { type: 'youtube', id: 'gLxDXGnaF9k' },
    thumb: 'media/thumbs/glaive-a-minor-126.jpg',
    preview: '',
    hue: 220,
    featured: false,
  },
  {
    id: 'glaive-it-is-what-it-is-1',
    title: 'glaive — It Is What It Is',
    client: '',
    section: 'filmmaking',
    category: 'Music Video',
    year: 2025,
    role: 'Editor',
    summary: 'A mixed-media edit for glaive’s “It Is What It Is”, made in TouchDesigner.',
    description: [
      'A mixed-media edit for glaive’s “It Is What It Is”, built in TouchDesigner.',
      'Flash warning: contains flashing images.',
    ],
    video: { type: 'tiktok', id: '7568077670219648311' },
    thumb: 'media/thumbs/glaive-iiwii-1.jpg',
    preview: '',
    hue: 330,
    featured: false,
  },
  {
    id: 'glaive-it-is-what-it-is-2',
    title: 'glaive — It Is What It Is (Pt. 2)',
    client: '',
    section: 'filmmaking',
    category: 'Music Video',
    year: 2025,
    role: 'Editor',
    summary: 'A second, black-and-white take on “It Is What It Is”, made in TouchDesigner.',
    description: [
      'A second version of my edit for glaive’s “It Is What It Is”, built in TouchDesigner.',
    ],
    video: { type: 'tiktok', id: '7568224492145675533' },
    thumb: 'media/thumbs/glaive-iiwii-2.jpg',
    preview: '',
    hue: 0,
    featured: false,
  },
  {
    id: 'smoke-signals-something-quiet',
    title: 'smoke signals — something quiet',
    client: '',
    section: 'filmmaking',
    category: 'Music Video',
    year: 2025,
    role: 'Editor, Motion Designer',
    summary: 'An experiment recreating printed mixed media digitally in After Effects, with an almost watercolour look.',
    description: [
      'A visual edit in the same style as my mixed-media work, but made entirely digitally: an experiment recreating the look of printed mixed media in After Effects, which came out almost like watercolour.',
    ],
    video: { type: 'youtube', id: 'Z86x8cV9PG0' },
    thumb: 'media/thumbs/smoke-signals-something-quiet.jpg',
    preview: '',
    hue: 10,
    featured: false,
  },
  {
    id: '100-gecs-doritos-fritos',
    title: '100 gecs — Doritos & Fritos',
    client: '',
    section: 'filmmaking',
    category: 'Music Video',
    year: 2025,
    role: '3D Animator',
    summary: 'A fan-made 3D animated music video, made for fun.',
    description: [
      'A fan-made 3D animated music video for 100 gecs’ “Doritos & Fritos”, made for fun.',
    ],
    video: { type: 'youtube', id: 'lYc-jKtyGzU' },
    thumb: 'media/thumbs/100-gecs-doritos-fritos.jpg',
    preview: '',
    hue: 35,
    featured: false,
  },

  // ---------- Client Work (YouTube + freelance editing) ----------
  // One entry per video works best. Duplicate this block for each Patreon video you want to show.
  // For a freelance editing job, use the same block with:  client: 'Who it was for',  category: 'Editing',  role: 'Editor'
  // Once there are two categories (YouTube + Editing), filter buttons appear on the Client Work page.
  {
    id: 'leap-from-youtube-to-movies',
    title: 'Making the Leap from YouTube to Movies',
    client: 'Patreon',
    section: 'client',
    category: 'YouTube',
    year: 2026,
    role: 'Camera Operator, Editor',
    summary: 'A Patreon video for the Digital Spaghetti YouTube channel, which I shot and edited.',
    description: [
      'Made for Patreon and published on the Digital Spaghetti YouTube channel. I worked on it as camera operator and editor.',
      // TODO: add a line about the video and what the shoot or edit involved.
    ],
    video: { type: 'youtube', id: 'RjP3mTiei54' },
    previewStart: 30,         // home-page hover preview plays from this second (YouTube, muted)
    thumb: '',
    thumbPos: '50% 10%',     // keep the 'Essays → Movies' text in view on wide crops
    preview: '',
    hue: 200,
    featured: true,
  },
  {
    id: 'why-he-chose-youtube',
    title: 'Why He Chose YouTube Over Hollywood',
    client: 'Patreon',
    section: 'client',
    category: 'YouTube',
    year: 2026,
    role: 'Camera Operator',
    summary: 'A Patreon video for the Digital Spaghetti YouTube channel.',
    description: [
      'Made for Patreon and published on the Digital Spaghetti YouTube channel. I worked on it as camera operator.',
      // TODO: add a line about the video and the shoot.
    ],
    video: { type: 'youtube', id: 'Jp6OaEBB4s4' },
    previewStart: 30,
    thumb: '',
    preview: '',
    hue: 215,
    featured: true,
  },
  {
    id: 'rocketjump-making-movies',
    title: 'RocketJump Is Making Movies Their Own Way',
    client: 'Patreon',
    section: 'client',
    category: 'YouTube',
    year: 2026,
    role: 'Camera Operator',
    summary: 'A Patreon video for the Digital Spaghetti YouTube channel.',
    description: [
      'Made for Patreon and published on the Digital Spaghetti YouTube channel. I worked on it as camera operator.',
      // TODO: add a line about the video and the shoot.
    ],
    video: { type: 'youtube', id: 'XrWgEcwzlYM' },
    previewStart: 30,
    thumb: '',
    preview: '',
    hue: 205,
    featured: true,
  },
  {
    id: 'patreon-intern-demo',
    title: 'I Worked at Patreon as a Video Intern',
    client: 'Patreon',
    section: 'client',
    category: 'YouTube',
    year: 2026,
    role: 'Video Intern',
    summary: 'My final demo from my video internship at Patreon, published on my own channel.',
    description: [
      'Created to showcase my intern final demo and what I had accomplished within the Patreon Video Team.',
      // TODO: add a line on what you worked on at Patreon and what the video covers.
    ],
    video: { type: 'youtube', id: 'P87QwEsh3H0' },
    previewStart: 30,         // home-page hover preview plays from this second (YouTube, muted)
    thumb: '',
    thumbPos: '50% 20%',     // keep the PATREON lettering in view on the wide home-page card
    preview: '',
    hue: 210,
    featured: true,
  },
  {
    id: 'patreon-instagram-reel',
    title: 'We Threw a Film Festival in the Middle of Times Square',
    client: 'Patreon',
    section: 'client',
    category: 'Instagram',
    year: 2026,
    role: 'Editor',
    summary: 'A Patreon reel posted on Instagram by Digital Spaghetti and kamelogs, which I edited.',
    description: [
      'Made for Patreon and posted on Instagram by Digital Spaghetti and kamelogs. I worked on it as editor.',
      // TODO: add a line about the reel.
    ],
    video: { type: 'instagram', id: 'DcoVfAJTCD-' },
    thumb: 'media/thumbs/patreon-reel.jpg',   // vertical 4:5 frame from 0:00
    preview: '',
    hue: 225,
    featured: false,          // kept off the home page until it has a real still
  },

  // ---------- Client Work: music videos for Broke Records ----------
  {
    id: 'broke-records-tiffany-day-breakup',
    title: 'Tiffany Day — breakup',
    client: 'Broke Records',
    section: 'client',
    category: 'Music Video',
    year: 2025,
    role: 'Editor',
    summary: 'A visual edit commissioned by Broke Records to build hype for Tiffany Day’s “breakup”.',
    description: [
      'Commissioned by Broke Records (New York) for Tiffany Day, and posted on my own accounts to build hype for the release.',
    ],
    video: { type: 'tiktok', id: '7569903180159520013' },
    thumb: 'media/thumbs/tiffany-day-breakup.jpg',
    thumbPos: '70% 50%',      // keep the lyric text in view
    preview: '',
    hue: 300,
    featured: false,
  },
  {
    id: 'broke-records-tiffany-day-breakup-alt',
    title: 'Tiffany Day — breakup (Alternate)',
    client: 'Broke Records',
    section: 'client',
    category: 'Music Video',
    year: 2025,
    role: 'Editor',
    summary: 'An alternate visual for Tiffany Day’s “breakup”, made in TouchDesigner and After Effects.',
    description: [
      'A second, alternate take on “breakup” for Tiffany Day and Broke Records, built in TouchDesigner and After Effects.',
    ],
    video: { type: 'tiktok', id: '7571975212112137527' },
    thumb: 'media/thumbs/tiffany-day-breakup-alt.jpg',
    preview: '',
    hue: 30,
    featured: false,
  },
  {
    id: 'broke-records-bleecher',
    title: 'bleecher — Visual Edit',
    client: 'Broke Records',
    section: 'client',
    category: 'Music Video',
    year: '',
    role: 'Editor',
    summary: 'A visual edit for bleecher, commissioned by Broke Records and made in TouchDesigner.',
    description: [
      'Commissioned by Broke Records (New York) for bleecher, and posted on my own accounts to build hype for the release. Made in TouchDesigner.',
    ],
    video: { type: 'tiktok', id: '7603284132398910733' },
    thumb: 'media/thumbs/bleecher.jpg',
    preview: '',
    hue: 240,
    featured: false,
  },
  {
    id: 'broke-records-itsbast-forget',
    title: 'itsbast — gonna make you forget',
    client: 'Broke Records',
    section: 'client',
    category: 'Music Video',
    year: '',
    role: 'Editor',
    summary: 'A vertical visual for itsbast’s “gonna make you forget”, made through Broke Records.',
    description: [
      'Made through Broke Records (New York) for itsbast’s “gonna make you forget”, and posted on my own accounts to build hype for the release.',
    ],
    video: { type: 'tiktok', id: '7671775930066554126', vertical: true },
    thumb: 'media/thumbs/itsbast-forget.jpg',
    preview: '',
    hue: 320,
    featured: false,
  },
];

const SERVICES = [
  {
    title: 'YouTube & Brand Content',
    blurb: 'Videos for brands and their channels; planned, shot and cut to keep people watching.',
    deliverables: ['Pre-production to post-production', 'YouTube videos', 'Brand & explainer pieces', 'Cutdowns for social', 'Vertical edits'],
  },
  {
    title: 'Short Film & Documentary',
    blurb: 'Personal, story-driven films from first idea to final cut; directing, shooting and editing.',
    deliverables: ['Pre-production to post-production', 'Directing & cinematography', 'Editing & sound', 'Festival deliverables'],
  },
  {
    title: 'Freelance Editing',
    blurb: 'Already shot it? I’ll cut it into a finished story, with sound and VFX that hold it together.',
    deliverables: ['Story & structure edits', 'Sound design & mixing', 'VFX & compositing'],
  },
];
