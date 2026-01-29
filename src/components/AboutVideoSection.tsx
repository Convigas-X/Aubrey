import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoThumbnail } from './VideoThumbnail';
import { Play } from 'lucide-react';

export const AboutVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'ii3G31Azaco';

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.015 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[35rem] font-serif text-primary leading-none select-none whitespace-nowrap"
        >
          360
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-accent font-sans mb-4">
            Experience Excellence
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary">
            Meet Aubrey Hamid
          </h2>
          <div className="w-20 h-[2px] bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Video Container - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <div className="relative group max-w-5xl mx-auto">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-gold-light/30 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Video Frame */}
            <div className="relative bg-primary p-1.5 md:p-2 rounded-xl shadow-2xl">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="relative pb-[45%]">
                  {!isPlaying ? (
                    <>
                      {/* Video Thumbnail */}
                      <VideoThumbnail onClick={() => setIsPlaying(true)} />
                      
                      {/* Custom Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="pointer-events-auto"
                        >
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-gold group/btn"
                          >
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
                          </button>
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title="RealEstate 360 Video"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-2 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-white/50 text-[10px] tracking-wider uppercase font-sans">RealEstate 360</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-8 h-0.5 bg-accent/60 rounded-full" />
                  <div className="w-2 h-0.5 bg-white/20 rounded-full" />
                  <div className="w-2 h-0.5 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Below Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Main Description */}
          <div className="space-y-4 mb-8">
            <p className="font-sans text-base md:text-lg text-charcoal-light leading-relaxed">
              With <span className="text-primary font-medium">35+ years</span> of experience, Aubrey Hamid 
              has helped <span className="text-primary font-medium">1,000+ families</span> find their 
              perfect home in Central Florida. As a licensed REALTOR® and broker, she leads Real Estate 360 
              — an Orlando-based firm delivering creative deal-making and strategic solutions for buyers, 
              sellers, and investors worldwide.
            </p>
            
            <p className="font-sans text-base md:text-lg text-charcoal-light leading-relaxed">
              Built on <span className="text-accent font-medium">trust, integrity, and lasting partnerships</span>, 
              we guide you through every step — from first home to investment portfolio.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-10 py-8 border-y border-gray-200 mb-8">
            {[
              { value: '35+', label: 'Years Experience' },
              { value: '1,000+', label: 'Families Helped' },
              { value: '360°', label: 'Full Service' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-2xl md:text-4xl text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white px-10 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
            >
              Learn More About Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
