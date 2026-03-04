import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface ArticleCardProps {
  article: {
    title: string;
    description: string;
    date: string;
    image: string;
    category: string;
    slug: string;
    urgent?: boolean;
  };
  variant?: 'horizontal' | 'vertical' | 'hero';
}

export default function ArticleCard({ article, variant = 'vertical' }: ArticleCardProps) {
  const dateFormatted = format(new Date(article.date), 'dd MMMM yyyy', { locale: fr });

  if (variant === 'hero') {
    return (
      <Link to={`/article/${article.category}/${article.slug}`} className="group relative block h-[500px] overflow-hidden rounded-2xl">
        <img 
          src={article.image} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-4 rounded">
            {article.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-red-500 transition-colors">
            {article.title}
          </h2>
          <p className="text-zinc-300 text-lg line-clamp-2 mb-6">
            {article.description}
          </p>
          <div className="flex items-center text-zinc-400 text-sm space-x-4">
            <span>{dateFormatted}</span>
            <span className="flex items-center space-x-1">
              <Clock size={14} />
              <span>5 min de lecture</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.category}/${article.slug}`} className="group flex space-x-6 items-start py-6 border-b border-zinc-100 last:border-0">
        <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1 block">
            {article.category}
          </span>
          <h3 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-zinc-500 text-sm mt-2 line-clamp-1">
            {article.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.category}/${article.slug}`} className="group block space-y-4">
      <div className="aspect-video overflow-hidden rounded-xl relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {article.urgent && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded animate-pulse">
            Urgent
          </span>
        )}
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-red-600">
          {article.category}
        </span>
        <h3 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-red-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-zinc-500 text-sm line-clamp-2">
          {article.description}
        </p>
        <div className="flex items-center text-zinc-400 text-[10px] uppercase tracking-widest pt-2">
          <span>{dateFormatted}</span>
        </div>
      </div>
    </Link>
  );
}
