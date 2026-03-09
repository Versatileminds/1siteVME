// Central data layer for VME

export const ARTISTS = [
  {
    id: 1,
    name: 'Lil Daddy',
    slug: 'lil-daddy',
    type: 'human',
    image: '/artist-lildaddy.jpg',
    heroImages: ['/artist-lildaddy.jpg', '/artist-lildaddy1.jpeg'],
    gallery: ['/artist-lildaddy2.jpeg', '/artist-lildaddy3.jpeg', '/artist-lildaddy4.jpeg'],
    genre: 'Southern Soul / Blues / Hip-Hop',
    followers: '125K',
    verified: true,
    aka: 'Mr. Versatile'
  },
  {
    id: 2,
    name: 'daBOTS',
    slug: 'dabots',
    type: 'ai',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop',
    heroImages: ['https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop'],
    gallery: [],
    genre: 'Electronic / AI Artistry',
    followers: '89K',
    verified: true
  },
  {
    id: 3,
    name: 'S.Dot',
    slug: 's-dot',
    type: 'human',
    image: '/artist-ShaunAllen.PNG',
    heroImages: ['/artist-ShaunAllen.PNG', '/artist-ShaunAllen1.PNG'],
    gallery: ['/artist-ShaunAllen1.PNG'],
    genre: 'R&B / Soul',
    followers: '156K',
    verified: true,
    aka: 'Shaun Allen / 7Foota'
  },
  {
    id: 4,
    name: 'A.T.F.',
    slug: 'atf',
    type: 'human',
    image: '/artist-ATF.jpeg',
    heroImages: ['/artist-ATF.jpeg', '/artist-ATF1.jpeg'],
    gallery: ['/artist-ATF2.jpeg', '/artist-ATF3.jpeg', '/artist-ATF4.jpeg'],
    genre: 'Hip-Hop',
    followers: '201K',
    verified: true,
    role: 'CEO, Versatile Minds Entertainment'
  },
  { id: 5, name: 'Stoka P.', slug: 'stoka-p', type: 'human', image: '/Stoka.P.jpeg', heroImages: ['/Stoka.P.jpeg'], gallery: [], genre: 'Hip-Hop', followers: '178K', verified: true },
  { id: 6, name: 'Beanut', slug: 'beanut', type: 'human', image: '/beanut0.png', heroImages: ['/beanut0.png', '/Beanut1.jpeg'], gallery: ['/Beanut1.jpeg'], genre: 'Hip-Hop / R&B / Soul', followers: '210K', verified: true },
  {
    id: 7,
    name: 'Wade Is Legit',
    slug: 'wade-is-legit',
    type: 'producer',
    image: '/wade.jpeg',
    heroImages: ['/wade.jpeg'],
    gallery: ['/wade.jpeg'],
    genre: 'Southern Soul / R&B / Beats',
    followers: '52K',
    verified: true,
    role: 'Producer, Versatile Minds Ent'
  }
];

export const TRACKS = [
  { id: 1, title: 'Midnight Protocol', artist: 'daBOTS', duration: '3:45', durationSec: 225, cover: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop' },
  { id: 2, title: 'Underground Kings', artist: 'Lil Daddy', duration: '4:12', durationSec: 252, cover: '/artist-lildaddy.jpg' },
  { id: 3, title: 'Velvet Nights', artist: 'S.Dot', duration: '3:28', durationSec: 208, cover: '/artist-ShaunAllen.PNG' }
];

export const EVENTS = [
  { id: 1, month: 'MAR', day: '15', title: 'VME Syndicate Live Session #1', location: 'Houston, TX', cta: 'GET TICKETS' },
  { id: 2, month: 'APR', day: '05', title: 'Trail Ride & Soul Night', location: 'Baton Rouge, LA', cta: 'GET TICKETS' },
  { id: 3, month: 'APR', day: '26', title: 'Southern Soul Showcase', location: 'Shreveport, LA', cta: 'GET TICKETS' }
];

export const MERCH = [
  { id: 1, name: 'VME Syndicate Hoodie', price: 85, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
  { id: 2, name: 'NOX Digital Artifact NFT', price: 150, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop' },
  { id: 3, name: 'Limited Edition Vinyl Pack', price: 120, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop' }
];

export const FEED = [
  { id: 1, author: 'Beanut', role: 'Boss Management', message: "New VME Pro tier dropping next week. Exclusive early access to daBOTS' upcoming album.", time: '2h ago', likes: 234 },
  { id: 2, author: 'Lil Daddy', role: 'Artist', message: 'Studio session with ATF tonight. Something special coming...', time: '5h ago', likes: 567 },
  { id: 3, author: 'daBOTS', role: 'AI Artist', message: 'Generated 47 new tracks this week. The algorithm is evolving. Which genre should I explore next?', time: '1d ago', likes: 892 }
];

export const SPOTIFY_EMBEDS = [
  { id: 'atf', src: 'https://open.spotify.com/embed/artist/5XEn3TNxYLn7uFrqbMGAaB?utm_source=generator' },
  { id: 'lil-daddy', src: 'https://open.spotify.com/embed/artist/0k5pgSCJJTeYgVHdzXnCd6?utm_source=generator' },
  { id: 's-dot', src: 'https://open.spotify.com/embed/artist/3XMe3Y7jfqGnQJ1XY20Gsw?utm_source=generator' },
  { id: 'beanut', src: 'https://open.spotify.com/embed/artist/4m7bbAvdrB9RxfPsbfMgH1?utm_source=generator' },
  { id: 'wade-is-legit', src: 'https://open.spotify.com/embed/artist/0k5pgSCJJTeYgVHdzXnCd6?utm_source=generator' } // placeholder until dedicated link
];

export const SYNDICATE_CONNECTIONS = [
  { id: 1, name: 'Lil Daddy', image: '/artist-lildaddy1.jpeg', relation: 'Collaborator' },
  { id: 2, name: 'S.Dot', image: '/artist-ShaunAllen1.PNG', relation: 'Producer' },
  { id: 3, name: 'Beanut', image: '/beanut0.png', relation: 'Manager' },
  { id: 4, name: 'ATF', image: '/artist-ATF1.jpeg', relation: 'Artist' },
  { id: 5, name: 'Stoka P.', image: '/Stoka.P.jpeg', relation: 'Featured' },
  { id: 6, name: 'VME Studios', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', relation: 'Label' },
  { id: 7, name: 'DJ Nexus', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop', relation: 'DJ' },
  { id: 8, name: 'Visual Core', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', relation: 'Visuals' },
  { id: 9, name: 'The Archive', image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=200&fit=crop', relation: 'Curator' },
  { id: 10, name: 'Wade Is Legit', image: '/wade.jpeg', relation: 'Producer' }
];
