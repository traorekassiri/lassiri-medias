import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import Slideshow from '../components/Slideshow';
import AdUnit from '../components/AdUnit';
import { ChevronRight, TrendingUp, PlayCircle, Heart, Calendar } from 'lucide-react';
import { isAfter, subHours, subDays, subMonths, startOfDay, startOfWeek, startOfMonth } from 'date-fns';

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    const now = new Date();
    
    let filtered = [...articles];
    
    if (filter === '24h') {
      filtered = articles.filter(a => isAfter(new Date(a.date), subHours(now, 24)));
    } else if (filter === 'week') {
      filtered = articles.filter(a => isAfter(new Date(a.date), subDays(now, 7)));
    } else if (filter === 'month') {
      filtered = articles.filter(a => isAfter(new Date(a.date), subMonths(now, 1)));
    } else if (filter === 'archives') {
      filtered = articles.filter(a => !isAfter(new Date(a.date), subMonths(now, 1)));
    }
    
    setFilteredArticles(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const slideshowArticles = articles.filter(a => a.featured).slice(0, 5);
  if (slideshowArticles.length === 0) slideshowArticles.push(...articles.slice(0, 5));

  const urgentArticles = articles.filter(a => a.urgent).slice(0, 3);
  const latestArticles = filteredArticles.slice(0, 12);
  const categoryArticles = articles.reduce((acc: any, art: any) => {
    if (!acc[art.category]) acc[art.category] = [];
    acc[art.category].push(art);
    return acc;
  }, {});

  return (
    <div className="space-y-16 pb-20">
      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdUnit slot="1234567890" className="bg-zinc-50 rounded-xl border border-zinc-100" />
      </div>

      {/* Slideshow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slideshow articles={slideshowArticles} />
      </section>

      {/* Urgent Section */}
      {urgentArticles.length > 0 && (
        <section className="bg-red-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center">
                <span className="w-2 h-8 bg-red-600 mr-3" />
                Flash Info <span className="text-red-600 ml-2">Urgent</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {urgentArticles.map((art, idx) => (
                <ArticleCard key={idx} article={art} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Middle Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit slot="444555666" className="bg-zinc-50 rounded-xl border border-zinc-100" />
      </div>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Latest News */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-zinc-100 pb-4 gap-4">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Actualités</h2>
                
                {/* Date Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Tout' },
                    { id: '24h', label: '24h' },
                    { id: 'week', label: 'Semaine' },
                    { id: 'month', label: 'Mois' },
                    { id: 'archives', label: 'Archives' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFilterChange(f.id)}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                        activeFilter === f.id 
                          ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
                          : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {latestArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestArticles.map((art, idx) => (
                    <ArticleCard key={idx} article={art} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
                  <Calendar className="mx-auto text-zinc-300 mb-4" size={48} />
                  <p className="text-zinc-500 font-medium">Aucun article trouvé pour cette période.</p>
                  <button 
                    onClick={() => handleFilterChange('all')}
                    className="mt-4 text-red-600 font-bold hover:underline"
                  >
                    Voir tous les articles
                  </button>
                </div>
              )}
            </div>

            {/* Category Sections */}
            {Object.entries(categoryArticles).slice(0, 3).map(([cat, arts]: any) => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter capitalize">{cat}</h2>
                  <button className="text-sm font-bold text-red-600 flex items-center hover:underline">
                    Explorer {cat} <ChevronRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {arts.slice(0, 2).map((art: any, idx: number) => (
                    <ArticleCard key={idx} article={art} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-12">
            {/* Sidebar Ad */}
            <AdUnit slot="0987654321" format="rectangle" className="bg-zinc-50 rounded-2xl border border-zinc-100" />

            {/* Popular Articles */}
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center">
                <TrendingUp size={20} className="text-red-600 mr-2" />
                Les plus lus
              </h3>
              <div className="space-y-2">
                {articles.slice(0, 5).map((art, idx) => (
                  <ArticleCard key={idx} article={art} variant="horizontal" />
                ))}
              </div>
            </div>

            {/* Support Section (Additional Monetization) */}
            <div className="bg-zinc-900 p-8 rounded-2xl text-white">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Heart size={24} fill="currentColor" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Soutenez Kassiri Pulse</h3>
              <p className="text-sm text-zinc-400 mb-6">Aidez-nous à maintenir notre indépendance et à continuer de vous informer gratuitement.</p>
              <a 
                href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=traorekassiri@gmail.com&currency_code=EUR&source=url"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-zinc-900 font-bold py-3 rounded-lg hover:bg-red-600 hover:text-white transition-all text-center"
              >
                Faire un don via PayPal
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-red-600 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Newsletter</h3>
              <p className="text-sm text-red-100 mb-6">Recevez l'essentiel de l'actualité directement dans votre boîte mail.</p>
              <form className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Votre adresse email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-white text-red-600 font-bold py-3 rounded-lg hover:bg-zinc-100 transition-colors">
                  S'abonner
                </button>
              </form>
            </div>

            {/* Video Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-tighter flex items-center">
                <PlayCircle size={20} className="text-red-600 mr-2" />
                Vidéos
              </h3>
              <div className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer">
                <img src="https://picsum.photos/seed/video/400/225" alt="Video thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <PlayCircle size={48} className="text-white" />
                </div>
              </div>
              <p className="text-sm font-bold text-zinc-600">Reportage : Le Burkina Faso face aux défis du futur</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
