import React from 'react';
import { X, Bell, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  onClose: () => void;
  isVisible: boolean;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ 
  message, 
  type = 'info', 
  onClose,
  isVisible 
}) => {
  const typeStyles = {
    info: 'bg-gradient-primary',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-orange-500 to-red-500'
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed top-20 right-4 z-50 animate-slide-up",
      "max-w-sm rounded-xl shadow-lg overflow-hidden"
    )}>
      <div className={cn("p-4", typeStyles[type])}>
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white/20 backdrop-blur rounded-full p-2">
            {type === 'info' ? <Bell size={20} /> : <Music size={20} />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};