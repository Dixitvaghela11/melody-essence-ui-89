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
              "flex flex-col items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors min-w-[50px]",
              isActive 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon size={20} className="flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[10px] sm:text-xs font-medium leading-none">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};