export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  isPlaying?: boolean;
  isLiked?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  tracks?: Track[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: string;
  verified?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: number;
  duration: string;
  creator: string;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  coverUrl: string;
  episodes: number;
  category: string;
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  frequency?: string;
  isLive?: boolean;
  streamUrl?: string;
}