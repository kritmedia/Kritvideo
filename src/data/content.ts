import {
  ServicePillar,
  TrustedBrand,
  CraftFeatureCard,
  PricingPlan,
  WorkflowStep,
  FAQItem,
  TestimonialItem,
} from '../types';

export const HERO_PILLARS: ServicePillar[] = [
  {
    number: '#01',
    title: 'Narrative Story & Pacing',
    description: 'Hook retention editing, micro-pacing, and eliminating dead air.',
    tags: ['A-Roll Story', 'B-Roll Rhythm', 'Retention Hooks'],
  },
  {
    number: '#02',
    title: 'Cinematic Color Grading',
    description: 'LOG/RAW normalization, custom 35mm film emulation, and skin-tone precision.',
    tags: ['ACES Pipeline', 'Film Halation', 'Rec.709 Master'],
  },
  {
    number: '#03',
    title: 'Sound Design & Foley',
    description: 'Multi-layer risers, impacts, atmospheric foley, and broadcast -14 LUFS mastering.',
    tags: ['Spatial Foley', 'Vocal Mastering', 'Bespoke SFX'],
  },
  {
    number: '#04',
    title: 'VFX & Motion Graphics',
    description: 'Clean typography, kinetic charts, 3D title design, and seamless screen replacements.',
    tags: ['Kinetic Type', '3D Tracking', 'Brand Assets'],
  },
];

export const TRUSTED_BRANDS: TrustedBrand[] = [
  { name: 'Supa Blox', iconType: 'circle' },
  { name: 'Hype Blox', iconType: 'hourglass' },
  { name: 'Frame Blox', iconType: 'split' },
  { name: 'Ultra Blox', iconType: 'globe' },
  { name: 'Apex Media', iconType: 'layers' },
  { name: 'Vanguard Cut', iconType: 'shield' },
];

export const CRAFT_FEATURE_CARDS: CraftFeatureCard[] = [
  {
    id: 'pacing',
    tag: 'Phase 01 // Narrative',
    title: 'Story Architecture & Retention',
    subtitle: 'Transforming 60 minutes of chaotic raw rushes into an 8-minute high-tension masterpiece.',
    metric: '+84%',
    metricLabel: 'Average Audience Retention',
    highlight: 'Micro-Pacing & Dynamic Cuts',
    specs: [
      { label: 'Cut Frequency', value: '3.2s dynamic average' },
      { label: 'Hook Structure', value: '0-5s retention lock' },
      { label: 'B-Roll Sync', value: '100% beat-matched' },
      { label: 'Pacing Model', value: 'Tension & Release Curve' },
    ],
  },
  {
    id: 'color',
    tag: 'Phase 02 // Optics',
    title: 'Cinematic Color Science',
    subtitle: 'Studio-grade ACEScg and DaVinci color grading that elevates flat log files to cinematic film look.',
    metric: '100%',
    metricLabel: 'Gamut & Broadcast Accurate',
    highlight: 'Kodak 2383 Emulation & ACES 1.3',
    specs: [
      { label: 'Input Gamuts', value: 'S-Log3, C-Log2, RED RAW, ProRes' },
      { label: 'Skin Tone Match', value: 'Delta-E < 1.2 tolerance' },
      { label: 'HDR Standard', value: 'HDR10 / Dolby Vision Master' },
      { label: 'Film Grain', value: 'Organic 35mm optical grain' },
    ],
  },
  {
    id: 'audio',
    tag: 'Phase 03 // Acoustics',
    title: 'Spatial Audio & Sound Design',
    subtitle: '70% of a video is what viewers hear. We build layered foley, crisp dialogues, and weighted bass.',
    metric: '-14',
    metricLabel: 'Integrated LUFS Standard',
    highlight: 'Multi-Track Spatial Foley',
    specs: [
      { label: 'Dialogue Clean', value: 'iZotope RX Spectral Denoise' },
      { label: 'SFX Library', value: '65,000+ proprietary textures' },
      { label: 'Stereo Field', value: 'Binaural 3D panning' },
      { label: 'Mix & Master', value: 'Streaming & Cinema calibrated' },
    ],
  },
];

export const RAW_VS_MASTER_POINTS = [
  {
    category: 'Raw Footage Ingest',
    raw: 'Flat Log profile, washed out contrast, washed skin tones',
    master: 'Vibrant 35mm print film emulation with balanced luminance',
  },
  {
    category: 'Story & Narrative',
    raw: '45 mins of rambling, stuttered takes, dead air between points',
    master: '8-minute razor-sharp narrative arc with zero filler and strong hooks',
  },
  {
    category: 'Audio Quality',
    raw: 'Echoey room reverb, muffled mic peaks, silent gaps',
    master: 'Crystal studio vocals, punchy risers, whooshes, ambient foley',
  },
  {
    category: 'Graphics & VFX',
    raw: 'No visual cues, static boring screen recordings',
    master: 'Kinetic 3D typography, animated data graphs, seamless zooms',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Raw Footage Ingest & Briefing',
    duration: 'Hour 0 – 4',
    description: 'You upload your raw camera files, scripts, or talking head takes via our private Frame.io workspace. We catalog assets, sync multicam audio, and map story beats.',
    deliverables: ['Asset verification report', 'Story structure proposal', 'Turnaround countdown locked'],
  },
  {
    step: '02',
    title: 'Story Assembly & A-Cut',
    duration: 'Hour 4 – 24',
    description: 'We cut the master narrative, trim filler pauses, craft the opening 10-second retention hook, and establish rhythmic B-roll layering.',
    deliverables: ['First assembly cut link', 'Timestamped review notes', 'Feedback round 1 integrated'],
  },
  {
    step: '03',
    title: 'Color Grading, Audio & VFX Polish',
    duration: 'Hour 24 – 40',
    description: 'Our colorists grade every frame in DaVinci Resolve. Sound engineers clean dialogue with spectral repair and add high-impact foley and custom motion graphics.',
    deliverables: ['ACES calibrated color pass', 'Full multi-track sound master', 'Custom kinetic motion graphics'],
  },
  {
    step: '04',
    title: 'Master Export & Delivery',
    duration: 'Hour 40 – 48',
    description: 'We export full 4K ProRes and optimized web codecs with custom metadata, YouTube chapter timestamps, and vertical short cutdowns ready for publishing.',
    deliverables: ['4K ProRes 422 HQ Master', 'Web-optimized MP4 H.265', 'Vertical Short / Reel cutdown included'],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'single-project',
    name: 'Flagship Single Cut',
    price: '$490',
    period: 'per video',
    description: 'Perfect for high-impact YouTube videos, brand documentaries, or keynote product showcases.',
    turnaround: '48 – 72 Hours',
    idealFor: 'YouTube creators, agency founders, tech startups',
    features: [
      'Up to 45 mins raw footage into 8-15 min master',
      'Advanced storytelling & pacing edit',
      'Studio DaVinci color grading (ACES pipeline)',
      'Layered foley & sound design (-14 LUFS)',
      'Custom motion titles & animated graphics',
      '2 rounds of revisions via Frame.io',
      'Includes 1 free 9:16 vertical short cutdown',
    ],
  },
  {
    id: 'monthly-retainer',
    name: 'Growth Studio Retainer',
    badge: 'MOST POPULAR',
    price: '$1,850',
    period: 'per month',
    description: 'A dedicated senior post-production team in your corner for consistent, high-converting video publishing.',
    turnaround: '24 – 48 Hours',
    idealFor: 'Weekly YouTube channels, marketing teams, podcasters',
    features: [
      '4 full-length master videos per month (up to 20 mins each)',
      '8 vertical short-form reels / TikTok cutdowns',
      'Dedicated senior lead editor & colorist',
      'Priority slack channel & 24h turnaround queues',
      'Dedicated revision rounds & priority feedback passes',
      'Custom thumbnails & chapter metadata generation',
      'Raw project file archives & DaVinci DRPs included',
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial & Brand Film',
    price: '$2,400',
    period: 'per campaign',
    description: 'High-end cinema-grade post-production for brand commercials, TV ads, and investor films.',
    turnaround: 'Custom 3–5 Days',
    idealFor: 'Ad agencies, venture-backed companies, luxury brands',
    features: [
      'Multi-camera 4K/8K RAW & ProRes pipeline',
      'Full custom score synchronization & licensing',
      'Complex 3D tracking & VFX screen replacement',
      'Dolby Vision / HDR10 master deliverables',
      'Multiple aspect ratios (16:9, 9:16, 1:1, 4:5)',
      'Director-level review sessions',
      'Broadcast television safe mastering',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "KritVideo took our 2-hour messy interview footage and turned it into an 11-minute documentary that hit 1.4 million views in 5 days. Their pacing and sound design are on another level.",
    author: "Marcus Vance",
    role: "Founder & Creator",
    channelOrBrand: "Vance Media (840k subs)",
    stats: "1.4M+ Views on First Cut",
  },
  {
    quote: "The color grading alone made our iPhone 15 Pro ProRes footage look like it was shot on an Arri Alexa. We completely stopped hiring in-house editors.",
    author: "Elena Rostova",
    role: "Head of Marketing",
    channelOrBrand: "Aura Tech Brands",
    stats: "3.8x Ad ROI Increase",
  },
  {
    quote: "Turnaround is ridiculously fast and the audio polish is spotless. They understand retention hooks better than any post-house we have worked with.",
    author: "David Chen",
    role: "Executive Producer",
    channelOrBrand: "Hyper Studios",
    stats: "48h Consistent Delivery",
  },
];

export const FAQS: FAQItem[] = [
  {
    category: 'Process',
    question: 'How do I send my raw footage to KritVideo?',
    answer: 'We provide you with a high-speed private Frame.io or Dropbox/Google Drive upload link where you can dump your camera files, SD card backups, or screen recordings. We handle all formats including RED RAW, Blackmagic RAW, Apple ProRes, Sony S-Log3, and Canon C-Log.',
  },
  {
    category: 'Process',
    question: 'What is the standard turnaround time?',
    answer: 'Our standard turnaround for single full-length cuts is 48 to 72 hours. For retainer clients and express projects, we offer guaranteed 24 to 48-hour turnarounds with daily communication.',
  },
  {
    category: 'Quality',
    question: 'What software and tools does the team use?',
    answer: 'We work primarily inside DaVinci Resolve Studio for world-class color science, Adobe Premiere Pro & After Effects for dynamic kinetic motion graphics, and iZotope RX / Fairlight for audio engineering.',
  },
  {
    category: 'Revisions',
    question: 'How do revisions work if I want changes?',
    answer: 'We provide timestamped, frame-accurate review links via Frame.io. You can click anywhere on the video player and leave exact notes or drawing annotations. Revisions are completed within 12–24 hours.',
  },
  {
    category: 'Audio & Music',
    question: 'Are music tracks and sound effects licensed for commercial use?',
    answer: 'Yes, 100%. All music tracks and SFX used in your projects are sourced from our enterprise-licensed libraries (Musicbed, Artlist, Epidemic Sound Pro), ensuring you never receive copyright strikes or monetization claims.',
  },
];
