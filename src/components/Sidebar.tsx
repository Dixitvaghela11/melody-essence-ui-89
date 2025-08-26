import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  Radio, 
  Podcast,
  Heart,
  PlusCircle,
  Music2,
  TrendingUp,
  Album,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
  ];
  
  const mediaItems = [
    { icon: Radio, label: 'Radio', path: '/radio' },
    { icon: Podcast, label: 'Podcasts', path: '/podcasts' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
  ];
  
  const libraryItems = [
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
    { icon: Album, label: 'Albums', path: '/albums' },
    { icon: Music2, label: 'Artists', path: '/artists' },
  ];

  const NavItem = ({ icon: Icon, label, path }: any) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink
        to={path}
        onClick={() => {
          if (window.innerWidth < 1024) {
            onClose();
          }
        }}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
          "hover:bg-accent/50",
          isActive && "bg-gradient-primary text-primary-foreground font-medium shadow-md"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Music2 size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold gradient-text">MelodyFlow</h1>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
          
          {/* Media Section */}
          <div className="mt-6 px-3">
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Discover
            </h3>
            <nav className="space-y-1">
              {mediaItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </nav>
          </div>
          
          {/* Library Section */}
          <div className="mt-6 px-3">
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Your Library
            </h3>
            <nav className="space-y-1">
              {libraryItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </nav>
          </div>
        </div>
        
        {/* Create Playlist */}
        <div className="p-3 mb-24">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </button>
        </div>
      </aside>
    </>
  );
};