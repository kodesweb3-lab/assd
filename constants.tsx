
import { ResearchDomain, InventoryCategory } from './types';

export const COLORS = {
  midnight: '#0B0E1A',
  violet: '#2A1E44',
  blue: '#4F8CFF',
  purple: '#6B5CFF',
  slate: '#A9B0C2',
  white: '#EDEFF6',
};

// Ordered by popularity: Twitter/X, TikTok, Instagram, YouTube, Telegram, Spotify, LinkedIn, Streaming/Gaming, Website/Traffic, Press/Media, Misc
export const FULL_INVENTORY: InventoryCategory[] = [
  {
    title: "TWITTER / X",
    items: [
      "Likes",
      "Views / Live / Comments",
      "Retweets & Likes Packages",
      "Mentions",
      "Comments",
      "Organic Services",
      "Followers (Non-Drop / Old Accounts)",
      "Provider Services",
      "Packages",
      "New Follow",
      "Other Services"
    ]
  },
  {
    title: "TIKTOK",
    items: [
      "Followers",
      "Likes",
      "Views & Comments",
      "Explore",
      "Saves",
      "Video Views",
      "Shares / Saves / Downloads",
      "Growth",
      "Livestream Views",
      "Followers (No Drop / Low Drop)",
      "Views (Stable Speed)"
    ]
  },
  {
    title: "INSTAGRAM",
    items: [
      "Followers",
      "Likes",
      "Views",
      "Comments",
      "Story Views",
      "Reels Views",
      "Reels Likes",
      "IGTV Views",
      "Saves",
      "Shares",
      "Live Views",
      "Followers (Non-Drop)",
      "Organic Growth"
    ]
  },
  {
    title: "YOUTUBE",
    items: [
      "Views",
      "Views (Country Targeted)",
      "Native Views (Country Targeted)",
      "Shorts Views",
      "Shorts Likes",
      "Likes & Shares",
      "Comments (Country Targeted)",
      "Custom Comments",
      "Watch Hours",
      "WatchTime",
      "Subscribers",
      "Real Active Users",
      "Views (High Retention)",
      "Views [HR]"
    ]
  },
  {
    title: "TELEGRAM",
    items: [
      "Members",
      "Members (Country Targeted)",
      "Members Targeted",
      "Post Shares",
      "Reactions"
    ]
  },
  {
    title: "SPOTIFY / MUSIC",
    items: [
      "Spotify Plays",
      "Device Targeted Streams",
      "Followers",
      "GEO Targeted",
      "Playlist Followers",
      "SoundCloud Followers",
      "ReverbNation"
    ]
  },
  {
    title: "LINKEDIN / PROFESSIONAL",
    items: [
      "LinkedIn",
      "LinkedIn Other Services"
    ]
  },
  {
    title: "STREAMING / GAMING",
    items: [
      "Twitch",
      "Twitch Live Views",
      "Twitch Clip Views",
      "Kick",
      "Kick Chat Bots",
      "Kick Followers",
      "Kick Services"
    ]
  },
  {
    title: "WEBSITE / TRAFFIC",
    items: [
      "Website Traffic (Worldwide)",
      "Website Traffic (Country Specific)",
      "Choose Referrer",
      "Testing Servers"
    ]
  },
  {
    title: "PRESS / MEDIA / AUTHORITY",
    items: [
      "Press Release Distribution",
      "Google Map Citations",
      "Quora",
      "IMDb",
      "HotNewHipHop",
      "WorldStarHipHop"
    ]
  },
  {
    title: "MISC / OTHER",
    items: [
      "Snapchat",
      "Pinterest",
      "Tumblr Services",
      "Vimeo",
      "Datpiff",
      "In-Game Currency",
      "New Things",
      "Private"
    ]
  }
];

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    id: 'video',
    title: 'Social Signal Observation — Video Platforms',
    subtitle: 'YouTube, TikTok, Vertical Clusters',
    whatWeStudy: [
      'Velocity patterns and breakout thresholds',
      'Retention curves vs. algorithmic promotion',
      'Early engagement clustering mechanics',
      'Perceived legitimacy signals in high-volume domains'
    ],
    whatToolsDo: [
      'Observe visibility thresholds for niche content',
      'Analyze timing sensitivity in the first 60 minutes',
      'Compare organic vs. coordinated lift on trending tags'
    ],
    whatToolsDoNotDo: [
      'Automate views or engagement counts',
      'Inflate platform-side metrics',
      'Guarantee specific algorithmic outcomes'
    ],
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
  },
  {
    id: 'music',
    title: 'Acoustic Signal Propagation',
    subtitle: 'Spotify, SoundCloud, Streaming DSPs',
    whatWeStudy: [
      'Device-targeted streaming mechanics',
      'Playlist saturation velocity and decay',
      'Audience-density mapping by geography',
      'Device-to-device verification patterns'
    ],
    whatToolsDo: [
      'Monitor chart displacement speed',
      'Track playlist follower growth trends',
      'Analyze stream-source legitimacy signals'
    ],
    whatToolsDoNotDo: [
      'Deliver automated stream counts',
      'Simulate fake music listeners',
      'Bypass DSP anti-fraud algorithms'
    ],
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
  },
  {
    id: 'messaging',
    title: 'Private Network Dynamics',
    subtitle: 'Telegram, Closed Group Cascades',
    whatWeStudy: [
      'Information cascade speed in encrypted nodes',
      'Reaction-to-post propagation metrics',
      'Country-targeted member density mapping',
      'Group participation trust-levels'
    ],
    whatToolsDo: [
      'Measure post share velocity across hubs',
      'Profile reaction-signal density',
      'Observe cross-group propagation patterns'
    ],
    whatToolsDoNotDo: [
      'Automate broadcast spam',
      'Scrape private user communications',
      'Deliver phantom group members'
    ],
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  }
];
