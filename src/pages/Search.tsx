import React, { useState } from 'react';
import { Search as SearchIcon, TrendingUp, Clock, Mic } from 'lucide-react';
import { AlbumCard } from '@/components/AlbumCard';
import { Album } from '@/types/music';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const recentSearches = ['Luna Wave', 'Electronic', 'Jazz Playlist', 'Chill Vibes', 'Rock Classics'];
  
  const trendingSearches = [
    'Summer Hits 2024',
    'Workout Mix',
    'Study Music',
    'Party Anthems',
    'Relaxing Piano',
    'Top 50 Global'
  ];

  const searchResults: Album[] = [
    {
      id: '1',
      title: 'Search Result 1',
      artist: 'Artist Name',
      year: 2024,
      coverUrl: '/api/placeholder/200/200'
    },
    {
      id: '2',
      title: 'Search Result 2',
      artist: 'Artist Name',
      year: 2024,
      coverUrl: '/api/placeholder/200/200'
    },
  ];

  const genres = [
    { name: 'Pop', color: 'bg-pink-500' },
    { name: 'Hip Hop', color: 'bg-purple-500' },
    { name: 'Rock', color: 'bg-red-500' },
    { name: 'Electronic', color: 'bg-blue-500' },
    { name: 'Jazz', color: 'bg-amber-500' },
    { name: 'Classical', color: 'bg-emerald-500' },
    { name: 'R&B', color: 'bg-indigo-500' },
    { name: 'Country', color: 'bg-orange-500' },
  ];

  return (
    <div className="animate-in">
      {/* Search Header */}
      <section className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={24} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-card border border-border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            autoFocus
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
            <Mic size={24} />
          </button>
        </div>
      </section>

      {searchQuery ? (
        /* Search Results */
        <section>
          <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {searchResults.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Recent Searches */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-muted-foreground" />
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-accent transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </section>

          {/* Trending Searches */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Trending Searches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trendingSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center gap-3 p-3 bg-card hover:bg-card-hover rounded-lg transition-colors text-left"
                >
                  <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                  <span className="font-medium">{search}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Browse by Genre */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.name}
                  className={`relative h-32 rounded-xl overflow-hidden group ${genre.color}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                  <div className="relative h-full p-4 flex items-end">
                    <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};