import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Search, Calendar } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((art: any) => 
          art.title.toLowerCase().includes(query.toLowerCase()) ||
          art.description.toLowerCase().includes(query.toLowerCase()) ||
          art.category.toLowerCase().includes(query.toLowerCase())
        );
        setArticles(filtered);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-12">
        <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-200">
          <Search size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Résultats de recherche</h1>
          <p className="text-zinc-500">
            {articles.length} résultat{articles.length > 1 ? 's' : ''} pour "<span className="text-red-600 font-bold">{query}</span>"
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <ArticleCard key={idx} article={art} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
          <Search className="mx-auto text-zinc-300 mb-4" size={48} />
          <p className="text-zinc-500 font-medium">Aucun article ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
