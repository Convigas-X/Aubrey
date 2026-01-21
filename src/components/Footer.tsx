import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  properties: [
    { name: 'All Listings', href: '/listings' },
    { name: 'For Sale', href: '/listings?status=sale' },
    { name: 'Sold', href: '/listings?status=sold' },
    { name: 'Off-Market', href: '/off-market' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Market Reports', href: '/reports' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 lg:px-12 pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block">
              <span className="font-serif text-xl tracking-[0.15em]">
                RealEstate 360
              </span>
            </Link>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="font-sans text-sm text-white/80 leading-relaxed">
                  Based in Orlando / Central Florida<br />
                  Serving Clients Locally, Nationally & Internationally
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a 
                  href="tel:+13212286880" 
                  className="font-sans text-sm text-white/80 hover:text-white transition-colors"
                >
                  321-228-6880
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a 
                  href="mailto:Aubrey@realestate360.realtor" 
                  className="font-sans text-sm text-white/80 hover:text-white transition-colors"
                >
                  Aubrey@realestate360.realtor
                </a>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-sans text-sm tracking-[0.15em] uppercase text-white/60 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Properties Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-sans text-sm tracking-[0.15em] uppercase text-white/60 mb-6">
              Properties
            </h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-sans text-sm tracking-[0.15em] uppercase text-white/60 mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="font-sans text-sm text-white/50">
                © 2026 RealEstate 360. All rights reserved.
              </p>
              <p className="font-sans text-xs text-white/40">
                Made by Tritanium Global
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 text-white/60 hover:text-gold transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
