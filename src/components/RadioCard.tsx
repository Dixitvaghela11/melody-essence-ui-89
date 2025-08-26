import React from 'react';
import { Radio, Play, Signal } from 'lucide-react';
import { RadioStation } from '@/types/music';
import { cn } from '@/lib/utils';

interface RadioCardProps {
  station: RadioStation;
  onPlay?: () => void;
}

export const RadioCard: React.FC<RadioCardProps> = ({ station, onPlay }) => {
  return (
    <div className="group relative card-neumorphic p-4 cursor-pointer overflow-hidden">
      {/* Live Indicator */}
      {station.isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium z-10">
          <Signal size={12} className="animate-pulse" />
          LIVE
        </div>
      )}

      {/* Station Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img 
          src={station.imageUrl} 
          alt={station.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={onPlay}
            className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary-hover transform hover:scale-110 transition-all"
          >
            <Play size={24} className="ml-0.5" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Station Info */}
      <div className="text-center">
        <h3 className="font-semibold text-sm mb-1">{station.name}</h3>
        <p className="text-xs text-muted-foreground">{station.genre}</p>
        {station.frequency && (
          <p className="text-xs text-primary mt-1">{station.frequency}</p>
        )}
      </div>
    </div>
  );
};