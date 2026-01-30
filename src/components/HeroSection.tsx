import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-mansion.jpg';
import { Link } from 'react-router-dom';
import { MlsSearchBox } from './MlsSearchBox';

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8">
        
        {/* Top Spacer for Navigation */}
        <div className="h-14 sm:h-16" />

        {/* Center - MLS Search Box */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-2 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-4 sm:mb-8"
          >
            <span className="inline-block text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/70 font-sans mb-2 sm:mb-3">
              Central Florida MLS Search
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-4xl text-white font-normal tracking-tight">
              Find Your Dream Home
            </h2>
          </motion.div>
          
          <MlsSearchBox />
        </div>

        {/* Bottom Left - Brand Text & CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 md:pb-16">
          {/* Left Side - Brand Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl"
          >
            <h1
              className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal tracking-tight leading-tight"
              style={{ textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)' }}
            >
              Orlando & Central Florida's Trusted Real Estate Experts
            </h1>
            <p
              className="mt-2 sm:mt-3 font-sans text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-md"
              style={{ textShadow: '0 1px 20px rgba(0, 0, 0, 0.4)' }}
            >
              With 35+ years of experience, Real Estate 360 delivers exceptional results for buyers, sellers, and investors.
            </p>
            <Link to="/listings">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 sm:mt-4 bg-white/20 backdrop-blur-xl text-white px-4 sm:px-6 py-2.5 sm:py-3 font-sans text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/30 hover:shadow-lg border border-white/30"
              >
                View Properties
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Center - Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 sm:w-6 sm:h-10 border border-white/40 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <motion.div className="w-0.5 h-1.5 sm:h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
