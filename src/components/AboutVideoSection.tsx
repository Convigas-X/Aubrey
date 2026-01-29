import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AboutVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'ii3G31Azaco';

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-cream relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-10 right-10 text-[15rem] md:text-[20rem] font-serif text-primary leading-none select-none"
        >
          360
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-accent font-sans mb-4">
            Experience Excellence
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary max-w-3xl mx-auto leading-tight">
            Meet Aubrey Hamid
          </h2>
          <div className="w-24 h-[2px] bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Two Column Layout - Video Left, Content Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch max-w-6xl mx-auto">
          
          {/* Left Side - Premium Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 flex items-center"
          >
            <div className="relative group w-full">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-gold-light/30 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Video Frame - Compact 4:3 Aspect */}
              <div className="relative bg-primary p-2 md:p-3 rounded-lg shadow-2xl max-w-md mx-auto lg:max-w-none">
                <div className="relative bg-black rounded overflow-hidden">
                  <div className="relative pb-[65%]">
                    {!isPlaying ? (
                      <>
                        {/* Premium Thumbnail Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-charcoal-light">
                          {/* Subtle Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.3) 1px, transparent 0)`,
                              backgroundSize: '40px 40px'
                            }} />
                          </div>
                          
                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* Pulsing Ring */}
                            <motion.div
                              animate={{ 
                                scale: [1, 1.15, 1],
                                opacity: [0.4, 0.7, 0.4]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-accent/40"
                            />
                            
                            {/* Play Button */}
                            <motion.button
                              onClick={() => setIsPlaying(true)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent hover:bg-gold-light transition-all duration-300 flex items-center justify-center shadow-gold group/btn"
                            >
                              <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
                              <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover/btn:opacity-30 blur-md transition-opacity duration-300" />
                            </motion.button>

                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 }}
                              className="mt-4 text-white/70 font-sans text-xs tracking-[0.2em] uppercase"
                            >
                              Watch Our Story
                            </motion.p>
                          </div>

                          {/* Corner Accents */}
                          <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-accent/50" />
                          <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-accent/50" />
                          <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-accent/50" />
                          <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-accent/50" />
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
                    <div className="w-6 h-0.5 bg-accent/60 rounded-full" />
                    <div className="w-1.5 h-0.5 bg-white/20 rounded-full" />
                    <div className="w-1.5 h-0.5 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              {/* Main Description */}
              <div className="space-y-4">
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

              {/* CTA Button */}
              <div className="pt-4">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-black text-white px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
                  >
                    Learn More About Us
                  </motion.button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="font-serif text-2xl md:text-3xl text-primary">35+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="font-serif text-2xl md:text-3xl text-primary">1,000+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Families Helped</p>
                </div>
                <div>
                  <p className="font-serif text-2xl md:text-3xl text-primary">360°</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Full Service</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
