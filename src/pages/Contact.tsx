import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">Contactez-nous</h1>
            <p className="text-xl text-zinc-500">
              Une question, une suggestion ou une information à nous partager ? Notre équipe est à votre écoute.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-red-600 p-4 rounded-2xl text-white">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-zinc-500">contact@kassiripulse.online</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-red-600 p-4 rounded-2xl text-white">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                <p className="text-zinc-500">+226 62322432</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-red-600 p-4 rounded-2xl text-white">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Bureau</h3>
                <p className="text-zinc-500">Ouagadougou, Burkina Faso</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 p-10 rounded-3xl border border-zinc-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Nom Complet</label>
                <input 
                  type="text" 
                  className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none"
                  placeholder="Jean Dupont"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none"
                  placeholder="jean@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Sujet</label>
              <input 
                type="text" 
                className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none"
                placeholder="Proposition d'article"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Message</label>
              <textarea 
                rows={6}
                className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none resize-none"
                placeholder="Votre message ici..."
              />
            </div>
            <button className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
              <span>Envoyer le message</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
