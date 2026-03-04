import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
  articles: any[];
}

export default function Slideshow({ articles }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (!articles || articles.length === 0) return null;

  const currentArticle = articles[currentIndex];
  const dateFormatted = format(new Date(currentArticle.date), 'dd MMMM yyyy', { locale: fr });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden rounded-2xl group bg-zinc-900">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <img
            src={currentArticle.image}
            alt={currentArticle.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-4xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-3 rounded">
                {currentArticle.category}
              </span>
              <Link to={`/article/${currentArticle.category}/${currentArticle.slug}`}>
                <h2 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight hover:text-red-500 transition-colors line-clamp-2">
                  {currentArticle.title}
                </h2>
              </Link>
              <p className="text-zinc-300 text-sm line-clamp-2 mb-6 hidden md:block max-w-2xl">
                {currentArticle.description}
              </p>
              <div className="flex items-center text-zinc-400 text-[10px] uppercase tracking-wider space-x-4">
                <span className="font-bold text-white">{currentArticle.author}</span>
                <span>{dateFormatted}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-red-600 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-red-600 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all rounded-full ${
              idx === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
