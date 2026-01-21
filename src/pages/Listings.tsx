import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { idxApi } from '@/services/idxApi';
import { Property } from '@/data/properties';
import heroImage from '@/assets/hero-mansion.jpg';
import { Loader2 } from 'lucide-react';

type FilterType = 'all' | 'sale' | 'sold';

const Listings = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await idxApi.getActiveListings();
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sale') return property.status === 'For Sale';
    if (activeFilter === 'sold') return property.status === 'Sold';
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Real Estate 360 Properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
              Property Listings
            </h1>
            <p className="mt-4 font-sans text-lg text-white/80 max-w-2xl mx-auto">
              Explore our curated collection of available properties in Orlando
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs and Properties Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filter Tabs - Moved below hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12 gap-8"
          >
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'sale', label: 'For Sale' },
              { id: 'sold', label: 'Sold' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterType)}
                className={`font-sans text-sm tracking-[0.1em] uppercase pb-2 border-b-2 transition-all duration-300 ${
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
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
                <p className="font-sans text-muted-foreground">Loading properties...</p>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
                  className="text-center py-20"
                >
                  <p className="font-sans text-lg text-muted-foreground">
                    No properties found in this category.
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
