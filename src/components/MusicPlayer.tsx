import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
  Mic2
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  currentTrack?: {
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
  };
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);
  const [isLiked, setIsLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const defaultTrack = {
    title: "Starlight Symphony",
    artist: "Luna Wave",
    coverUrl: "/api/placeholder/60/60",
    duration: "3:45"
  };

  const track = currentTrack || defaultTrack;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 bg-player-background glass border-t border-border z-50">
      <div className="h-full flex items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Track Info */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-[40%] lg:max-w-none">
          <img 
            src={track.coverUrl} 
            alt={track.title}
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg shadow-md flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-xs sm:text-sm truncate">{track.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="hidden sm:block ml-2"
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                isLiked ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
              )}
            />
          </button>
        </div>

        {/* Player Controls - Center */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-md lg:max-w-2xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setShuffle(!shuffle)}
              className={cn(
                "hidden sm:block",
                shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Shuffle size={16} />
            </button>
            <button className="text-foreground hover:text-primary">
              <SkipBack className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-primary text-primary-foreground rounded-full p-1.5 sm:p-2 hover:bg-primary-hover"
            >
              {isPlaying ? 
                <Pause className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" /> : 
                <Play className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] ml-0.5" />
              }
            </button>
            <button className="text-foreground hover:text-primary">
              <SkipForward className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => setRepeat(!repeat)}
              className={cn(
                "hidden sm:block",
                repeat ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Repeat size={16} />
            </button>
          </div>
          
          {/* Progress Bar - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground min-w-[32px]">1:23</span>
            <Slider 
              value={progress} 
              onValueChange={setProgress}
              max={100} 
              step={1} 
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[32px]">{track.duration}</span>
          </div>
        </div>

        {/* Volume & Extra Controls - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center gap-3 justify-end flex-1">
          <button className="text-muted-foreground hover:text-foreground">
            <Mic2 size={18} />
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <ListMusic size={18} />
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setVolume(volume[0] === 0 ? [70] : [0])}
              className="text-muted-foreground hover:text-foreground"
            >
              {volume[0] === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <Slider 
              value={volume} 
              onValueChange={setVolume}
              max={100} 
              step={1} 
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};