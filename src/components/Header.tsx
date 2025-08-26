import React, { useState } from 'react';
import { Search, Bell, Settings, User, Moon, Sun, ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-background/80 glass border-b border-border z-40">
      <div className="h-full flex items-center justify-between px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications - Hidden on mobile */}
          <button 
            onClick={() => setHasNotification(false)}
            className="hidden sm:block relative p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <Bell size={20} />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-slow"></span>
            )}
          </button>

          {/* Settings - Hidden on mobile */}
          <button className="hidden sm:block p-2 rounded-lg hover:bg-accent/50 transition-colors">
            <Settings size={20} />
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full hover:bg-accent/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User size={16} className="text-primary-foreground" />
                </div>
                <span className="hidden sm:block text-sm font-medium">John</span>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover/95 glass" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};