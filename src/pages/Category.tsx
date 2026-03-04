import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import AdUnit from '../components/AdUnit';

export default function Category() {
  const { category } = useParams();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((a: any) => a.category === category);
        setArticles(filtered);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdUnit slot="111222333" className="mb-12 bg-zinc-50 rounded-xl border border-zinc-100" />
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 capitalize">
          {category}
        </h1>
        <div className="w-20 h-2 bg-red-600" />
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((art, idx) => (
            <ArticleCard key={idx} article={art} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-500">Aucun article trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
