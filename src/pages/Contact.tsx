import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-mansion.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Real Estate 360 Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
              Contact Us
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mt-6 rounded-full"></div>
            <p className="mt-6 font-sans text-lg text-white/90 leading-relaxed">
              Get in touch with our luxury real estate specialists. We're here to help you find your dream property in Orlando, Central Florida and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-gold/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.h2 
                    className="font-serif text-2xl md:text-3xl text-primary mb-8 pb-4 border-b border-gold/20"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    Get In Touch
                    <div className="w-16 h-0.5 bg-gold mt-3"></div>
                  </motion.h2>

                  <motion.div 
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      {
                        icon: MapPin,
                        title: "Visit Our Office",
                        content: (
                          <>
                            6441 S Chickasaw Trl
                            <br />Orlando, FL 32829
                          </>
                        ),
                      },
                      {
                        icon: Phone,
                        title: "Call Us",
                        content: (
                          <a 
                            href="tel:+13212286880" 
                            className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                          >
                            <span className="border-b border-transparent group-hover:border-accent transition-colors">(321) 228-6880</span>
                          </a>
                        ),
                      },
                      {
                        icon: Mail,
                        title: "Email Us",
                        content: (
                          <a 
                            href="mailto:aubrey@realestate360.realtor" 
                            className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                          >
                            <span className="border-b border-transparent group-hover:border-accent transition-colors">aubrey@realestate360.realtor</span>
                          </a>
                        ),
                      },
                      {
                        icon: Clock,
                        title: "Office Hours",
                        content: (
                          <>
                            <span className="font-medium text-primary">Mon-Fri:</span> 9am-7pm
                            <br /><span className="font-medium text-primary">Sat:</span> 10am-6pm
                            <br /><span className="font-medium text-primary">Sun:</span> By Appointment
                          </>
                        ),
                      },
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start gap-4 group"
                        variants={itemVariants}
                      >
                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                          <item.icon className="w-5 h-5 text-gold" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-sans font-semibold text-primary">{item.title}</h3>
                          <p className="mt-1 font-sans text-muted-foreground leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-gold/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.h2 
                    className="font-serif text-2xl md:text-3xl text-primary mb-8 pb-4 border-b border-gold/20"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    Send Us a Message
                    <div className="w-16 h-0.5 bg-gold mt-3"></div>
                  </motion.h2>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-sans text-green-700">Thank you! Your message has been sent successfully.</span>
                    </motion.div>
                  )}

                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block font-sans text-sm font-medium text-charcoal-light mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 h-12"
                        required
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block font-sans text-sm font-medium text-charcoal-light mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 h-12"
                          required
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label htmlFor="phone" className="block font-sans text-sm font-medium text-charcoal-light mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 h-12"
                          placeholder="(123) 456-7890"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="interest" className="block font-sans text-sm font-medium text-charcoal-light mb-2">
                        I'm Interested In
                      </label>
                      <Select
                        value={formData.interest}
                        onValueChange={(value) => handleChange('interest', value)}
                      >
                        <SelectTrigger className="w-full h-12 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200">
                          <SelectValue placeholder="Select your interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">Buying a Luxury Home</SelectItem>
                          <SelectItem value="selling">Selling My Property</SelectItem>
                          <SelectItem value="investing">Investment Properties</SelectItem>
                          <SelectItem value="consultation">Market Consultation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="message" className="block font-sans text-sm font-medium text-charcoal-light mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 border border-border bg-background font-sans text-primary focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all duration-200 resize-none"
                        required
                        placeholder="Tell us about your real estate needs..."
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-2">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-gold to-gold-dark text-primary-foreground px-8 py-4 font-sans text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:from-gold-dark hover:to-gold hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Map Section - Above Footer */}
      <section className="relative py-16 md:py-24 bg-primary">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"></div>
        <div className="absolute -left-1/4 -bottom-1/4 w-full h-full rounded-full bg-gold/5 blur-3xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white">
              Visit Our Orlando Office
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full"></div>
            <p className="mt-6 font-sans text-lg text-white/80 max-w-2xl mx-auto">
              Conveniently located in Orlando, FL. Schedule an appointment or drop by during business hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              {/* Premium frame effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold opacity-30 blur-sm"></div>
              
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.202850147928!2d-81.29847668488758!3d28.538383482339053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e768e0c077c5e5%3A0x605931a201592677!2sOrlando%2C%20FL%2032829%2C%20USA!5e0!3m2!1sen!2sus!4v1705791234567!5m2!1sen!2sus"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Real Estate 360 Orlando Office Location"
                  className="w-full h-full"
                />
              </div>

              {/* Map Location Pin - Premium Design */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ marginTop: '-40px' }}
              >
                {/* Pin container */}
                <div className="relative">
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-gold/30 animate-ping"></div>
                  
                  {/* Main pin */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-2xl flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Pin stem */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-gold to-gold-dark"></div>
                  
                  {/* Location info card that appears on hover or focus */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-primary/95 backdrop-blur-sm border border-gold/30 rounded-xl p-5 shadow-2xl min-w-max"
                  >
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary/95 border-r border-b border-gold/30 rotate-45"></div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-white">Real Estate 360</h3>
                        <p className="font-sans text-white/80 text-sm leading-relaxed mt-1">
                          6441 S Chickasaw Trl
                          <br />Orlando, FL 32829
                          <br />United States
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-6 right-6 bg-gradient-to-r from-gold to-gold-dark text-primary px-4 py-2 rounded-lg font-sans font-semibold text-xs shadow-lg"
              >
                Prestige Location
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="font-sans text-white/70 text-sm">
              <span className="font-semibold text-gold">Directions:</span> 
              Located in the heart of Orlando, easily accessible from major highways. 
              Free parking available on-site.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;