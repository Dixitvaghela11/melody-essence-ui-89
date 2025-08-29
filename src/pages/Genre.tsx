import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Album } from '@/types/music';
import { AlbumCard } from '@/components/AlbumCard';
import { ChevronLeft } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

interface ITunesTrackResult {
  collectionId?: number;
  trackId?: number;
  collectionName?: string;
  trackCensoredName?: string;
  artistName?: string;
  releaseDate?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
}

export const GenrePage: React.FC = () => {
  const { name = '' } = useParams();
  const navigate = useNavigate();
  const { setCurrentTrack, setMusicPlaying } = usePlayer();
  const [albums, setAlbums] = React.useState<Album[]>([]);
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

    async function fetchByGenre(genre: string) {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(genre)}&country=IN&media=music&entity=song`, { signal: controller.signal, headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error('Failed to fetch genre');
        const json = await res.json();
        const mapToAlbum = (item: ITunesTrackResult): Album => ({
          id: String(item.collectionId ?? item.trackId ?? crypto.randomUUID()),
          title: (item.collectionName ?? item.trackCensoredName ?? 'Unknown') as string,
          artist: item.artistName ?? 'Unknown',
          year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : new Date().getFullYear(),
          coverUrl: (item.artworkUrl100 || item.artworkUrl60 || '/api/placeholder/300/300').replace('100x100bb', '300x300bb')
        });
        if (isCancelled) return;
        setAlbums((json.results || []).map(mapToAlbum));
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchByGenre(name);
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [name]);

  const title = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="animate-in">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-sm text-primary hover:text-primary-hover flex items-center gap-1">
          <ChevronLeft size={16} />
          Back
        </button>
        <h2 className="text-2xl font-bold">{title} • India</h2>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumCard 
              key={album.id} 
              album={album} 
              onPlay={() => handlePlaySong(album)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;


