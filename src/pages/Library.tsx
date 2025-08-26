import React from 'react';
import { TrackItem } from '@/components/TrackItem';
import { AlbumCard } from '@/components/AlbumCard';
import { Track, Album, Playlist } from '@/types/music';
import { Heart, Clock, Music2, ListMusic, Download, Filter } from 'lucide-react';

export const Library: React.FC = () => {
  const likedTracks: Track[] = [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Wave',
      album: 'Starlight',
      duration: '3:45',
      coverUrl: '/api/placeholder/50/50',
      isLiked: true
    },
    {
      id: '2',
      title: 'Electric Soul',
      artist: 'Neon Lights',
      album: 'City Nights',
      duration: '4:12',
      coverUrl: '/api/placeholder/50/50',
      isLiked: true
    },
    {
      id: '3',
      title: 'Ocean Breeze',
      artist: 'Azure Sky',
      album: 'Coastal',
      duration: '3:28',
      coverUrl: '/api/placeholder/50/50',
      isLiked: true
    },
    {
      id: '4',
      title: 'Urban Rhythm',
      artist: 'City Beats',
      album: 'Metro',
      duration: '3:56',
      coverUrl: '/api/placeholder/50/50',
      isLiked: true
    },
  ];

  const savedAlbums: Album[] = [
    {
      id: '1',
      title: 'Starlight Symphony',
      artist: 'Luna Wave',
      year: 2024,
      coverUrl: '/api/placeholder/200/200'
    },
    {
      id: '2',
      title: 'Neon Dreams',
      artist: 'Electric Pulse',
      year: 2024,
      coverUrl: '/api/placeholder/200/200'
    },
    {
      id: '3',
      title: 'Ocean Tales',
      artist: 'Coastal Vibes',
      year: 2023,
      coverUrl: '/api/placeholder/200/200'
    },
    {
      id: '4',
      title: 'City Lights',
      artist: 'Urban Flow',
      year: 2023,
      coverUrl: '/api/placeholder/200/200'
    },
  ];

  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Chill Vibes',
      description: 'Perfect for relaxing',
      coverUrl: '/api/placeholder/200/200',
      tracks: 45,
      duration: '2h 45m',
      creator: 'You'
    },
    {
      id: '2',
      name: 'Workout Mix',
      description: 'High energy beats',
      coverUrl: '/api/placeholder/200/200',
      tracks: 32,
      duration: '1h 58m',
      creator: 'You'
    },
    {
      id: '3',
      name: 'Focus Flow',
      description: 'Deep concentration',
      coverUrl: '/api/placeholder/200/200',
      tracks: 28,
      duration: '1h 42m',
      creator: 'You'
    },
  ];

  const [activeTab, setActiveTab] = React.useState('playlists');

  return (
    <div className="animate-in">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Library</h1>
        <p className="text-muted-foreground">All your music in one place</p>
      </section>

      {/* Stats Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-neumorphic p-4">
            <Heart className="text-primary mb-2" size={24} />
            <p className="text-2xl font-bold">248</p>
            <p className="text-sm text-muted-foreground">Liked Songs</p>
          </div>
          <div className="card-neumorphic p-4">
            <Music2 className="text-secondary mb-2" size={24} />
            <p className="text-2xl font-bold">42</p>
            <p className="text-sm text-muted-foreground">Albums</p>
          </div>
          <div className="card-neumorphic p-4">
            <ListMusic className="text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-muted-foreground">Playlists</p>
          </div>
          <div className="card-neumorphic p-4">
            <Download className="text-green-500 mb-2" size={24} />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="mb-6">
        <div className="flex gap-2 border-b border-border">
          {['playlists', 'albums', 'liked', 'artists'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors relative ${
                activeTab === tab 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'playlists' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Playlists</h2>
            <button className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="card-neumorphic p-4 cursor-pointer group">
                <div className="flex gap-4">
                  <img 
                    src={playlist.coverUrl} 
                    alt={playlist.name}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{playlist.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {playlist.tracks} tracks • {playlist.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'albums' && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Saved Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {activeTab === 'liked' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Liked Songs</h2>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary-hover transition-colors">
              Play All
            </button>
          </div>
          <div className="card-neumorphic p-4">
            <div className="space-y-1">
              {likedTracks.map((track, index) => (
                <TrackItem key={track.id} track={track} index={index + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'artists' && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Following Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="text-center cursor-pointer group">
                <div className="relative mb-3">
                  <img 
                    src="/api/placeholder/150/150" 
                    alt={`Artist ${i}`}
                    className="w-full aspect-square rounded-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-sm">Artist Name</h3>
                <p className="text-xs text-muted-foreground">2.5M followers</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};