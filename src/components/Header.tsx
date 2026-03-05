import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on search open and vice versa
  useEffect(() => {
    if (isSearchOpen) setIsMenuOpen(false);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMenuOpen) setIsSearchOpen(false);
  }, [isMenuOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Afrique', path: '/category/afrique' },
    { name: 'International', path: '/category/international' },
    { name: 'Économie', path: '/category/economie' },
    { name: 'Culture', path: '/category/culture' },
    { name: 'Sport', path: '/category/sport' },
    { name: 'Santé', path: '/category/sante' },
  ];

  const socialLinks = [
    { icon: <MessageCircle size={18} />, url: 'https://www.tiktok.com/@kassirii?_r=1&_t=ZN-94OzSqjwRuQ' },
    { icon: <Facebook size={18} />, url: 'https://www.facebook.com/share/1Gu96j95rD/?mibextid=wwXIfr' },
    { icon: <Instagram size={18} />, url: 'https://www.instagram.com/cheverny.co?igsh=YzhmbXZnYjVnaWpz&utm_source=qr' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 transition-colors duration-300">
      {/* Reading Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-150 z-50" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <img 
              src="https://i.postimg.cc/svnMcvGF/IMG_4031.jpg" 
              alt="Kassiri Pulse Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-red-600 transition-transform group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <span className="text-lg sm:text-2xl font-black tracking-tighter text-zinc-900 uppercase whitespace-nowrap">
              KASSIRI <span className="text-red-600">PULSE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 h-full items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative text-sm font-bold uppercase tracking-wider transition-colors hover:text-red-600 h-full flex items-center group/link",
                  location.pathname === link.path ? "text-red-600" : "text-zinc-600"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "p-2 transition-colors",
                isSearchOpen ? "text-red-600" : "text-zinc-600 hover:text-red-600"
              )}
              aria-label="Rechercher"
              aria-expanded={isSearchOpen}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            
            <div className="hidden sm:flex items-center space-x-3 border-l border-zinc-200 pl-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-red-600 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-zinc-600 hover:text-red-600 transition-colors"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 top-20 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu-content"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 bottom-0 w-full max-w-xs bg-white z-50 lg:hidden border-l border-zinc-200 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "block px-4 py-4 text-lg font-black uppercase tracking-tighter rounded-xl transition-all",
                      location.pathname === link.path 
                        ? "bg-red-50 text-red-600" 
                        : "text-zinc-900 hover:bg-zinc-50"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-8 border-t border-zinc-100">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 px-4">Suivez-nous</p>
                <div className="flex space-x-4 px-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full text-zinc-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-8 px-4">
                <div className="bg-zinc-900 p-6 rounded-2xl text-white">
                  <h4 className="font-black uppercase tracking-tighter mb-2">Soutenez-nous</h4>
                  <p className="text-xs text-zinc-400 mb-4">Aidez Kassiri Pulse à rester indépendant.</p>
                  <a 
                    href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=traorekassiri@gmail.com&currency_code=EUR&source=url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-red-600 text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
                  >
                    Faire un don
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 top-20 bg-black/20 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            key="search-bar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-zinc-200 p-4 z-40 shadow-xl"
          >
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full bg-zinc-100 border-none rounded-full py-3 sm:py-4 px-6 sm:px-8 text-zinc-900 outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  autoFocus
                />
                <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-600 transition-colors">
                  <Search size={22} />
                </button>
              </form>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-zinc-400 hover:text-red-600 transition-colors lg:hidden"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
