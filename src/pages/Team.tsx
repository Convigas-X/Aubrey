import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, Award, Target, Users, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-mansion.jpg';

const teamMembers = [
  {
    name: 'Aubrey Hamid',
    title: 'Broker/Owner, REALTOR®',
    image: '/aubary.png',
    email: 'aubrey@realestate360.realtor',
    phone: '+1-321-2286880',
  },
  {
    name: 'Shayan Ali',
    title: 'Research & Development Engineer',
    image: '/shayan-professional.png',
    portfolio: 'https://shayan-eight.vercel.app/',
    phone: '+92-315-4909017',
  },
  {
    name: 'Anne',
    title: 'Executive Assistant',
    image: '/assistant.jpeg',
    email: 'Vanikam2025@gmail.com',
    phone: '+63-956-5226341',
  },
];

const companyStats = [
  { number: '35+', label: 'Years of Excellence' },
  { number: '$850M+', label: 'In Sales Volume' },
  { number: '1,200+', label: 'Successful Transactions' },
  { number: '98%', label: 'Client Satisfaction' },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Real Estate 360 Team"
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
              Our Team
            </h1>
            <p className="mt-4 font-sans text-lg text-white/80 max-w-2xl mx-auto">
              Meet the dedicated professionals behind our success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Statement Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
              A Legacy of Excellence
            </h2>
            <p className="font-sans text-lg text-charcoal-light leading-relaxed">
              For over three decades, Real Estate 360 has been privileged to serve Central Florida's luxury real estate market. 
              Our small but mighty team combines deep local expertise with innovative digital solutions, ensuring every client 
              receives the personalized attention they deserve. We believe that successful real estate transactions are built 
              on trust, transparency, and unwavering commitment to our clients' success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-serif text-3xl md:text-4xl text-gold mb-2">{stat.number}</h3>
                <p className="font-sans text-sm text-white/80 tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
              Our Core Values
            </h2>
            <p className="font-sans text-lg text-charcoal-light max-w-3xl mx-auto">
              Every member of our team embodies these principles in every interaction, 
              ensuring you receive exceptional service at every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Integrity First', desc: 'Honesty and transparency guide every decision we make.' },
              { icon: Target, title: 'Excellence Always', desc: 'We strive for perfection in every transaction.' },
              { icon: Users, title: 'Client-Centered', desc: 'Your goals are our top priority.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gold/10 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-primary mb-3">{value.title}</h3>
                <p className="font-sans text-charcoal-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
              Meet Our Team
            </h2>
            <p className="font-sans text-lg text-charcoal-light max-w-3xl mx-auto">
              Each member brings unique expertise and passion to deliver exceptional results 
              for our clients across Orlando and beyond.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-96 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2">{member.name}</h3>
                  <p className="text-charcoal-light text-base font-semibold mb-6">{member.title}</p>
                  
                  {/* Contact Info */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors group/contact"
                      >
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover/contact:bg-gold/20 transition-colors">
                          <Mail size={14} className="text-gold" />
                        </div>
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}
                    {member.portfolio && ( // Conditionally render portfolio link
                      <a
                        href={member.portfolio}
                        target="_blank" // Open in new tab
                        rel="noopener noreferrer" // Security best practice
                        className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors group/contact"
                      >
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover/contact:bg-gold/20 transition-colors">
                          <Globe size={14} className="text-gold" />
                        </div>
                        <span className="truncate">Portfolio</span>
                      </a>
                    )}
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors group/contact"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover/contact:bg-gold/20 transition-colors">
                        <Phone size={14} className="text-gold" />
                      </div>
                      {member.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="font-sans text-lg text-white/80 mb-10 leading-relaxed">
              Our dedicated team is ready to guide you through your next real estate transaction 
              with the expertise and personal attention you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gold text-primary px-8 py-4 rounded-lg font-sans font-semibold text-sm uppercase tracking-wide hover:bg-gold-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule a Consultation
              </Link>
              <Link
                to="/listings"
                className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-sans font-semibold text-sm uppercase tracking-wide hover:bg-gold hover:text-primary transition-colors duration-300"
              >
                View Properties
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
