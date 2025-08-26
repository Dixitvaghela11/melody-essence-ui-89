import React from 'react';
import { Play, Clock, Headphones } from 'lucide-react';
import { Podcast } from '@/types/music';

interface PodcastCardProps {
  podcast: Podcast;
  onPlay?: () => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, onPlay }) => {
  return (
    <div className="group card-neumorphic p-4 cursor-pointer">
      <div className="flex gap-4">
        {/* Cover Image */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={podcast.coverUrl} 
            alt={podcast.title}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onPlay}
            className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <div className="bg-primary text-primary-foreground rounded-full p-2.5">
              <Play size={16} className="ml-0.5" fill="currentColor" />
            </div>
          </button>
        </div>

        {/* Podcast Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1 truncate">{podcast.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{podcast.host}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {podcast.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Headphones size={14} />
              {podcast.episodes} episodes
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {podcast.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};