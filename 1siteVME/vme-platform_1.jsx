import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, ShoppingBag, Calendar, Music, Users, Star, TrendingUp, Crown, Zap, Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';

// Mock Data
const ARTISTS = [
  { id: 1, name: 'Lil Daddy', type: 'human', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', genre: 'Hip-Hop', followers: '125K', verified: true },
  { id: 2, name: 'NOX', type: 'ai', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop', genre: 'Electronic', followers: '89K', verified: true },
  { id: 3, name: 'S.Dot', type: 'human', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', genre: 'R&B', followers: '156K', verified: true },
  { id: 4, name: 'ATF', type: 'human', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', genre: 'Trap', followers: '201K', verified: true },
  { id: 5, name: 'Stoka P.', type: 'human', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', genre: 'Hip-Hop', followers: '178K', verified: true }
];

const TRACKS = [
  { id: 1, title: 'Midnight Protocol', artist: 'NOX', duration: '3:45', cover: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop' },
  { id: 2, title: 'Underground Kings', artist: 'Lil Daddy', duration: '4:12', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { id: 3, title: 'Velvet Nights', artist: 'S.Dot', duration: '3:28', cover: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop' }
];

const BULLETINS = [
  { id: 1, author: 'Beanut', role: 'Boss Management', message: 'New VME Pro tier dropping next week. Exclusive early access to NOX's upcoming album. 🔥', time: '2h ago', likes: 234 },
  { id: 2, author: 'Lil Daddy', role: 'Artist', message: 'Studio session with ATF tonight. Something special coming...', time: '5h ago', likes: 567 },
  { id: 3, author: 'NOX', role: 'AI Artist', message: 'Generated 47 new tracks this week. The algorithm is evolving. Which genre should I explore next?', time: '1d ago', likes: 892 }
];

const MERCH = [
  { id: 1, name: 'VME Syndicate Hoodie', price: 85, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
  { id: 2, name: 'NOX Digital Artifact NFT', price: 150, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop' },
  { id: 3, name: 'Limited Edition Vinyl Pack', price: 120, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop' }
];

const SYNDICATE_CONNECTIONS = [
  { id: 1, name: 'Lil Daddy', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', relation: 'Collaborator' },
  { id: 2, name: 'S.Dot', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', relation: 'Producer' },
  { id: 3, name: 'Beanut', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', relation: 'Manager' },
  { id: 4, name: 'ATF', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', relation: 'Artist' },
  { id: 5, name: 'Stoka P.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', relation: 'Featured' },
  { id: 6, name: 'VME Studios', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', relation: 'Label' },
  { id: 7, name: 'DJ Nexus', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop', relation: 'DJ' },
  { id: 8, name: 'Visual Core', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', relation: 'Visuals' },
  { id: 9, name: 'The Archive', image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=200&fit=crop', relation: 'Curator' }
];

// Persistent Audio Player Component
const AudioPlayer = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [volume, setVolume] = useState(75);
  const [visualizerData, setVisualizerData] = useState([]);

  useEffect(() => {
    // Simulate frequency visualizer data
    const interval = setInterval(() => {
      if (isPlaying) {
        setVisualizerData(Array.from({ length: 32 }, () => Math.random() * 100));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#C00000]/30 z-50">
      {/* Visualizer */}
      <div className="h-1 bg-gradient-to-r from-black via-[#C00000] to-black overflow-hidden">
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

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img 
              src={currentTrack?.cover} 
              alt={currentTrack?.title}
              className="w-12 h-12 rounded object-cover shadow-lg shadow-[#C00000]/20"
            />
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">{currentTrack?.title}</h4>
              <p className="text-gray-400 text-xs truncate">{currentTrack?.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onPrev}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={onPlayPause}
              className="bg-[#C00000] hover:bg-[#C00000]/80 text-white rounded-full p-3 transition-all shadow-lg shadow-[#C00000]/50 hover:shadow-[#C00000]/70"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button 
              onClick={onNext}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
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

// Landing Page Component
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
          <div className="flex justify-center mb-8">
            <img 
              src="/mnt/user-data/uploads/VME_logo_trn.svg" 
              alt="VME Logo" 
              className="h-32 w-32 md:h-40 md:w-40 animate-pulse drop-shadow-[0_0_30px_rgba(192,0,0,0.5)]"
            />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-[#C00000]/10 border border-[#C00000]/30 rounded-full px-6 py-2 mb-8">
            <Zap className="w-4 h-4 text-[#C00000]" />
            <span className="text-[#C00000] text-sm font-bold tracking-wider">VME 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
            THE SYNDICATE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C00000] to-white animate-pulse">
              AWAITS
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            Where human creativity meets AI innovation. The underground's most exclusive creative hub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-[#C00000]/50 hover:shadow-[#C00000]/70 hover:scale-105">
              <div className="flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" />
                GET VME PRO
              </div>
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all border border-white/10 hover:border-[#C00000]/50"
            >
              EXPLORE ARTISTS
            </button>
          </div>
        </div>
      </section>

      {/* Trending Artists Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            TRENDING NOW
          </h2>
          <TrendingUp className="w-8 h-8 text-[#C00000]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              onClick={() => onNavigate('profile', artist)}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-[#C00000]/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {artist.type === 'ai' && (
                  <div className="absolute top-4 right-4 bg-[#C00000] text-white px-3 py-1 rounded-full text-xs font-bold">
                    AI ARTIST
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-black text-white">{artist.name}</h3>
                    {artist.verified && (
                      <Star className="w-5 h-5 text-[#C00000] fill-[#C00000]" />
                    )}
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
      </section>

      {/* Activity Feed */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-12">
          SYNDICATE FEED
        </h2>

        <div className="space-y-4">
          {BULLETINS.map((bulletin) => (
            <div 
              key={bulletin.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#C00000]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-white font-bold">{bulletin.author}</h4>
                    <span className="text-[#C00000] text-xs bg-[#C00000]/10 px-2 py-1 rounded">
                      {bulletin.role}
                    </span>
                    <span className="text-gray-500 text-sm ml-auto">{bulletin.time}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{bulletin.message}</p>
                  <div className="flex items-center gap-6 text-gray-400 text-sm">
                    <button className="flex items-center gap-2 hover:text-[#C00000] transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{bulletin.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#C00000] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#C00000] transition-colors">
                      <Share2 className="w-4 h-4" />
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
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            DIGITAL STOREFRONT
          </h2>
          <ShoppingBag className="w-8 h-8 text-[#C00000]" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {MERCH.map((item) => (
            <div 
              key={item.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#C00000]/50 transition-all group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
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
      </section>
    </div>
  );
};

// Artist Profile Component
const ArtistProfile = ({ artist, onBack }) => {
  const [activeTab, setActiveTab] = useState('music');
  const profileArtist = artist || ARTISTS[1]; // Default to NOX

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={profileArtist.image} 
          alt={profileArtist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#111111]" />
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all"
        >
          ← BACK
        </button>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-12">
          <img 
            src={profileArtist.image} 
            alt={profileArtist.name}
            className="w-40 h-40 rounded-xl object-cover border-4 border-[#C00000] shadow-2xl shadow-[#C00000]/50"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                {profileArtist.name}
              </h1>
              {profileArtist.verified && (
                <Star className="w-8 h-8 text-[#C00000] fill-[#C00000]" />
              )}
              {profileArtist.type === 'ai' && (
                <span className="bg-[#C00000] text-white px-4 py-1 rounded-full text-sm font-bold">
                  AI ARTIST
                </span>
              )}
            </div>
            
            <p className="text-xl text-gray-400 mb-4">{profileArtist.genre}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <span className="text-gray-400 text-sm">Followers</span>
                <p className="text-white font-bold text-lg">{profileArtist.followers}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <span className="text-gray-400 text-sm">Tracks</span>
                <p className="text-white font-bold text-lg">47</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <span className="text-gray-400 text-sm">Monthly Listeners</span>
                <p className="text-white font-bold text-lg">2.4M</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-[#C00000]/50">
                FOLLOW
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-bold transition-all border border-white/10 hover:border-[#C00000]/50">
                MESSAGE
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-lg font-bold transition-all border border-white/10 hover:border-[#C00000]/50">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
          {['music', 'videos', 'events', 'bio', 'syndicate'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'music' && (
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white mb-6">LATEST TRACKS</h3>
                {TRACKS.map((track, index) => (
                  <div 
                    key={track.id}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#C00000]/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-gray-500 font-bold w-6">{index + 1}</div>
                      <img 
                        src={track.cover} 
                        alt={track.title}
                        className="w-14 h-14 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold truncate group-hover:text-[#C00000] transition-colors">
                          {track.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                      </div>
                      <div className="text-gray-400 text-sm">{track.duration}</div>
                      <button className="text-gray-400 hover:text-[#C00000] transition-colors opacity-0 group-hover:opacity-100">
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bio' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl font-black text-white mb-6">ABOUT</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {profileArtist.type === 'ai' 
                      ? "NOX is VME's pioneering AI artist, pushing the boundaries of what's possible when machine learning meets musical creativity. Trained on thousands of underground tracks and equipped with cutting-edge generative algorithms, NOX creates soundscapes that blur the line between human and artificial intelligence."
                      : `${profileArtist.name} represents the raw, authentic voice of the underground. With a unique blend of street poetry and innovative production, they've become one of VME's most respected artists.`
                    }
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Part of the VME Syndicate since 2024, bringing a fresh perspective to the creative collective and collaborating with both human and AI artists to define the sound of tomorrow.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white mb-6">UPCOMING EVENTS</h3>
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#C00000]/50 transition-all"
                  >
                    <div className="flex gap-6">
                      <div className="bg-[#C00000]/10 border border-[#C00000]/30 rounded-lg p-4 text-center min-w-[80px]">
                        <div className="text-[#C00000] font-black text-2xl">FEB</div>
                        <div className="text-white font-black text-3xl">{10 + i}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg mb-2">
                          VME Syndicate Live Session #{i}
                        </h4>
                        <p className="text-gray-400 mb-3">Underground Venue, Los Angeles</p>
                        <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all">
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
                <h3 className="text-2xl font-black text-white mb-6">THE SYNDICATE</h3>
                <div className="grid grid-cols-3 gap-4">
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
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white font-bold text-sm truncate">{connection.name}</p>
                            <p className="text-[#C00000] text-xs">{connection.relation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-black mb-4">ARTIST STATS</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Plays</span>
                  <span className="text-white font-bold">12.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Collaborations</span>
                  <span className="text-white font-bold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Awards</span>
                  <span className="text-white font-bold">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Syndicate Rank</span>
                  <span className="text-[#C00000] font-bold">#3</span>
                </div>
              </div>
            </div>

            {/* Merch */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-black">EXCLUSIVE MERCH</h3>
                <ShoppingBag className="w-5 h-5 text-[#C00000]" />
              </div>
              <div className="space-y-3">
                {MERCH.slice(0, 2).map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-75 transition-opacity"
                    />
                    <h4 className="text-white text-sm font-bold truncate">{item.name}</h4>
                    <p className="text-[#C00000] font-bold">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-black mb-4">CONNECT</h3>
              <div className="space-y-2">
                {['Spotify', 'Apple Music', 'SoundCloud', 'Instagram'].map((platform) => (
                  <a 
                    key={platform}
                    href="#"
                    className="flex items-center justify-between text-gray-400 hover:text-[#C00000] transition-colors py-2 border-b border-white/5 last:border-0"
                  >
                    <span>{platform}</span>
                    <ExternalLink className="w-4 h-4" />
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

// Main App Component
const VMEPlatform = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleNavigate = (page, artist = null) => {
    setCurrentPage(page);
    setSelectedArtist(artist);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-[#C00000]/30 z-40">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleNavigate('landing')}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <img 
                src="/mnt/user-data/uploads/VME_logo_trn.svg" 
                alt="VME Logo" 
                className="h-12 w-12 transition-transform group-hover:scale-110"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                  VME<span className="text-[#C00000]">.</span>
                </h1>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">Versatile Minds Entertainment</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => handleNavigate('landing')}
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                HOME
              </button>
              <button className="text-gray-400 hover:text-white transition-colors font-medium">
                ARTISTS
              </button>
              <button className="text-gray-400 hover:text-white transition-colors font-medium">
                SHOP
              </button>
              <button className="bg-[#C00000] hover:bg-[#C00000]/80 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#C00000]/30">
                VME PRO
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'profile' && (
          <ArtistProfile 
            artist={selectedArtist} 
            onBack={() => handleNavigate('landing')}
          />
        )}
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

export default VMEPlatform;