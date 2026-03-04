import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './pages/Category';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import CookieConsent from './components/CookieConsent';
import AdUnit from './components/AdUnit';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 flex flex-col">
        <Header />
        <div className="pt-20">
          <AdUnit slot="000111222" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:category/:slug" element={<Article />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}
