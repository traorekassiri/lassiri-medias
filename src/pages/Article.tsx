import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ArticleCard from '../components/ArticleCard';
import AdUnit from '../components/AdUnit';
import { Clock, User, Share2, Facebook, Twitter, MessageCircle, Send, ChevronLeft, Linkedin } from 'lucide-react';

export default function Article() {
  const { category, slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const shareUrl = window.location.href;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `${article.title} - Kassiri Pulse`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const text = `${article.title} - ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    setLoading(true);
    // Fetch current article
    fetch(`/api/articles/${category}/${slug}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(err => console.error(err));

    // Fetch related articles
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const related = data
          .filter((a: any) => a.category === category && a.slug !== slug)
          .slice(0, 4);
        setRelatedArticles(related);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [category, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-black">404</h1>
        <p>Article non trouvé</p>
        <Link to="/" className="text-red-600 font-bold hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  const dateFormatted = format(new Date(article.date), 'dd MMMM yyyy', { locale: fr });

  return (
    <article className="pb-20">
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <Link 
          to={`/category/${article.category}`}
          className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-6 rounded"
        >
          {article.category}
        </Link>
        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 mb-8 leading-tight">
          {article.title}
        </h1>
        <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto">
          {article.description}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 border-y border-zinc-100 py-6">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-red-600" />
            <span className="font-bold">{article.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-red-600" />
            <span>{dateFormatted}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 size={16} className="text-red-600" />
            <span>5 min de lecture</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full aspect-[21/9] object-cover rounded-3xl shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Social Share (Sticky) */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-32 flex flex-col items-center space-y-6">
              <button 
                onClick={shareOnFacebook}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-blue-600 transition-colors"
                title="Partager sur Facebook"
              >
                <Facebook size={20} />
              </button>
              <button 
                onClick={shareOnTwitter}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-sky-500 transition-colors"
                title="Partager sur Twitter"
              >
                <Twitter size={20} />
              </button>
              <button 
                onClick={shareOnLinkedIn}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-blue-700 transition-colors"
                title="Partager sur LinkedIn"
              >
                <Linkedin size={20} />
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-green-500 transition-colors"
                title="Partager sur WhatsApp"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </aside>

          {/* Middle: Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-50/50 rounded-3xl p-8 md:p-12 border border-zinc-100/50 shadow-sm">
              <div className="prose prose-xl prose-zinc prose-red max-w-none leading-relaxed">
                <AdUnit slot="555666777" className="mb-8 bg-zinc-50 rounded-xl" />
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-zinc-200/60 flex flex-wrap gap-2">
                {article.tags?.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white text-zinc-600 text-xs font-bold rounded-full border border-zinc-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Social Share */}
            <div className="lg:hidden flex justify-center space-x-4 mt-8">
              <button 
                onClick={shareOnFacebook}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-blue-600 transition-colors"
              >
                <Facebook size={20} />
              </button>
              <button 
                onClick={shareOnTwitter}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-sky-500 transition-colors"
              >
                <Twitter size={20} />
              </button>
              <button 
                onClick={shareOnLinkedIn}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-blue-700 transition-colors"
              >
                <Linkedin size={20} />
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-green-500 transition-colors"
              >
                <MessageCircle size={20} />
              </button>
            </div>

            {/* Comments Section */}
            <section className="mt-20 pt-12 border-t border-zinc-100">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Commentaires</h3>
              <div className="space-y-8">
                <form className="bg-zinc-50 p-8 rounded-2xl space-y-4 border border-zinc-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Votre nom" 
                      className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none"
                    />
                    <input 
                      type="email" 
                      placeholder="Votre email (ne sera pas publié)" 
                      className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>
                  <textarea 
                    rows={4} 
                    placeholder="Votre commentaire..." 
                    className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-red-600 outline-none resize-none"
                  />
                  <button className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors">
                    Publier le commentaire
                  </button>
                </form>

                <div className="space-y-6">
                  <div className="p-6 border border-zinc-100 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Anonyme</span>
                      <span className="text-xs text-zinc-400">Il y a 2 heures</span>
                    </div>
                    <p className="text-zinc-600">Excellent article, merci pour ces informations !</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Sidebar (Sticky) */}
          <aside className="lg:col-span-3 space-y-12">
            <div className="sticky top-32 space-y-12">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg font-black uppercase tracking-tighter mb-6 pb-2 border-b-2 border-red-600 w-fit">
                    Articles Similaires
                  </h3>
                  <div className="space-y-6">
                    {relatedArticles.map((art) => (
                      <Link 
                        key={art.slug} 
                        to={`/article/${art.category}/${art.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          <img 
                            src={art.image} 
                            alt={art.title}
                            className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-bold leading-tight text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2">
                              {art.title}
                            </h4>
                            <span className="text-[10px] text-zinc-400 uppercase font-bold mt-1 block">
                              {format(new Date(art.date), 'dd MMM yyyy', { locale: fr })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Sidebar Ad */}
              <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                <span className="text-[10px] text-zinc-400 uppercase font-bold mb-4 block text-center">Publicité</span>
                <AdUnit slot="111222333" format="rectangle" />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}
