import React from 'react';
import { AlbumCard } from '@/components/AlbumCard';
import { Album, Playlist } from '@/types/music';
import { ChevronRight, TrendingUp, Clock, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/contexts/PlayerContext';
import heroImage from '@/assets/hero-music.jpg';

interface ITunesAlbumResult {
  collectionId?: number;
  trackId?: number;
  collectionName?: string;
  trackCensoredName?: string;
  artistName?: string;
  releaseDate?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setMusicPlaying } = usePlayer();

  // Remote albums state
  const [trendingAlbums, setTrendingAlbums] = React.useState<Album[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<Album[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handlePlaySong = (album: Album) => {
    setCurrentTrack({
      title: album.title,
      artist: album.artist,
      coverUrl: album.coverUrl,
      duration: '3:45' // Default duration since we don't have it from iTunes API
    });
    setMusicPlaying(true);
  };

  React.useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    async function fetchAlbums() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        // Helper to map iTunes album result to Album type
        const mapToAlbum = (item: ITunesAlbumResult): Album => ({
          id: String(item.collectionId ?? item.trackId ?? crypto.randomUUID()),
          title: (item.collectionName ?? item.trackCensoredName ?? 'Unknown') as string,
          artist: item.artistName ?? 'Unknown',
          year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : new Date().getFullYear(),
          coverUrl: (item.artworkUrl100 || item.artworkUrl60 || '/api/placeholder/300/300').replace('100x100bb', '300x300bb')
        });

        // Fetch a couple of popular genres to simulate sections
        const headers: HeadersInit = { 'Accept': 'application/json' };
        const requests: Array<Promise<Response>> = [
          fetch(`https://itunes.apple.com/search?term=${encodeURIComponent('india')}&country=IN&media=music&entity=song`, { signal: controller.signal, headers }),
          fetch(`https://itunes.apple.com/search?term=${encodeURIComponent('bollywood')}&country=IN&media=music&entity=song`, { signal: controller.signal, headers })
        ];

        const [trendingRes, recentRes] = await Promise.all(requests);
        let combinedError: string | null = null;
        type ITunesSearchResponse = { resultCount?: number; results?: ITunesAlbumResult[] };
        let trendingJson: ITunesSearchResponse = { results: [] };
        let recentJson: ITunesSearchResponse = { results: [] };

        if (trendingRes.ok) {
          trendingJson = await trendingRes.json();
        } else {
          combinedError = `Trending status ${trendingRes.status}`;
        }

        if (recentRes.ok) {
          recentJson = await recentRes.json();
        } else {
          combinedError = combinedError ? `${combinedError}; Recent status ${recentRes.status}` : `Recent status ${recentRes.status}`;
        }

        if (isCancelled) return;

        setTrendingAlbums((trendingJson.results || []).map(mapToAlbum));
        setRecentlyPlayed((recentJson.results || []).map(mapToAlbum));
        if (combinedError) setErrorMessage(`Failed to fetch from iTunes API. ${combinedError}`);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        const message = error instanceof Error ? error.message : 'Something went wrong while fetching music.';
        setErrorMessage(message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchAlbums();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, []);

  const categories = [
    { name: 'Pop', gradient: 'from-pink-500 to-purple-500', icon: Music },
    { name: 'Rock', gradient: 'from-red-500 to-orange-500', icon: Music },
    { name: 'Hip Hop', gradient: 'from-purple-600 to-blue-600', icon: Music },
    { name: 'Electronic', gradient: 'from-blue-500 to-cyan-500', icon: Music },
    { name: 'Jazz', gradient: 'from-amber-500 to-orange-500', icon: Music },
    { name: 'Classical', gradient: 'from-emerald-500 to-teal-500', icon: Music },
  ];

  return (
    <div className="animate-in">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden">
          <img src={heroImage} alt="Music Hero" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent"></div>
          <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4">Your music journey continues</p>
            <button
              onClick={() => navigate('/trending')}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full w-fit hover:bg-primary-hover transition-colors"
            >
              <TrendingUp size={20} />
              Explore Trending
            </button>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button 
              key={category.name}
              onClick={() => navigate(`/genre/${category.name.toLowerCase()}`)}
              className="group relative h-24 rounded-xl overflow-hidden transition-transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <category.icon size={24} className="mb-1" />
                <span className="font-semibold text-sm">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-primary" size={20} />
            <span className="hidden sm:inline">Trending Now</span>
            <span className="sm:hidden">Trending</span>
          </h2>
          <button 
            onClick={() => navigate('/trending')}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            See all
            <ChevronRight size={16} />
          </button>
        </div>
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading albums…</p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
        {!isLoading && !errorMessage && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingAlbums.map((album) => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                onPlay={() => handlePlaySong(album)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recently Played */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Clock className="text-muted-foreground" size={20} />
            <span className="hidden sm:inline">Recently Played</span>
            <span className="sm:hidden">Recent</span>
          </h2>
          <button 
            onClick={() => navigate('/history')}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            View history
            <ChevronRight size={16} />
          </button>
        </div>
        {!isLoading && !errorMessage && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyPlayed.map((album) => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                onPlay={() => handlePlaySong(album)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Made For You */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Made For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600"></div>
            <div className="relative h-full p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold mb-1">Daily Mix 1</h3>
              <p className="text-white/80 text-sm">Luna Wave, Neon Lights and more</p>
            </div>
          </div>
          <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600"></div>
            <div className="relative h-full p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold mb-1">Discover Weekly</h3>
              <p className="text-white/80 text-sm">Your weekly mixtape of fresh music</p>
            </div>
          </div>
          <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600"></div>
            <div className="relative h-full p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold mb-1">Release Radar</h3>
              <p className="text-white/80 text-sm">Catch all the latest music</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};