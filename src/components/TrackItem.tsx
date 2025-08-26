import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Track } from '@/types/music';
import { cn } from '@/lib/utils';

interface TrackItemProps {
  track: Track;
  index: number;
  onPlay?: () => void;
}

export const TrackItem: React.FC<TrackItemProps> = ({ track, index, onPlay }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(track.isLiked || false);

  return (
    <div 
      className={cn(
        "group flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200",
        "hover:bg-accent/30",
        track.isPlaying && "bg-accent/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track Number / Play Button */}
      <div className="w-10 flex justify-center">
        {isHovered || track.isPlaying ? (
          <button onClick={onPlay} className="player-control">
            {track.isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
          </button>
        ) : (
          <span className="text-sm text-muted-foreground">{index}</span>
        )}
      </div>

      {/* Album Cover */}
      <img 
        src={track.coverUrl} 
        alt={track.album}
        className="w-10 h-10 rounded"
      />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          track.isPlaying && "text-primary"
        )}>
          {track.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {track.artist} • {track.album}
        </p>
      </div>

      {/* Like Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity",
          isLiked && "opacity-100"
        )}
      >
        <Heart 
          size={16} 
          className={cn(
            "transition-colors",
            isLiked ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
          )}
        />
      </button>

      {/* Duration */}
      <span className="text-sm text-muted-foreground">{track.duration}</span>

      {/* More Options */}
      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal size={16} className="text-muted-foreground hover:text-foreground" />
      </button>
    </div>
  );
};