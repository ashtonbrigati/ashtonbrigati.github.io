/* =========================================================================
   SITE CONTENT: this is the only file you need to edit to update the site.
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
   section: 'filmmaking', 'music' or 'client' (which page the project lives on).
   category: a sub-type within that section (e.g. 'Documentary', 'Broke Records').
            Each different category becomes a filter button on that page.
   artist:  optional; shows an "Artist" line (used for music videos).
   featured: true = shows up in that section's preview on the home page
            (the first 3 featured per section are shown).

   PUNCTUATION: please don't use long dashes (—) in site text.
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

// Order of the section previews further down the home page (the panels and menu use the order below).
const HOME_PREVIEW_ORDER = ['filmmaking', 'client', 'music'];

// The three parts of the portfolio, in menu order. Text here appears on the home page and at the top of each page.
const SECTIONS = {
  filmmaking: {
    title: 'Filmmaking',
    page: 'filmmaking.html',
    cover: 'because-of-eachother',          // which project's still is used on the home-page Filmmaking panel
    coverImage: 'media/thumbs/filmmaking-cover.jpg', // Because of Eachother, candle at 1:45 (4K frame)
    eyebrow: 'Filmmaking',
    pageEyebrow: '',                  // small label above the big title on the page (empty = hidden)
    headline: 'Stories I needed to tell.',
    intro: 'Short films and documentaries: personal work about family, identity and what we choose to keep.',
    hue: 228,
  },
  client: {
    title: 'Client Work',
    page: 'client-work.html',
    cover: 'rocketjump-making-movies',      // which project's still is used on the home-page Client Work panel
    coverImage: 'media/thumbs/rocketjump-cover.jpg', // Freddie Wong at 3:17 of the RocketJump video (1080p frame)
    coverLabel: 'RocketJump · Freddie Wong', // text shown over that still ('' = none)
    eyebrow: 'Client work',
    pageEyebrow: '',
    headline: 'Made for the people I work with.',
    intro: 'Videos for Patreon on YouTube and Instagram, as camera operator and editor.',
    hue: 205,
  },
  music: {
    title: 'Music Videos',
    page: 'music-videos.html',
    layout: 'grid',                   // thumbnail wall: hover for details, click to play full screen
    cover: 'glaive-it-is-what-it-is',
    coverImage: 'media/thumbs/music-cover.jpg',     // It Is What It Is (glaive), frame at 0:15.95
    coverPos: '62% 35%',              // keep the red circle in view on the tall panel
    coverLabel: 'Broke Records',      // text shown over that still ('' = none)
    eyebrow: 'Music videos',
    pageEyebrow: '',
    headline: 'Turn it up.',
    intro: 'Commissioned visuals for Broke Records artists, plus my own experiments in stop-motion, mixed media and 3D.',
    hue: 300,
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
      'A short documentary about the filmmaker’s experience of being adopted from foster care. Through an intimate conversation with his mother, a young man traces his journey of growing up and how his friends and community helped him find his home.',
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
    client: '',
    section: 'filmmaking',
    category: 'Documentary',
    year: 2025,
    role: 'Director, Editor',
    summary: 'A short documentary on the ethics of preservation, told through taxidermy.',
    description: [
      'Through a visual experiment that cuts between stuffed-animal skins, the soundscape of machines, and the voice of a taxidermist, this visceral documentary examines the preservation of living beings and the act of manipulating the dead.',
    ],
    video: { type: 'youtube', id: 'xY8-MV6cBeE' },
    previewStart: 0,
    thumb: 'media/thumbs/buried-in-glass.jpg',   // 4K frame from 1:44
    preview: '',
    hue: 195,
    featured: true,
  },

  // ---------- Music Videos (page order is chosen for variety up top; the filters split Broke Records / Personal) ----------
  {
    id: 'broke-records-bleecher',
    title: 'liar',
    artist: 'bleecher',
    client: 'Broke Records',
    section: 'music',
    category: 'Broke Records',
    year: 2025,
    role: 'Editor',
    summary: 'A visual for bleecher’s “liar,” commissioned by Broke Records and made in TouchDesigner.',
    description: [
      'Commissioned by Broke Records (New York) for bleecher’s “liar” and posted on my own accounts to build hype for the release. Made in TouchDesigner.',
    ],
    video: { type: 'tiktok', id: '7603284132398910733' },
    thumb: 'media/thumbs/bleecher.jpg',
    thumbPos: '8% 50%',      // tall home-page card: show the hand and blue, not the white torso
    preview: '',
    hue: 240,
    featured: 2,
  },

  {
    id: 'glaive-mixed-media',
    title: 'Mixed Media Animation',
    artist: 'glaive',
    client: '',
    section: 'music',
    category: 'Personal',
    year: 2025,
    role: 'Editor, Animator',
    summary: 'A stop-motion, mixed-media visual for an unreleased glaive song, made from his footage online.',
    description: [
      'An unofficial visual for an unreleased glaive song. I took his footage from online and rebuilt it frame by frame as stop-motion mixed media.',
      'This is the edit that led to my work with Broke Records.',
    ],
    video: { type: 'youtube', id: '0GfxFXm2AjY' },
    previewStart: 10,
    thumb: 'media/thumbs/glaive-mixed-media.jpg',
    preview: '',
    hue: 140,
    featured: 1,
  },

  {
    id: 'broke-records-itsbast-forget',
    title: 'gonna make you forget',
    artist: 'itsbast',
    client: 'Broke Records',
    section: 'music',
    category: 'Broke Records',
    year: 2025,
    role: 'Editor',
    summary: 'A vertical visual for itsbast’s “gonna make you forget,” made through Broke Records.',
    description: [
      'Made through Broke Records (New York) for itsbast’s “gonna make you forget” and posted on my own accounts to build hype for the release.',
    ],
    video: { type: 'tiktok', id: '7671775930066554126', vertical: true },
    thumb: 'media/thumbs/itsbast-forget.jpg',
    preview: '',
    hue: 320,
    featured: false,
  },

  {
    id: 'glaive-it-is-what-it-is',
    title: 'It Is What It Is',
    artist: 'glaive',
    client: 'Broke Records',
    section: 'music',
    category: 'Broke Records',
    year: 2025,
    role: 'Editor',
    summary: 'A mixed-media visual for glaive, commissioned by Broke Records and built in TouchDesigner.',
    description: [
      'Commissioned by Broke Records (New York) for glaive’s “It Is What It Is” and posted on my own accounts to build hype for the release. Built in TouchDesigner.',
      'Flash warning: contains flashing images.',
    ],
    video: { type: 'tiktok', id: '7568077670219648311' },
    thumb: 'media/thumbs/glaive-iiwii-1.jpg',
    preview: '',
    hue: 330,
    featured: false,
  },

  {
    id: 'glaive-it-is-what-it-is-alt',
    title: 'It Is What It Is (Alternate)',
    artist: 'glaive',
    client: 'Broke Records',
    section: 'music',
    category: 'Broke Records',
    year: 2025,
    role: 'Editor',
    summary: 'A second, black-and-white take on “It Is What It Is” for glaive and Broke Records.',
    description: [
      'An alternate version of my visual for glaive’s “It Is What It Is,” commissioned by Broke Records and built in TouchDesigner.',
    ],
    video: { type: 'tiktok', id: '7568224492145675533' },
    thumb: 'media/thumbs/glaive-iiwii-2.jpg',
    preview: '',
    hue: 0,
    featured: false,
  },

  {
    id: 'broke-records-tiffany-day-breakup',
    title: 'breakup',
    artist: 'Tiffany Day',
    client: 'Broke Records',
    section: 'music',
    category: 'Broke Records',
    year: 2025,
    role: 'Editor',
    summary: 'A visual for Tiffany Day’s “breakup,” commissioned by Broke Records.',
    description: [
      'Commissioned by Broke Records (New York) for Tiffany Day and posted on my own accounts to build hype for the release.',
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
    title: 'breakup (Alternate)',
    artist: 'Tiffany Day',
    client: 'Broke Records',
    section: 'music',
    category: 'Broke Records',
    year: 2025,
    role: 'Editor',
    summary: 'An alternate visual for “breakup,” made in TouchDesigner and After Effects.',
    description: [
      'A second take on “breakup” for Tiffany Day and Broke Records, built in TouchDesigner and After Effects.',
    ],
    video: { type: 'tiktok', id: '7571975212112137527' },
    thumb: 'media/thumbs/tiffany-day-breakup-alt.jpg',
    preview: '',
    hue: 30,
    featured: false,
  },

  {
    id: 'glaive-a-minor-126',
    title: 'this song is in a minor at 126 bpm',
    artist: 'glaive',
    client: '',
    section: 'music',
    category: 'Personal',
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
    id: 'smoke-signals-something-quiet',
    title: 'something quiet',
    artist: 'smoke signals',
    client: '',
    section: 'music',
    category: 'Personal',
    year: 2025,
    role: 'Editor, Motion Designer',
    summary: 'An experiment recreating printed mixed media digitally in After Effects, with an almost watercolour look.',
    description: [
      'A visual edit in the style of my mixed-media work, but made entirely on the computer. It was an experiment in recreating the look of printed mixed media in After Effects, and it came out almost like watercolour.',
    ],
    video: { type: 'youtube', id: 'Z86x8cV9PG0' },
    thumb: 'media/thumbs/smoke-signals-something-quiet.jpg',
    preview: '',
    hue: 10,
    featured: false,
  },

  {
    id: '100-gecs-doritos-fritos',
    title: 'Doritos & Fritos',
    artist: '100 gecs',
    client: '',
    section: 'music',
    category: 'Personal',
    year: 2025,
    role: '3D Animator',
    summary: 'An uncommissioned 3D animated music video, made for fun.',
    description: [
      'An uncommissioned 3D animated video for 100 gecs’ “Doritos & Fritos,” which I made for fun.',
    ],
    video: { type: 'youtube', id: 'lYc-jKtyGzU' },
    previewStart: 20,
    thumb: 'media/thumbs/100-gecs-doritos-fritos.jpg',
    thumbPos: '15% 50%',     // keep the chip in view on the tall home-page card
    pageThumb: 'media/thumbs/100-gecs-doritos-fritos-page.jpg', // Music Videos page: frame with the text higher up
    pageThumbPos: '50% 100%',
    pageThumbZoom: 1.35,      // lifts the "doritos" text above the play button
    preview: '',
    hue: 35,
    featured: false,
  },

  // ---------- Client Work (YouTube + freelance editing) ----------
  // One entry per video works best. Duplicate this block for each Patreon video you want to show.
  // For a freelance editing job, use the same block with:  client: 'Who it was for',  category: 'Editing',  role: 'Editor'
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
    previewStart: 30,
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
    previewStart: 30,
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
    title: 'Music Videos',
    blurb: 'Visuals for artists and labels, from stop-motion and mixed media to TouchDesigner and 3D.',
    deliverables: ['Music videos & visualizers', 'Stop-motion & mixed media', 'TouchDesigner & After Effects', '3D animation', 'Vertical cuts for TikTok & Reels'],
  },
  {
    title: 'Freelance Editing',
    blurb: 'Already shot it? I’ll cut it into a finished story, with sound and VFX that hold it together.',
    deliverables: ['Story & structure edits', 'Sound design & mixing', 'VFX & compositing'],
  },
];
