import React from 'react';
import { RadioCard } from '@/components/RadioCard';
import { RadioStation } from '@/types/music';
import { Radio as RadioIcon, Globe, Music, Headphones, Search, Play, Pause, MapPin } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

interface RadioBrowserStation {
  changeuuid: string;
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  language: string;
  votes: number;
  lastchangetime: string;
  codec: string;
  bitrate: number;
  geo_lat: string;
  geo_long: string;
  state?: string;
}

interface GujaratStation extends RadioStation {
  city?: string;
}

export const RadioPage: React.FC = () => {
  const [stations, setStations] = React.useState<GujaratStation[]>([]);
  const [filteredStations, setFilteredStations] = React.useState<GujaratStation[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedCity, setSelectedCity] = React.useState<string>('all');

  const { 
    currentRadioStation, 
    isRadioPlaying, 
    setCurrentRadioStation, 
    setRadioPlaying 
  } = usePlayer();

  // Gujarat cities with their common radio station names
  const gujaratCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 
    'Gandhinagar', 'Anand', 'Bharuch', 'Valsad', 'Navsari', 'Mehsana',
    'Patan', 'Bhuj', 'Junagadh', 'Porbandar', 'Dahod', 'Godhra', 'Palanpur'
  ];

  React.useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    async function fetchStations() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const res = await fetch('https://de1.api.radio-browser.info/json/stations/bycountry/India', { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        
        if (!res.ok) throw new Error(`Failed to fetch stations: ${res.status}`);
        const data: RadioBrowserStation[] = await res.json();

        if (isCancelled) return;

        // Filter and map Gujarat stations
        const gujaratStations: GujaratStation[] = data
          .filter(station => {
            const name = station.name.toLowerCase();
            const tags = station.tags.toLowerCase();
            const language = station.language.toLowerCase();
            
            // Check if station is from Gujarat
            return name.includes('gujarat') || 
                   name.includes('ahmedabad') || 
                   name.includes('surat') || 
                   name.includes('vadodara') || 
                   name.includes('rajkot') || 
                   name.includes('bhavnagar') || 
                   name.includes('jamnagar') || 
                   name.includes('gandhinagar') ||
                   name.includes('anand') ||
                   name.includes('bharuch') ||
                   name.includes('valsad') ||
                   name.includes('navsari') ||
                   name.includes('mehsana') ||
                   name.includes('patan') ||
                   name.includes('bhuj') ||
                   name.includes('junagadh') ||
                   name.includes('porbandar') ||
                   name.includes('dahod') ||
                   name.includes('godhra') ||
                   name.includes('palanpur') ||
                   tags.includes('gujarat') ||
                   language.includes('gujarati') ||
                   name.includes('guj') ||
                   name.includes('gujarati');
          })
          .map((station) => {
            // Determine city from station name
            let city = 'Other';
            const name = station.name.toLowerCase();
            
            for (const gujaratCity of gujaratCities) {
              if (name.includes(gujaratCity.toLowerCase())) {
                city = gujaratCity;
                break;
              }
            }

            return {
              id: station.stationuuid,
              name: station.name,
              genre: station.tags?.split(',').slice(0, 2).join(', ') || 'Radio',
              imageUrl: station.favicon || '/api/placeholder/200/200',
              frequency: station.bitrate ? `${station.bitrate}kbps` : undefined,
              isLive: true,
              streamUrl: station.url_resolved || station.url,
              city: city
            };
          });

        setStations(gujaratStations);
        setFilteredStations(gujaratStations);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch radio stations');
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchStations();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, []);

  React.useEffect(() => {
    let filtered = stations.filter(station =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCity !== 'all') {
      filtered = filtered.filter(station => station.city === selectedCity);
    }

    setFilteredStations(filtered);
  }, [searchTerm, selectedCity, stations]);

  const handlePlayStation = (station: GujaratStation) => {
    if (currentRadioStation?.id === station.id) {
      // Toggle current station
      setRadioPlaying(!isRadioPlaying);
    } else {
      // Play new station
      setCurrentRadioStation(station);
      setRadioPlaying(true);
    }
  };

  const getCityStats = () => {
    const cityCounts: { [key: string]: number } = {};
    stations.forEach(station => {
      const city = station.city || 'Other';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    return cityCounts;
  };

  const cityStats = getCityStats();
  const availableCities = Object.keys(cityStats).sort();

  return (
    <div className="animate-in">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gujarat Radio Stations</h1>
        <p className="text-muted-foreground">Tune into live radio from across Gujarat</p>
      </section>

      {/* Search Bar */}
      <section className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search radio stations or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </section>

      {/* City Filter */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin size={20} />
          Filter by City
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => setSelectedCity('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCity === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-accent'
            }`}
          >
            All Cities ({stations.length})
          </button>
          {availableCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCity === city 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-accent'
              }`}
            >
              {city} ({cityStats[city]})
            </button>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-neumorphic p-6 text-center">
            <Globe size={32} className="text-primary mx-auto mb-3" />
            <p className="text-2xl font-bold mb-1">{stations.length}</p>
            <p className="text-sm text-muted-foreground">Gujarat Stations</p>
          </div>
          <div className="card-neumorphic p-6 text-center">
            <MapPin size={32} className="text-secondary mx-auto mb-3" />
            <p className="text-2xl font-bold mb-1">{availableCities.length}</p>
            <p className="text-sm text-muted-foreground">Cities</p>
          </div>
          <div className="card-neumorphic p-6 text-center">
            <Headphones size={32} className="text-accent mx-auto mb-3" />
            <p className="text-2xl font-bold mb-1">Live</p>
            <p className="text-sm text-muted-foreground">Broadcasting</p>
          </div>
        </div>
      </section>

      {/* Radio Stations Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {selectedCity === 'all' ? 'All Gujarat Stations' : `${selectedCity} Stations`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm text-muted-foreground">
              {filteredStations.length} stations found
            </span>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading Gujarat radio stations...</p>
          </div>
        )}

        {errorMessage && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !errorMessage && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredStations.map((station) => (
              <div key={station.id} className="group relative card-neumorphic p-4 cursor-pointer overflow-hidden">
                {/* City Badge */}
                {station.city && station.city !== 'Other' && (
                  <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium z-10">
                    {station.city}
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
                      onClick={() => handlePlayStation(station)}
                      aria-label={`Play ${station.name}`}
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
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && filteredStations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Gujarat stations found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
};