import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Bed, Bath, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MlsSearchBox = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query string and navigate to listings page
    const params = new URLSearchParams();
    if (searchParams.location) params.set('location', searchParams.location);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.beds) params.set('beds', searchParams.beds);
    if (searchParams.baths) params.set('baths', searchParams.baths);
    
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-xl rounded-lg p-3 sm:p-4 md:p-6 border border-white/20">
        {/* Main Search Row - Stacked on mobile, horizontal on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3">
          
          {/* Location */}
          <div className="sm:col-span-2 lg:col-span-4 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="City, ZIP, or Address"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded px-10 py-3 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent/50 transition-colors h-[46px]"
            />
          </div>

          {/* Price Range */}
          <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-2 gap-2">
            <div className="relative">
              <select
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-white/15 transition-all appearance-none cursor-pointer h-[46px] flex items-center justify-center"
              >
                <option value="" className="bg-gray-800 flex items-center justify-center">
                  <span className="flex items-center justify-center gap-2">
                    <DollarSign className="w-5 h-5" />
                  </span>
                </option>
                <option value="100000" className="bg-gray-800">$100k</option>
                <option value="250000" className="bg-gray-800">$250k</option>
                <option value="500000" className="bg-gray-800">$500k</option>
                <option value="750000" className="bg-gray-800">$750k</option>
                <option value="1000000" className="bg-gray-800">$1M</option>
                <option value="2000000" className="bg-gray-800">$2M+</option>
              </select>
              {!searchParams.minPrice && (
                <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
                  <DollarSign className="w-5 h-5 text-white/80" />
                  <Plus className="w-4 h-4 text-white/80" />
                </div>
              )}
            </div>
            <div className="relative">
              <select
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-white/15 transition-all appearance-none cursor-pointer h-[46px] flex items-center justify-center"
              >
                <option value="" className="bg-gray-800 flex items-center justify-center">
                  <span className="flex items-center justify-center gap-2">
                    <DollarSign className="w-5 h-5" />
                  </span>
                </option>
                <option value="250000" className="bg-gray-800">$250k</option>
                <option value="500000" className="bg-gray-800">$500k</option>
                <option value="750000" className="bg-gray-800">$750k</option>
                <option value="1000000" className="bg-gray-800">$1M</option>
                <option value="2000000" className="bg-gray-800">$2M</option>
                <option value="5000000" className="bg-gray-800">$5M+</option>
              </select>
              {!searchParams.maxPrice && (
                <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
                  <DollarSign className="w-5 h-5 text-white/80" />
                  <Minus className="w-4 h-4 text-white/80" />
                </div>
              )}
            </div>
          </div>

          {/* Beds & Baths */}
          <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-2 gap-2">
            {/* Beds */}
            <div className="relative">
              <select
                value={searchParams.beds}
                onChange={(e) => setSearchParams({ ...searchParams, beds: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-white/15 transition-all appearance-none cursor-pointer h-[46px] flex items-center justify-center"
              >
                <option value="" className="bg-gray-800 flex items-center justify-center">
                  <span className="flex items-center justify-center gap-2">
                    <Bed className="w-5 h-5" />
                  </span>
                </option>
                <option value="1" className="bg-gray-800">1+</option>
                <option value="2" className="bg-gray-800">2+</option>
                <option value="3" className="bg-gray-800">3+</option>
                <option value="4" className="bg-gray-800">4+</option>
                <option value="5" className="bg-gray-800">5+</option>
              </select>
              {!searchParams.beds && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Bed className="w-5 h-5 text-white/80" />
                </div>
              )}
            </div>

            {/* Baths */}
            <div className="relative">
              <select
                value={searchParams.baths}
                onChange={(e) => setSearchParams({ ...searchParams, baths: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-white/15 transition-all appearance-none cursor-pointer h-[46px] flex items-center justify-center"
              >
                <option value="" className="bg-gray-800 flex items-center justify-center">
                  <span className="flex items-center justify-center gap-2">
                    <Bath className="w-5 h-5" />
                  </span>
                </option>
                <option value="1" className="bg-gray-800">1+</option>
                <option value="2" className="bg-gray-800">2+</option>
                <option value="3" className="bg-gray-800">3+</option>
                <option value="4" className="bg-gray-800">4+</option>
              </select>
              {!searchParams.baths && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Bath className="w-5 h-5 text-white/80" />
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <div className="sm:col-span-1 lg:col-span-2">
            <button
              type="submit"
              className="w-full h-[46px] bg-accent hover:bg-gold-light text-white rounded flex items-center justify-center transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MLS Badge */}
        <div className="mt-3 flex items-center gap-2 text-white/50 text-[10px] sm:text-xs">
          <Home className="w-3 h-3" />
          <span>Search Central Florida MLS Listings</span>
        </div>
      </form>
    </div>
  );
};
