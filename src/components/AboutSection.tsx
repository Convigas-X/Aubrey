import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary">
              Meet Aubrey Hamid
            </h2>
          </div>

          {/* Content with Image and Text */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-full shadow-2xl w-full max-w-md mx-auto aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-primary/10" />
                <img 
                  src="/aubary.png" 
                  alt="Aubrey Hamid" 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 border border-gold/30 rounded-full pointer-events-none" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="font-sans text-lg md:text-xl text-charcoal-light leading-relaxed">
                  With over 35 years of experience in Central Florida real estate, 
                  Aubrey Hamid has helped over 1,000 families find their perfect home.
                </p>
                
                <p className="font-sans text-lg md:text-xl text-charcoal-light leading-relaxed">
                  As a licensed REALTOR® and broker, Aubrey brings unparalleled market 
                  knowledge, negotiation expertise, and a genuine commitment to client 
                  success. Her approach combines innovative technology with personalized 
                  service, ensuring every client receives the attention they deserve.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-4"
              >
                <button className="bg-black text-white px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:shadow-lg">
                  Learn More About Us
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
