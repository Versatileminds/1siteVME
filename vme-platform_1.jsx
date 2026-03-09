import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ShoppingBag, Music, Users, Star, TrendingUp, Crown, Zap, Heart, MessageCircle, Share2, ExternalLink, Menu, X, Loader2 } from 'lucide-react';

// ─── VME Logo Component ───
const VMELogo = ({ className = '' }) => (
  <img src="/VME_logo_trn.svg" alt="Versatile Minds Entertainment" className={className} />
);

// ─── Loading Skeleton Components ───
const SkeletonPulse = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/10 rounded ${className}`} />
);

const CardSkeleton = () => (
  <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
    <SkeletonPulse className="h-64 w-full rounded-none" />
    <div className="p-4 space-y-2">
      <SkeletonPulse className="h-4 w-3/4" />
      <SkeletonPulse className="h-3 w-1/2" />
    </div>
  </div>
);

const TrackSkeleton = () => (
  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
    <div className="flex items-center gap-4">
      <SkeletonPulse className="w-6 h-4" />
      <SkeletonPulse className="w-14 h-14 rounded" />
      <div className="flex-1 space-y-2">
        <SkeletonPulse className="h-4 w-2/3" />
        <SkeletonPulse className="h-3 w-1/3" />
      </div>
      <SkeletonPulse className="h-3 w-10" />
    </div>
  </div>
);

// ─── Spotify Embeds ───
const SpotifyEmbeds = ({ slug }) => {
  const embedsForArtist = SPOTIFY_EMBEDS.filter((e) => e.id === slug);
  const embeds = embedsForArtist.length ? embedsForArtist : SPOTIFY_EMBEDS;

  return (
    <div className="space-y-4">
      {embeds.map((embed) => (
        <div key={embed.src} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <iframe
            title={`Spotify embed ${embed.id}`}
            data-testid="embed-iframe"
            style={{ borderRadius: '12px' }}
            src={embed.src}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

// ─── Simple Auto-Rotating Gallery ───
const RotatingGallery = ({ images = [] }) => {
  const validImages = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [validImages.join('|')]);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % validImages.length), 3600);
    return () => clearInterval(id);
  }, [validImages.length]);

  if (!validImages.length) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="relative aspect-[16/9]">
        <img
          key={validImages[index]}
          src={validImages[index]}
          alt="Artist gallery"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {index + 1} / {validImages.length}
        </div>
      </div>
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-3 bg-black/40">
          {validImages.map((img, i) => (
            <button
              key={img}
              onClick={() => setIndex(i)}
              className={`border rounded-md overflow-hidden transition-all ${i === index ? 'border-[#C00000] shadow shadow-[#C00000]/40' : 'border-white/10 hover:border-white/30'}`}
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-14 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PageLoader = () => (
  <div className="min-h-screen bg-[#111111] flex items-center justify-center">
    <div className="text-center">
      <VMELogo className="h-20 w-20 mx-auto mb-6 animate-pulse" />
      <Loader2 className="w-8 h-8 text-[#C00000] animate-spin mx-auto mb-4" />
      <p className="text-gray-400 text-sm tracking-widest uppercase">Loading</p>
    </div>
  </div>
);

// ─── Simulated Loading Hook ───
const useSimulatedLoading = (delay = 800) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return isLoading;
};

// ─── Mock Data ───
const ARTISTS = [
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

const TRACKS = [
  { id: 1, title: 'Midnight Protocol', artist: 'daBOTS', duration: '3:45', durationSec: 225, cover: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop' },
  { id: 2, title: 'Underground Kings', artist: 'Lil Daddy', duration: '4:12', durationSec: 252, cover: '/artist-lildaddy.jpg' },
  { id: 3, title: 'Velvet Nights', artist: 'S.Dot', duration: '3:28', durationSec: 208, cover: '/artist-ShaunAllen.PNG' }
];

const BULLETINS = [
  { id: 1, author: 'Beanut', role: 'Boss Management', message: 'New VME Pro tier dropping next week. Exclusive early access to NOX\'s upcoming album.', time: '2h ago', likes: 234 },
  { id: 2, author: 'Lil Daddy', role: 'Artist', message: 'Studio session with ATF tonight. Something special coming...', time: '5h ago', likes: 567 },
  { id: 3, author: 'NOX', role: 'AI Artist', message: 'Generated 47 new tracks this week. The algorithm is evolving. Which genre should I explore next?', time: '1d ago', likes: 892 }
];

const MERCH = [
  { id: 1, name: 'VME Syndicate Hoodie', price: 85, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
  { id: 2, name: 'NOX Digital Artifact NFT', price: 150, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop' },
  { id: 3, name: 'Limited Edition Vinyl Pack', price: 120, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop' }
];

const SPOTIFY_EMBEDS = [
  { id: 'atf', src: 'https://open.spotify.com/embed/artist/5XEn3TNxYLn7uFrqbMGAaB?utm_source=generator' },
  { id: 'lil-daddy', src: 'https://open.spotify.com/embed/artist/0k5pgSCJJTeYgVHdzXnCd6?utm_source=generator' },
  { id: 's-dot', src: 'https://open.spotify.com/embed/artist/3XMe3Y7jfqGnQJ1XY20Gsw?utm_source=generator' },
  { id: 'beanut', src: 'https://open.spotify.com/embed/artist/4m7bbAvdrB9RxfPsbfMgH1?utm_source=generator' }
];

const SYNDICATE_CONNECTIONS = [
  { id: 1, name: 'Lil Daddy', image: '/artist-lildaddy1.jpeg', relation: 'Collaborator' },
  { id: 2, name: 'S.Dot', image: '/artist-ShaunAllen1.PNG', relation: 'Producer' },
  { id: 3, name: 'Beanut', image: '/beanut0.png', relation: 'Manager' },
  { id: 4, name: 'ATF', image: '/artist-ATF1.jpeg', relation: 'Artist' },
  { id: 5, name: 'Stoka P.', image: '/Stoka.P.jpeg', relation: 'Featured' },
  { id: 6, name: 'VME Studios', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', relation: 'Label' },
  { id: 7, name: 'DJ Nexus', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop', relation: 'DJ' },
  { id: 8, name: 'Visual Core', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', relation: 'Visuals' },
  { id: 9, name: 'The Archive', image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=200&fit=crop', relation: 'Curator' },
  { id: 10, name: 'Wade Is Legit', image: '/VME_logo_trn.svg', relation: 'Producer' }
];

// ─── Format Time Helper ───
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// ─── Persistent Audio Player Component ───
const AudioPlayer = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [visualizerData, setVisualizerData] = useState([]);
  const progressRef = useRef(null);
  const prevVolume = useRef(75);

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= (currentTrack?.durationSec || 225)) {
          onNext();
          return 0;
        }
        return prev + 0.25;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying, isDragging, currentTrack, onNext]);

  // Reset progress on track change
  useEffect(() => {
    setProgress(0);
  }, [currentTrack?.id]);

  // Simulate frequency visualizer data
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setVisualizerData(Array.from({ length: 32 }, () => Math.random() * 100));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleProgressClick = (e) => {
    if (!progressRef.current || !currentTrack) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(percent * (currentTrack.durationSec || 225));
  };

  const handleProgressDrag = useCallback((e) => {
    if (!progressRef.current || !currentTrack) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(percent * (currentTrack.durationSec || 225));
  }, [currentTrack]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleProgressDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  }, [handleProgressDrag]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    handleProgressDrag(e);
    document.addEventListener('mousemove', handleProgressDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume.current);
      setIsMuted(false);
    } else {
      prevVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const totalDuration = currentTrack?.durationSec || 225;
  const progressPercent = (progress / totalDuration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#C00000]/30 z-50">
      {/* Visualizer bar */}
      <div className="h-1 bg-gradient-to-r from-black via-[#C00000]/20 to-black overflow-hidden">
        <div className="flex h-full items-end gap-[2px] px-4">
          {visualizerData.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-[#C00000] transition-all duration-100"
              style={{ height: `${isPlaying ? height : 0}%` }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="h-2 bg-white/5 cursor-pointer group relative"
        onClick={handleProgressClick}
        onMouseDown={handleDragStart}
      >
        <div
          className="h-full bg-gradient-to-r from-[#C00000] to-[#ff2020] transition-[width] duration-100 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <img
              src={currentTrack?.cover}
              alt={currentTrack?.title}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover shadow-lg shadow-[#C00000]/20"
            />
            <div className="min-w-0 hidden xs:block sm:block">
              <h4 className="text-white font-bold text-xs sm:text-sm truncate">{currentTrack?.title}</h4>
              <p className="text-gray-400 text-[10px] sm:text-xs truncate">{currentTrack?.artist}</p>
            </div>
          </div>

          {/* Controls + Time */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onPrev}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Previous track"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={onPlayPause}
                className="bg-[#C00000] hover:bg-[#C00000]/80 text-white rounded-full p-2 sm:p-3 transition-all shadow-lg shadow-[#C00000]/50 hover:shadow-[#C00000]/70"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
              </button>
              <button
                onClick={onNext}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Next track"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 tabular-nums">
              {formatTime(progress)} / {formatTime(totalDuration)}
            </div>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-24 accent-[#C00000]"
              aria-label="Volume control"
            />
            <span className="text-xs text-gray-400 w-8">{volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Mobile Nav Overlay ───
const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#0a0a0a] border-l border-[#C00000]/30 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <VMELogo className="h-10 w-10" />
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { label: 'HOME', path: '/' },
              { label: 'ARTISTS', path: '/artists' },
              { label: 'SHOP', path: '/shop' },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="block w-full text-left text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-bold text-lg tracking-wider transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8">
            <button
              onClick={() => handleNav('/pro')}
              className="w-full bg-[#C00000] hover:bg-[#C00000]/80 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#C00000]/30 flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              GET VME PRO
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs tracking-widest uppercase">Versatile Minds Entertainment</p>
            <p className="text-gray-600 text-xs mt-1">The Syndicate 2026</p>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Landing Page Component ───
const LandingPage = () => {
  const navigate = useNavigate();
  const isLoading = useSimulatedLoading(600);

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-black">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-[#C00000] rounded-full blur-3xl animate-pulse"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <VMELogo className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 drop-shadow-[0_0_30px_rgba(192,0,0,0.5)]" />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#C00000]/10 border border-[#C00000]/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
            <Zap className="w-4 h-4 text-[#C00000]" />
            <span className="text-[#C00000] text-sm font-bold tracking-wider">VME 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 sm:mb-6 tracking-tighter">
            THE SYNDICATE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C00000] to-white animate-pulse">
              AWAITS
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto font-light px-4">
            Where human creativity meets AI innovation. The underground's most exclusive creative hub.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/pro"
              className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all shadow-lg shadow-[#C00000]/50 hover:shadow-[#C00000]/70 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" />
                GET VME PRO
              </div>
            </Link>
            <Link
              to="/artists"
              className="bg-white/5 hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all border border-white/10 hover:border-[#C00000]/50 text-center"
            >
              EXPLORE ARTISTS
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Artists Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            TRENDING NOW
          </h2>
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#C00000]" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.slug}`)}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-[#C00000]/20"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {artist.type === 'ai' && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#C00000] text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                    AI ARTIST
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{artist.name}</h3>
                    {artist.verified && (
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#C00000] fill-[#C00000]" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-xs sm:text-sm">{artist.genre}</span>
                    <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      {artist.followers}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8 sm:mb-12">
          SYNDICATE FEED
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {BULLETINS.map((bulletin) => (
            <div
              key={bulletin.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-[#C00000]/30 transition-all"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h4 className="text-white font-bold text-sm sm:text-base">{bulletin.author}</h4>
                    <span className="text-[#C00000] text-[10px] sm:text-xs bg-[#C00000]/10 px-2 py-0.5 sm:py-1 rounded">
                      {bulletin.role}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm ml-auto">{bulletin.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{bulletin.message}</p>
                  <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm">
                    <button className="flex items-center gap-1.5 sm:gap-2 hover:text-[#C00000] transition-colors">
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{bulletin.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 sm:gap-2 hover:text-[#C00000] transition-colors">
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center gap-1.5 sm:gap-2 hover:text-[#C00000] transition-colors">
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Storefront */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            DIGITAL STOREFRONT
          </h2>
          <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-[#C00000]" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {MERCH.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all group cursor-pointer"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-[#C00000] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-sm hover:bg-[#C00000]/80 transition-colors">
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.name}</h3>
                <p className="text-[#C00000] text-lg sm:text-xl font-black">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ─── Artist Profile Component ───
const ArtistProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('music');
  const [heroIndex, setHeroIndex] = useState(0);
  const isLoading = useSimulatedLoading(500);

  const profileArtist = ARTISTS.find((a) => a.slug === slug) || ARTISTS[1];
  const heroImages = profileArtist.heroImages?.length ? profileArtist.heroImages : [profileArtist.image];
  const galleryImages = profileArtist.gallery?.length ? profileArtist.gallery : profileArtist.heroImages?.slice(1) || [];
  const primaryImage = heroImages[0];

  useEffect(() => setHeroIndex(0), [profileArtist.slug]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 3800);
    return () => clearInterval(id);
  }, [heroImages.length, profileArtist.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] pb-32">
        <SkeletonPulse className="h-64 sm:h-96 w-full rounded-none" />
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-12">
            <SkeletonPulse className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl" />
            <div className="flex-1 space-y-4 w-full">
              <SkeletonPulse className="h-10 w-48" />
              <SkeletonPulse className="h-5 w-32" />
              <div className="flex gap-4">
                <SkeletonPulse className="h-16 w-28 rounded-lg" />
                <SkeletonPulse className="h-16 w-28 rounded-lg" />
                <SkeletonPulse className="h-16 w-28 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <TrackSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      {/* Hero Banner */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <img
          src={heroImages[heroIndex]}
          alt={profileArtist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#111111]" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg backdrop-blur-sm transition-all text-sm sm:text-base"
        >
          &#8592; BACK
        </button>
      </div>

      <div className="container mx-auto px-4 -mt-16 sm:-mt-20 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-end mb-8 sm:mb-12">
          <img
            src={primaryImage}
            alt={profileArtist.name}
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-xl object-cover border-4 border-[#C00000] shadow-2xl shadow-[#C00000]/50"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                {profileArtist.name}
              </h1>
              {profileArtist.verified && (
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-[#C00000] fill-[#C00000]" />
              )}
              {profileArtist.type === 'ai' && (
                <span className="bg-[#C00000] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                  AI ARTIST
                </span>
              )}
            </div>

            <p className="text-lg sm:text-xl text-gray-400 mb-3 sm:mb-4">{profileArtist.genre}</p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-white/10">
                <span className="text-gray-400 text-xs sm:text-sm">Followers</span>
                <p className="text-white font-bold text-base sm:text-lg">{profileArtist.followers}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-white/10">
                <span className="text-gray-400 text-xs sm:text-sm">Tracks</span>
                <p className="text-white font-bold text-base sm:text-lg">47</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-white/10">
                <span className="text-gray-400 text-xs sm:text-sm">Monthly Listeners</span>
                <p className="text-white font-bold text-base sm:text-lg">2.4M</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#C00000]/50">
                FOLLOW
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all border border-white/10 hover:border-[#C00000]/50">
                MESSAGE
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-bold transition-all border border-white/10 hover:border-[#C00000]/50">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="mb-8 sm:mb-10">
            <RotatingGallery images={galleryImages} />
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 border-b border-white/10 overflow-x-auto scrollbar-hide">
          {['music', 'videos', 'events', 'bio', 'syndicate'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-6 py-2.5 sm:py-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#C00000] border-b-2 border-[#C00000]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'music' && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-white">SPOTIFY</h3>
                <SpotifyEmbeds slug={profileArtist.slug} />
              </div>
            )}

            {activeTab === 'bio' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-8 border border-white/10">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">ABOUT</h3>
                <div className="prose prose-invert max-w-none">

                  {/* ── A.T.F. ── */}
                  {profileArtist.slug === 'atf' && (
                    <>
                      <p className="text-[#C00000] font-bold text-sm sm:text-base mb-4">Houston, Texas</p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        A.T.F. is a rising force in hip-hop, blending raw street realism with polished musicality and entrepreneurial vision. As CEO of Versatile Minds Entertainment, A.T.F. represents a new generation of independent leadership—where artistry, strategy, and ownership move as one.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Influenced by icons like Master P, Prince, and Michael Jackson, A.T.F. delivers a sound rooted in authenticity and elevated by melodic depth, memorable hooks, and reflective storytelling. His music resonates across audiences by balancing grit with intention, staying true to the culture while pushing creative boundaries.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        With releases available on all major streaming platforms, A.T.F. has steadily built a loyal and growing fanbase. Known for his work ethic and forward-thinking approach, he continues to stand out in a competitive genre through consistency, evolution, and purpose.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Currently, A.T.F. is preparing for the release of his upcoming project, <span className="text-white font-bold">"Round 2: The Mixtape,"</span> a body of work that captures his growth as both an artist and executive. The project highlights new sonic directions and themes inspired by real-life experiences, leadership, and perseverance—further solidifying his presence in today's hip-hop landscape.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                        Beyond the music, A.T.F. is committed to empowering the next generation of artists through Versatile Minds Entertainment, providing guidance, opportunity, and vision. With an unwavering drive and a clear mission, A.T.F. is building more than a catalog—he's building a legacy.
                      </p>
                      <div className="border-t border-white/10 pt-6 space-y-2">
                        <p className="text-white font-bold text-sm">CONTACT & BOOKING</p>
                        <p className="text-gray-400 text-sm">832-845-6979</p>
                        <p className="text-gray-400 text-sm">atfvmc@gmail.com</p>
                        <p className="text-gray-400 text-sm">@atfvmc on all platforms</p>
                        <p className="text-[#C00000] font-bold text-sm mt-3">VERSATILE MINDS ENTERTAINMENT</p>
                        <p className="text-gray-400 text-sm">WWW.VERSATILEMINDSENT.COM</p>
                      </div>
                    </>
                  )}

                  {/* ── Lil Daddy / Mr. Versatile ── */}
                  {profileArtist.slug === 'lil-daddy' && (
                    <>
                      <p className="text-[#C00000] font-bold text-sm sm:text-base mb-1">VERSATILE aka LIL DADDY</p>
                      <p className="text-gray-500 text-xs sm:text-sm mb-4">Baton Rouge, Louisiana</p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Hailing from Baton Rouge, Louisiana, Mr. Versatile—also known as Lil Daddy—is a seasoned artist whose sound blends Southern Soul, Blues, and Hip-Hop into a style that's both authentic and timeless. Passionate about music since 2001, his journey began early, writing and performing his own music by the age of 16 and launching his professional career at just 19.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Known for his relatable lyrics, smooth vocal delivery, and emotional depth, Mr. Versatile has built a reputation for creating music that connects across generations. In 2003, he released his debut project "The Weekend Volume 1," followed by his first full-length album "In The Game! But Not Of The Game" in 2005. His dedication to craft led to the formation of Versatile Minds Entertainment, a platform that continues to push independent Southern music forward.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Throughout his career, Mr. Versatile has performed at venues, festivals, charity events, and showcases across the United States, sharing stages with notable artists such as Kevin Gates, Boosie, Webbie, Sir Charles Jones, Vince Hutchinson, Jeff Floyd, Tyree Neal, and more. His ability to merge storytelling with melody allows him to move effortlessly between heartfelt soul records and hard-hitting hip-hop tracks.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                        With an ever-growing catalog and an active performance schedule, Mr. Versatile aka Lil Daddy remains a respected voice in Southern music—delivering real stories, real emotion, and real vibes.
                      </p>
                      <div className="bg-white/5 rounded-lg p-4 border border-[#C00000]/20 mb-6">
                        <p className="text-white font-black text-sm mb-2">IN BETWEEN TIME — OUT NOW</p>
                        <div className="flex flex-wrap gap-2">
                          {['Stay Out', "Can't Keep Holding On", 'Light Skin', 'Mechanical Bull'].map((track) => (
                            <span key={track} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{track}</span>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs mt-3">Apple Music | Spotify | Amazon Music | TIDAL Music+</p>
                        <p className="text-gray-500 text-xs">Search: LIL DADDYVME</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-[#C00000] font-bold text-sm">VERSATILE MINDS ENTERTAINMENT</p>
                        <p className="text-gray-400 text-sm">WWW.VERSATILEMINDSENT.COM</p>
                      </div>
                    </>
                  )}

                  {/* ── S.Dot / Shaun Allen ── */}
                  {profileArtist.slug === 's-dot' && (
                    <>
                      <p className="text-[#C00000] font-bold text-sm sm:text-base mb-1">SHAUN ALLEN</p>
                      <p className="text-gray-500 text-xs sm:text-sm mb-4">Also known as S.Dot / 7Foota / 7Foots — Detroit, MI</p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Shaun Allen, also known as S.Dot or 7Foota, is a Detroit-born recording artist whose music blends raw emotion with authentic storytelling. Raised in the heart of Detroit, Shaun developed an early connection to music—drawn to rhythms and melodies that fueled his creativity and shaped his sound.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Now based in Louisiana for over two decades, Shaun has refined his artistry and established himself as a respected voice in R&B and Soul. As an artist and Co-CEO of Versatile Minds Entertainment, he brings both passion and leadership to the culture.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                        Shaun Allen's music is rooted in vivid storytelling—crafted to make listeners feel, see, and experience every moment. With standout songs like <span className="text-white font-bold">"Backstabbers"</span> and <span className="text-white font-bold">"Mind Playing Tricks,"</span> his work resonates with true music lovers who appreciate depth, honesty, and real-life emotion.
                      </p>
                      <div className="bg-white/5 rounded-lg p-4 border border-[#C00000]/20 mb-6">
                        <p className="text-white font-black text-sm mb-2">SEX LOVE & HEARTBREAK — OUT NOW</p>
                        <p className="text-gray-400 text-xs italic">"Don't forget the dot."</p>
                      </div>
                      <div className="border-t border-white/10 pt-6 space-y-2">
                        <p className="text-white font-bold text-sm">STORYTELLER / SINGER</p>
                        <p className="text-gray-400 text-sm">Booking: versatilemindsent@gmail.com</p>
                        <p className="text-gray-400 text-sm">beat.your.feet@gmail.com</p>
                        <p className="text-gray-400 text-sm">@shaun.allen.vme</p>
                        <p className="text-[#C00000] font-bold text-sm mt-3">VERSATILE MINDS ENTERTAINMENT</p>
                        <p className="text-gray-400 text-sm">RUNNIN WIT IT GRAPHICS</p>
                      </div>
                    </>
                  )}

                  {/* ── Beanut ── */}
                  {profileArtist.slug === 'beanut' && (
                    <>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Beanut is the embodiment of Versatile Minds Entertainment's mission—creative ownership, cultural truth, and generational vision.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Raised in Louisiana, shaped in Detroit, and now based in Ohio, Beanut's journey reflects the sound, struggle, and soul of multiple regions. That diversity is embedded in everything he touches. He is not just an artist, but a manager, producer, creative architect, and serial entrepreneur who understands music as both culture and business.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        As an artist, Beanut blends hip hop, R&B, Southern soul, reggae, and experimental sounds into music that speaks to love, resilience, wealth consciousness, and community empowerment. As a producer, he develops records from concept to completion, leveraging both traditional musicianship and cutting-edge AI tools to push creative boundaries while maintaining authenticity.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        Beyond the studio, Beanut serves as a manager and strategist, guiding artists through branding, content strategy, distribution, and long-term career planning. His focus is not on short-term clout, but on ownership, sustainability, and legacy.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        In addition to music, Beanut is a cereal entrepreneur, applying the same creativity and discipline from entertainment into consumer brands—proving that artistry and entrepreneurship are not separate paths, but parallel ones. His ventures reflect a broader philosophy: build assets, tell your story, and control your narrative.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        At VME, Beanut is the connective force—bridging art, business, and innovation. Whether developing talent, producing records, or building brands, his work is driven by one principle:
                      </p>
                      <p className="text-[#C00000] font-black text-lg sm:text-xl italic">
                        Versatility isn't optional—it's survival.
                      </p>
                    </>
                  )}

                  {/* ── Default / Other Artists ── */}
                  {!['atf', 'lil-daddy', 's-dot', 'beanut'].includes(profileArtist.slug) && (
                    <>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        {profileArtist.type === 'ai'
                          ? "NOX is VME's pioneering AI artist, pushing the boundaries of what's possible when machine learning meets musical creativity. Trained on thousands of underground tracks and equipped with cutting-edge generative algorithms, NOX creates soundscapes that blur the line between human and artificial intelligence."
                          : `${profileArtist.name} represents the raw, authentic voice of the underground. With a unique blend of street poetry and innovative production, they've become one of VME's most respected artists.`
                        }
                      </p>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                        Part of the VME Syndicate since 2024, bringing a fresh perspective to the creative collective and collaborating with both human and AI artists to define the sound of tomorrow.
                      </p>
                    </>
                  )}

                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">UPCOMING EVENTS</h3>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-[#C00000]/50 transition-all"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div className="bg-[#C00000]/10 border border-[#C00000]/30 rounded-lg p-3 sm:p-4 text-center min-w-[60px] sm:min-w-[80px]">
                        <div className="text-[#C00000] font-black text-lg sm:text-2xl">FEB</div>
                        <div className="text-white font-black text-2xl sm:text-3xl">{10 + i}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">
                          VME Syndicate Live Session #{i}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2 sm:mb-3">Underground Venue, Los Angeles</p>
                        <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all">
                          GET TICKETS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'syndicate' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">THE SYNDICATE</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {SYNDICATE_CONNECTIONS.map((connection) => (
                    <div
                      key={connection.id}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all cursor-pointer"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={connection.image}
                          alt={connection.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                            <p className="text-white font-bold text-xs sm:text-sm truncate">{connection.name}</p>
                            <p className="text-[#C00000] text-[10px] sm:text-xs">{connection.relation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
                <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-black text-white mb-2">COMING SOON</h3>
                <p className="text-gray-400">Video content is being prepared for release.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white font-black mb-3 sm:mb-4 text-sm sm:text-base">ARTIST STATS</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Total Plays</span>
                  <span className="text-white font-bold text-sm sm:text-base">12.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Collaborations</span>
                  <span className="text-white font-bold text-sm sm:text-base">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Awards</span>
                  <span className="text-white font-bold text-sm sm:text-base">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Syndicate Rank</span>
                  <span className="text-[#C00000] font-bold text-sm sm:text-base">#3</span>
                </div>
              </div>
            </div>

            {/* Merch */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-white font-black text-sm sm:text-base">EXCLUSIVE MERCH</h3>
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#C00000]" />
              </div>
              <div className="space-y-3">
                {MERCH.slice(0, 2).map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-28 sm:h-32 object-cover rounded-lg mb-2 group-hover:opacity-75 transition-opacity"
                    />
                    <h4 className="text-white text-xs sm:text-sm font-bold truncate">{item.name}</h4>
                    <p className="text-[#C00000] font-bold text-sm sm:text-base">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white font-black mb-3 sm:mb-4 text-sm sm:text-base">CONNECT</h3>
              <div className="space-y-2">
                {['Spotify', 'Apple Music', 'SoundCloud', 'Instagram'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex items-center justify-between text-gray-400 hover:text-[#C00000] transition-colors py-2 border-b border-white/5 last:border-0 text-sm"
                  >
                    <span>{platform}</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Artists List Page (for /artists route) ───
const ArtistsPage = () => {
  const navigate = useNavigate();
  const isLoading = useSimulatedLoading(400);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] pb-32">
        <div className="container mx-auto px-4 py-12">
          <SkeletonPulse className="h-10 w-48 mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8 sm:mb-12">
          ALL ARTISTS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.slug}`)}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-[#C00000]/20"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                {artist.type === 'ai' && (
                  <div className="absolute top-3 right-3 bg-[#C00000] text-white px-3 py-1 rounded-full text-xs font-bold">
                    AI ARTIST
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-black text-white">{artist.name}</h3>
                    {artist.verified && <Star className="w-5 h-5 text-[#C00000] fill-[#C00000]" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{artist.genre}</span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {artist.followers}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Shop Page (for /shop route) ───
const ShopPage = () => {
  const isLoading = useSimulatedLoading(400);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] pb-32">
        <div className="container mx-auto px-4 py-12">
          <SkeletonPulse className="h-10 w-48 mb-8" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            SHOP
          </h2>
          <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-[#C00000]" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {MERCH.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all group cursor-pointer"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-[#C00000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#C00000]/80 transition-colors">
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{item.name}</h3>
                <p className="text-[#C00000] text-xl font-black">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── App Shell (Header + Router + Player) ───
const AppShell = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  }, []);

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-[#C00000]/30 z-40">
        <nav className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <VMELogo className="h-9 w-9 sm:h-12 sm:w-12 transition-transform group-hover:scale-110" />
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter">
                  VME<span className="text-[#C00000]">.</span>
                </h1>
                <p className="text-[8px] sm:text-[10px] text-gray-500 tracking-widest uppercase">Versatile Minds Entertainment</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors font-medium">
                HOME
              </Link>
              <Link to="/artists" className="text-gray-400 hover:text-white transition-colors font-medium">
                ARTISTS
              </Link>
              <Link to="/shop" className="text-gray-400 hover:text-white transition-colors font-medium">
                SHOP
              </Link>
              <Link
                to="/pro"
                className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-5 lg:px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#C00000]/30"
              >
                VME PRO
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/artist/:slug" element={<ArtistProfile />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/pro" element={
            <div className="min-h-screen bg-[#111111] flex items-center justify-center pb-32">
              <div className="text-center px-4">
                <Crown className="w-16 h-16 text-[#C00000] mx-auto mb-6" />
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">VME PRO</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">Exclusive access to unreleased tracks, live sessions, and syndicate perks.</p>
                <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-[#C00000]/50">
                  COMING SOON
                </button>
              </div>
            </div>
          } />
          <Route path="*" element={
            <div className="min-h-screen bg-[#111111] flex items-center justify-center pb-32">
              <div className="text-center">
                <h2 className="text-6xl font-black text-white mb-4">404</h2>
                <p className="text-gray-400 mb-8">Page not found</p>
                <Link to="/" className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  GO HOME
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </main>

      {/* Persistent Audio Player */}
      <AudioPlayer
        currentTrack={TRACKS[currentTrackIndex]}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

// ─── Root Component with BrowserRouter ───
const VMEPlatform = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default VMEPlatform;





