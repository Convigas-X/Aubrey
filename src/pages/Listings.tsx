import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { sparkApi } from '@/services/sparkApi';
import { Property } from '@/data/properties';
import heroImage from '@/assets/hero-mansion.jpg';
import { Loader2, Search, MapPin, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

type FilterType = 'all' | 'sale' | 'sold';

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get search filters from URL
  const locationFilter = searchParams.get('location') || '';
  const minPriceFilter = searchParams.get('minPrice') || '';
  const maxPriceFilter = searchParams.get('maxPrice') || '';
  const bedsFilter = searchParams.get('beds') || '';
  const bathsFilter = searchParams.get('baths') || '';

  useEffect(() => {
    fetchProperties();
  }, [locationFilter, minPriceFilter, maxPriceFilter, bedsFilter, bathsFilter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we have search filters
      const hasFilters = locationFilter || minPriceFilter || maxPriceFilter || bedsFilter || bathsFilter;
      
      let data: Property[];
      if (hasFilters) {
        console.log('🔍 Searching with filters:', { location: locationFilter, minPrice: minPriceFilter, maxPrice: maxPriceFilter, beds: bedsFilter, baths: bathsFilter });
        data = await sparkApi.getListings({
          location: locationFilter,
          minPrice: minPriceFilter,
          maxPrice: maxPriceFilter,
          beds: bedsFilter,
          baths: bathsFilter,
        });
      } else {
        data = await sparkApi.getListings();
      }
      
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sale') return property.status === 'For Sale';
    if (activeFilter === 'sold') return property.status === 'Sold';
    return true;
  });

  // Build active filters display
  const activeFiltersList = [];
  if (locationFilter) activeFiltersList.push(`Location: ${locationFilter}`);
  if (minPriceFilter) activeFiltersList.push(`Min: $${parseInt(minPriceFilter).toLocaleString()}`);
  if (maxPriceFilter) activeFiltersList.push(`Max: $${parseInt(maxPriceFilter).toLocaleString()}`);
  if (bedsFilter) activeFiltersList.push(`${bedsFilter}+ Beds`);
  if (bathsFilter) activeFiltersList.push(`${bathsFilter}+ Baths`);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Real Estate 360 Properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Property Listings
            </h1>
            <p className="mt-3 sm:mt-4 font-sans text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-2 sm:px-0">
              Explore our curated collection of available properties in Orlando & Central Florida
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs and Properties Grid */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Active Search Filters */}
          {activeFiltersList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8 p-3 sm:p-4 bg-accent/5 border border-accent/20 rounded-lg"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 text-accent">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-sans text-xs sm:text-sm font-medium">Search Results:</span>
                </div>
                {activeFiltersList.map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-accent/30 rounded-full text-xs sm:text-sm font-sans text-primary"
                  >
                    {filter}
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="ml-auto flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8 sm:mb-12 gap-4 sm:gap-8"
          >
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'sale', label: 'For Sale' },
              { id: 'sold', label: 'Sold' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterType)}
                className={`font-sans text-xs sm:text-sm tracking-[0.05em] sm:tracking-[0.1em] uppercase pb-2 border-b-2 transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'border-accent text-primary'
                    : 'border-transparent text-muted-foreground hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <div className="text-center">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-accent mx-auto mb-3 sm:mb-4" />
                <p className="font-sans text-sm sm:text-base text-muted-foreground">Loading properties...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-sans text-lg text-destructive mb-4">{error}</p>
              <button
                onClick={fetchProperties}
                className="btn-gold"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Properties Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {filteredProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    index={index}
                  />
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 sm:py-20"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <p className="font-sans text-base sm:text-lg text-muted-foreground mb-2">
                    No properties found
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                    Try adjusting your search filters
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Listings;
