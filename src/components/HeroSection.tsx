import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-mansion.jpg';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src={heroImage}
            alt="Luxury Beverly Hills Estate"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Overlay Gradient - Darker for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight max-w-4xl leading-tight"
          style={{ textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)' }}
        >
          Orlando & Central Florida's Trusted Real Estate Experts
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 font-sans text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
          style={{ textShadow: '0 1px 20px rgba(0, 0, 0, 0.4)' }}
        >
          With 35+ years of experience, Real Estate 360 delivers exceptional 
                results for buyers, sellers, and investors in Central Florida.
        </motion.p>

        <Link to="/listings">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 bg-white/20 backdrop-blur-xl text-white px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/30 hover:shadow-lg"
          >
            View Properties
          </motion.button>
        </Link>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};