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
  Mic2,
  Radio
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { RadioStation } from '@/types/music';

interface MusicPlayerProps {
  currentTrack?: {
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
  };
  currentRadioStation?: RadioStation;
  onPlayPause?: () => void;
  onVolumeChange?: (volume: number) => void;
  isPlaying?: boolean;
  isRadio?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentTrack, 
  currentRadioStation,
  onPlayPause,
  onVolumeChange,
  isPlaying = false,
  isRadio = false
}) => {
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
  const currentItem = isRadio ? currentRadioStation : track;

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    onVolumeChange?.(newVolume[0]);
  };

  const handlePlayPause = () => {
    onPlayPause?.();
  };

  const getDisplayInfo = () => {
    if (isRadio && currentRadioStation) {
      return {
        title: currentRadioStation.name,
        artist: currentRadioStation.genre,
        coverUrl: currentRadioStation.imageUrl,
        duration: currentRadioStation.frequency || "Live"
      };
    }
    return track;
  };

  const displayInfo = getDisplayInfo();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-player-background glass border-t border-border z-50">
      {/* Mobile Progress Bar - Top of player */}
      <div className="block sm:hidden px-4 pt-1">
        <Slider 
          value={progress} 
          onValueChange={setProgress}
          max={100} 
          step={1} 
          className="w-full h-1"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1:23</span>
          <span>{displayInfo.duration}</span>
        </div>
      </div>

      <div className="h-16 sm:h-20 flex items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Track Info */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-[35%] sm:max-w-[40%] lg:max-w-none">
          <div className="relative">
            <img 
              src={displayInfo.coverUrl} 
              alt={displayInfo.title}
              className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg shadow-md flex-shrink-0"
            />
            {isRadio && (
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                <Radio size={10} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-xs sm:text-sm truncate">{displayInfo.title}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {isRadio ? `${displayInfo.artist} • Live` : displayInfo.artist}
            </p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="hidden sm:block ml-2"
            aria-label={isLiked ? "Unlike" : "Like"}
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
              aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"}
            >
              <Shuffle size={16} />
            </button>
            <button 
              className="text-foreground hover:text-primary"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={handlePlayPause}
              className="bg-primary text-primary-foreground rounded-full p-2 sm:p-2.5 hover:bg-primary-hover"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? 
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
              }
            </button>
            <button 
              className="text-foreground hover:text-primary"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => setRepeat(!repeat)}
              className={cn(
                "hidden sm:block",
                repeat ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={repeat ? "Disable repeat" : "Enable repeat"}
            >
              <Repeat size={16} />
            </button>
          </div>
          
          {/* Progress Bar - Desktop only */}
          <div className="hidden sm:flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground min-w-[32px]">1:23</span>
            <Slider 
              value={progress} 
              onValueChange={setProgress}
              max={100} 
              step={1} 
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[32px]">{displayInfo.duration}</span>
          </div>
        </div>

        {/* Volume & Extra Controls */}
        <div className="flex items-center gap-2 sm:gap-3 justify-end flex-1 max-w-[35%] sm:max-w-none">
          {/* Mobile volume control */}
          <div className="flex sm:hidden items-center">
            <button 
              onClick={() => handleVolumeChange(volume[0] === 0 ? [70] : [0])}
              className="text-muted-foreground hover:text-foreground"
              aria-label={volume[0] === 0 ? "Unmute" : "Mute"}
            >
              {volume[0] === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Desktop controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              className="hidden lg:block text-muted-foreground hover:text-foreground"
              aria-label="Voice commands"
            >
              <Mic2 size={18} />
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground"
              aria-label="Queue"
            >
              <ListMusic size={18} />
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleVolumeChange(volume[0] === 0 ? [70] : [0])}
                className="text-muted-foreground hover:text-foreground"
                aria-label={volume[0] === 0 ? "Unmute" : "Mute"}
              >
                {volume[0] === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <Slider 
                value={volume} 
                onValueChange={handleVolumeChange}
                max={100} 
                step={1} 
                className="w-16 lg:w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};