import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Radio, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileBottomNav: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Radio, label: 'Radio', path: '/radio' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-20 sm:bottom-24 left-0 right-0 bg-background/95 glass border-t border-border lg:hidden z-40">
      <div className="flex justify-around items-center h-14 sm:h-16">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon size={18} className="sm:hidden" />
            <Icon size={20} className="hidden sm:block" />
            <span className="text-[10px] sm:text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};