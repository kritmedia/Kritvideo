export interface ShowcaseVideo {
  id: string;
  youtubeId: string;
  title: string;
  client: string;
  category: 'shorts' | 'youtube' | 'brand' | 'podcast';
  categoryLabel: string;
  duration: string;
  durationSeconds: number;
  views: string;
  format: '9:16' | '16:9';
  thumbnail: string;
  badge: string;
  tagline: string;
  themeColor: string;
  glowColor: string;
  highlights: string[];
  specs: {
    resolution: string;
    codec: string;
    fps: string;
    colorSpace: string;
  };
}

export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: 'sports-reel',
    youtubeId: 'OWRKm1ZpbDA',
    title: 'Cinematic Sports Reel',
    client: 'Jamison McDivitt',
    category: 'youtube',
    categoryLabel: 'YOUTUBE 4K',
    duration: '02:15',
    durationSeconds: 135,
    views: 'Cinematography',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/OWRKm1ZpbDA/hqdefault.jpg',
    badge: '4K DCI',
    tagline: 'High-energy pacing and kinetic visual cuts',
    themeColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.40)',
    highlights: ['Multi-layer sound design', 'Dynamic speed ramps', 'Commercial color grade'],
    specs: {
      resolution: '4K DCI (3840x2160)',
      codec: 'Apple ProRes 422 HQ',
      fps: '60 FPS',
      colorSpace: 'DaVinci YRGB',
    },
  },
  {
    id: 'iphone-log',
    youtubeId: 'QUx1anKHYuI',
    title: 'iPhone 15 Pro Max Cinematic',
    client: 'Apple Log Visuals',
    category: 'shorts',
    categoryLabel: 'SHORT-FORM',
    duration: '01:05',
    durationSeconds: 65,
    views: 'Viral Retention',
    format: '9:16',
    thumbnail: 'https://i.ytimg.com/vi/QUx1anKHYuI/hqdefault.jpg',
    badge: 'APPLE LOG 4K',
    tagline: 'Viral vertical framing with punchy motion',
    themeColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.40)',
    highlights: ['First 3s hook design', 'Kinetic captions', 'Punchy audio SFX'],
    specs: {
      resolution: '1080x1920 (Vertical 4K Master)',
      codec: 'Apple ProRes 422',
      fps: '60 FPS',
      colorSpace: 'Apple Log / Rec.709',
    },
  },
  {
    id: 'soccer-commercial',
    youtubeId: 'xuas_Yc7VNQ',
    title: 'Cinematic Soccer Commercial',
    client: 'Apex Football',
    category: 'brand',
    categoryLabel: 'COMMERCIAL',
    duration: '01:45',
    durationSeconds: 105,
    views: 'Sony A7SIII',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/xuas_Yc7VNQ/hqdefault.jpg',
    badge: 'SONY A7SIII',
    tagline: 'Broadcast commercial pacing and sound design',
    themeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.40)',
    highlights: ['Atmospheric foley', 'Film print emulation', 'Dynamic beat match'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 4444',
      fps: '30 FPS',
      colorSpace: 'S-Gamut3.Cine / S-Log3',
    },
  },
  {
    id: 'sneaker-product',
    youtubeId: 'IJsVs6Nw6ls',
    title: 'Nike Basketball Commercial',
    client: 'Nike Hoops Edit',
    category: 'brand',
    categoryLabel: 'BRAND & ADS',
    duration: '01:30',
    durationSeconds: 90,
    views: 'Commercial Master',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/IJsVs6Nw6ls/hqdefault.jpg',
    badge: 'COMMERCIAL',
    tagline: 'Product-focused commercial storytelling',
    themeColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    highlights: ['Focal zoom framing', 'Heavy bass soundscape', 'ACES color workflow'],
    specs: {
      resolution: '4K DCI (4096x2160)',
      codec: 'Apple ProRes 4444 XQ',
      fps: '24 FPS',
      colorSpace: 'ACEScg Wide Gamut',
    },
  },
  {
    id: 'basketball-film',
    youtubeId: 'OsP0icRA4Hc',
    title: 'FLY - Cinematic Basketball Film',
    client: 'Sony FX3 Productions',
    category: 'youtube',
    categoryLabel: 'DOCUMENTARY',
    duration: '03:40',
    durationSeconds: 220,
    views: 'Sony FX3 4K',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/OsP0icRA4Hc/hqdefault.jpg',
    badge: 'SONY FX3',
    tagline: 'Emotional documentary storytelling and grading',
    themeColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.40)',
    highlights: ['Dialogue cleanup', 'Orchestral audio mix', 'Cinema letterbox export'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 422',
      fps: '24 FPS',
      colorSpace: 'Sony S-Cinetone',
    },
  },
  {
    id: 'podcast-master',
    youtubeId: 'xuas_Yc7VNQ',
    title: 'Silicon Conversations',
    client: 'Tech Founders Live',
    category: 'podcast',
    categoryLabel: 'PODCAST',
    duration: '45:10',
    durationSeconds: 2710,
    views: 'Multi-Cam Master',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=75',
    badge: 'MULTI-CAM',
    tagline: 'Multi-camera switching and dead-air removal',
    themeColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.40)',
    highlights: ['Speech audio leveling', 'Lower-third graphics', 'Shorts extract pack'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 422 HQ',
      fps: '24 FPS',
      colorSpace: 'Rec.709',
    },
  },
  {
    id: 'viral-reel',
    youtubeId: 'QUx1anKHYuI',
    title: 'Creator Launch Campaign',
    client: 'Viral Studio Media',
    category: 'shorts',
    categoryLabel: 'REELS / TIKTOK',
    duration: '00:55',
    durationSeconds: 55,
    views: '1.8M Views',
    format: '9:16',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=75',
    badge: 'VIRAL HOOK',
    tagline: 'Engineered for 85%+ retention and algorithmic reach',
    themeColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.40)',
    highlights: ['Custom subtitle animations', 'Sound fx punch-ins', '9:16 optimized'],
    specs: {
      resolution: '1080x1920 (Vertical)',
      codec: 'H.265 / HEVC',
      fps: '60 FPS',
      colorSpace: 'Rec.709',
    },
  },
];
