import React from 'react';
import { RadioCard } from '@/components/RadioCard';
import { RadioStation } from '@/types/music';
import { Radio as RadioIcon, Globe, Music, Headphones } from 'lucide-react';

export const RadioPage: React.FC = () => {
  const liveStations: RadioStation[] = [
    {
      id: '1',
      name: 'Beats 1',
      genre: 'Hip Hop',
      imageUrl: '/api/placeholder/200/200',
      frequency: '87.7 FM',
      isLive: true
    },
    {
      id: '2',
      name: 'Jazz FM',
      genre: 'Jazz & Blues',
      imageUrl: '/api/placeholder/200/200',
      frequency: '91.1 FM',
      isLive: true
    },
    {
      id: '3',
      name: 'Rock Nation',
      genre: 'Rock & Metal',
      imageUrl: '/api/placeholder/200/200',
      frequency: '98.5 FM',
      isLive: true
    },
    {
      id: '4',
      name: 'Electronic Waves',
      genre: 'Electronic',
      imageUrl: '/api/placeholder/200/200',
      frequency: '102.3 FM',
      isLive: true
    },
    {
      id: '5',
      name: 'Classical Radio',
      genre: 'Classical',
      imageUrl: '/api/placeholder/200/200',
      frequency: '94.5 FM',
      isLive: false
    },
    {
      id: '6',
      name: 'Pop Hits',
      genre: 'Pop',
      imageUrl: '/api/placeholder/200/200',
      frequency: '106.1 FM',
      isLive: true
    },
  ];

  const genres = [
    'All Stations',
    'Pop',
    'Rock',
    'Hip Hop',
    'Electronic',
    'Jazz',
    'Classical',
    'Country',
    'R&B',
    'Latin'
  ];

  return (
    <div className="animate-in">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Radio Stations</h1>
        <p className="text-muted-foreground">Tune into live radio from around the world</p>
      </section>

      {/* Live Now Banner */}
      <section className="mb-8">
        <div className="relative h-48 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent"></div>
          <div className="relative h-full flex items-center px-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center animate-pulse-slow">
                <RadioIcon size={40} className="text-white" />
              </div>
              <div className="text-white">
                <span className="text-sm font-medium opacity-90 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE NOW
                </span>
                <h2 className="text-3xl font-bold mt-1 mb-2">Global Top 40</h2>
                <p className="text-white/80 mb-4">
                  The biggest hits from around the world, updated weekly
                </p>
                <button className="bg-white text-red-600 px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-colors">
                  Listen Live
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-neumorphic p-6 text-center">
            <Globe size={32} className="text-primary mx-auto mb-3" />
            <p className="text-2xl font-bold mb-1">50+</p>
            <p className="text-sm text-muted-foreground">Countries</p>
          </div>
          <div className="card-neumorphic p-6 text-center">
            <Music size={32} className="text-secondary mx-auto mb-3" />
            <p className="text-2xl font-bold mb-1">500+</p>
            <p className="text-sm text-muted-foreground">Stations</p>
          </div>
          <div className="card-neumorphic p-6 text-center">
            <Headphones size={32} className="text-accent mx-auto mb-3" />
            <p className="text-2xl font-bold mb-1">24/7</p>
            <p className="text-sm text-muted-foreground">Broadcasting</p>
          </div>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Browse by Genre</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {genres.map((genre, index) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                index === 0 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-accent'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Radio Stations Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Popular Stations</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm text-muted-foreground">
              {liveStations.filter(s => s.isLive).length} stations live
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {liveStations.map((station) => (
            <RadioCard key={station.id} station={station} />
          ))}
        </div>
      </section>

      {/* Local Stations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Local Stations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-neumorphic p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <RadioIcon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">City Radio {i}</h3>
                <p className="text-sm text-muted-foreground">Local News & Music</p>
                <p className="text-xs text-primary mt-1">103.{i} FM</p>
              </div>
              <button className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium">
                Tune In
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};