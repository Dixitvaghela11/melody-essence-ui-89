import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RadioStation } from '@/types/music';

interface PlayerContextType {
  // Radio state
  currentRadioStation: RadioStation | null;
  isRadioPlaying: boolean;
  isRadio: boolean;
  
  // Music state
  currentTrack: {
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
  } | null;
  isMusicPlaying: boolean;
  
  // Volume
  volume: number;
  
  // Actions
  setCurrentRadioStation: (station: RadioStation | null) => void;
  setRadioPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: {
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
  } | null) => void;
  setMusicPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  toggleRadioPlayPause: () => void;
  toggleMusicPlayPause: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentRadioStation, setCurrentRadioStation] = useState<RadioStation | null>(null);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
  } | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(70);

  const setRadioPlaying = (playing: boolean) => {
    setIsRadioPlaying(playing);
    if (playing) {
      setIsMusicPlaying(false); // Stop music when radio starts
    }
  };

  const setMusicPlaying = (playing: boolean) => {
    setIsMusicPlaying(playing);
    if (playing) {
      setIsRadioPlaying(false); // Stop radio when music starts
    }
  };

  const toggleRadioPlayPause = () => {
    setRadioPlaying(!isRadioPlaying);
  };

  const toggleMusicPlayPause = () => {
    setMusicPlaying(!isMusicPlaying);
  };

  const value: PlayerContextType = {
    currentRadioStation,
    isRadioPlaying,
    isRadio: currentRadioStation !== null,
    currentTrack,
    isMusicPlaying,
    volume,
    setCurrentRadioStation,
    setRadioPlaying,
    setCurrentTrack,
    setMusicPlaying,
    setVolume,
    toggleRadioPlayPause,
    toggleMusicPlayPause,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
