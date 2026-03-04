import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 text-zinc-600 py-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="https://i.postimg.cc/svnMcvGF/IMG_4031.jpg" 
                alt="Kassiri Pulse Logo" 
                className="w-8 h-8 rounded-full object-cover border border-red-600"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-black tracking-tighter text-zinc-900 uppercase">
                KASSIRI <span className="text-red-600">PULSE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Kassiri Pulse est un média africain et international indépendant. Notre mission est d'informer avec rigueur, modernité et impartialité.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1Gu96j95rD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/cheverny.co?igsh=YzhmbXZnYjVnaWpz&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@kassirii?_r=1&_t=ZN-94OzSqjwRuQ" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-zinc-900 font-bold uppercase tracking-widest text-sm mb-6">Catégories</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/category/afrique" className="hover:text-red-600 transition-colors">Afrique</Link></li>
              <li><Link to="/category/international" className="hover:text-red-600 transition-colors">International</Link></li>
              <li><Link to="/category/economie" className="hover:text-red-600 transition-colors">Économie</Link></li>
              <li><Link to="/category/culture" className="hover:text-red-600 transition-colors">Culture</Link></li>
              <li><Link to="/category/sport" className="hover:text-red-600 transition-colors">Sport</Link></li>
              <li><Link to="/category/sante" className="hover:text-red-600 transition-colors">Santé</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-zinc-900 font-bold uppercase tracking-widest text-sm mb-6">Liens Utiles</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-red-600 transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="hover:text-red-600 transition-colors">Mentions Légales</Link></li>
              <li><Link to="/privacy" className="hover:text-red-600 transition-colors">Politique de Confidentialité</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-zinc-900 font-bold uppercase tracking-widest text-sm mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-red-600" />
                <span>contact@kassiripulse.online</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-red-600" />
                <span>+226 62322432</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-red-600" />
                <span>Burkina Faso</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {currentYear} Kassiri Pulse. Tous droits réservés.</p>
          <p className="mt-4 md:mt-0">Propulsé par Traore Joseph Kassiri Stephane</p>
        </div>
      </div>
    </footer>
  );
}
