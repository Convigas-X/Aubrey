import { motion } from 'framer-motion';
import { PremiumPropertyGrid } from './PremiumPropertyGrid';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';

// Featured properties - with updated statuses
export const properties = [
  {
    id: 'bel-air-modern',
    image: property1,
    name: 'Bel Air Modern Estate',
    address: 'Bel Air, California',
    beds: 12,
    baths: 24,
    sqft: 45000,
    price: '$177,000,000',
    status: 'Sold' as const, // Updated: Was For Sale
  },
  {
    id: 'siena-residence',
    image: property2,
    name: 'Siena Luxury Residence',
    address: 'Bel Air, California',
    beds: 9,
    baths: 18,
    sqft: 32000,
    price: '$135,000,000',
    status: 'For Sale' as const,
  },
  {
    id: 'beverly-park-estate',
    image: property3,
    name: 'Beverly Park Mansion',
    address: 'Beverly Hills, California',
    beds: 8,
    baths: 14,
    sqft: 28500,
    price: '$79,990,000',
    status: 'Sold' as const, // Updated: Was For Sale
  },
  {
    id: 'hollywood-hills-villa',
    image: property4,
    name: 'Hollywood Hills Villa',
    address: 'Hollywood Hills, California',
    beds: 7,
    baths: 10,
    sqft: 18500,
    price: '$62,500,000',
    status: 'For Sale' as const,
  },
  {
    id: 'chateau-lumiere',
    image: property5,
    name: 'Château Lumière',
    address: 'Holmby Hills, California',
    beds: 10,
    baths: 16,
    sqft: 35000,
    price: '$89,000,000',
    status: 'Sold' as const, // Updated: Was For Sale
  },
];

export const FeaturedListings = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight">
            Featured Properties
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover exceptional homes in Orlando's most desirable neighborhoods
          </p>
        </motion.div>

        {/* Premium Grid - All Properties at Once with Different Sizes
            Status updates: Bel Air, Beverly Park, Chateau Lumière are now SOLD */}
        <PremiumPropertyGrid properties={properties} />
      </div>
    </section>
  );
};
