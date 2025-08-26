import React from 'react';
import { PodcastCard } from '@/components/PodcastCard';
import { Podcast } from '@/types/music';
import { Mic, TrendingUp, Clock, BookOpen } from 'lucide-react';

export const Podcasts: React.FC = () => {
  const trendingPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'Tech Talk Daily',
      host: 'Sarah Johnson',
      description: 'Daily insights into the latest technology trends, innovations, and startup culture.',
      coverUrl: '/api/placeholder/200/200',
      episodes: 245,
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Mind Matters',
      host: 'Dr. Michael Chen',
      description: 'Exploring psychology, mental health, and personal development with expert guests.',
      coverUrl: '/api/placeholder/200/200',
      episodes: 156,
      category: 'Health & Wellness'
    },
    {
      id: '3',
      title: 'History Uncovered',
      host: 'Emma Thompson',
      description: 'Diving deep into fascinating historical events and untold stories from the past.',
      coverUrl: '/api/placeholder/200/200',
      episodes: 89,
      category: 'History'
    },
    {
      id: '4',
      title: 'The Business Edge',
      host: 'Robert Martinez',
      description: 'Interviews with successful entrepreneurs and business leaders.',
      coverUrl: '/api/placeholder/200/200',
      episodes: 312,
      category: 'Business'
    },
  ];

  const categories = [
    { name: 'All', active: true },
    { name: 'Technology', active: false },
    { name: 'Business', active: false },
    { name: 'Comedy', active: false },
    { name: 'True Crime', active: false },
    { name: 'Health', active: false },
    { name: 'Sports', active: false },
    { name: 'Music', active: false },
  ];

  return (
    <div className="animate-in">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
        <p className="text-muted-foreground">Discover stories, ideas, and voices that matter</p>
      </section>

      {/* Category Pills */}
      <section className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category.active 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-accent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Podcast */}
      <section className="mb-8">
        <div className="relative h-64 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent"></div>
          <div className="relative h-full flex items-center px-8">
            <div className="flex gap-6 items-center">
              <img 
                src="/api/placeholder/150/150" 
                alt="Featured Podcast"
                className="w-32 h-32 rounded-xl shadow-lg"
              />
              <div className="text-white">
                <span className="text-sm font-medium opacity-90">FEATURED PODCAST</span>
                <h2 className="text-3xl font-bold mt-1 mb-2">The Creative Mind</h2>
                <p className="text-white/80 mb-4 max-w-lg">
                  Join host Alex Rivers as they explore creativity, innovation, and the artistic process with renowned creators.
                </p>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-colors">
                  Listen Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card-neumorphic p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Mic size={20} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">2.5K+</p>
              <p className="text-xs text-muted-foreground">Shows</p>
            </div>
          </div>
          <div className="card-neumorphic p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-blue-500 flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">50M+</p>
              <p className="text-xs text-muted-foreground">Episodes</p>
            </div>
          </div>
          <div className="card-neumorphic p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-muted-foreground">Live Shows</p>
            </div>
          </div>
          <div className="card-neumorphic p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">30+</p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Podcasts */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trending Podcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      {/* Your Shows */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Shows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-neumorphic p-4">
              <img 
                src="/api/placeholder/150/150" 
                alt={`Show ${i}`}
                className="w-full aspect-square rounded-lg mb-3"
              />
              <h3 className="font-semibold text-sm truncate">Daily News Brief</h3>
              <p className="text-xs text-muted-foreground">Updated daily</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};