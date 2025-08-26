import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Album } from '@/types/music';
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  album: Album;
  onPlay?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPlay }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group relative card-neumorphic p-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img 
          src={album.coverUrl} 
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Play Button Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-between p-3 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <button 
            onClick={onPlay}
            className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary-hover transform hover:scale-110 transition-all"
          >
            <Play size={20} className="ml-0.5" fill="currentColor" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors">
              <Heart size={16} />
            </button>
            <button className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Album Info */}
      <div>
        <h3 className="font-semibold text-sm truncate mb-1">{album.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
        <p className="text-xs text-muted-foreground mt-1">{album.year}</p>
      </div>
    </div>
  );
};