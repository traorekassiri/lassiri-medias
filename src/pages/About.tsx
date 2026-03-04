import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">À Propos de Kassiri Pulse</h1>
      
      <div className="prose prose-lg prose-red max-w-none space-y-8">
        <p className="text-xl leading-relaxed text-zinc-600">
          Kassiri Pulse est un média africain et international indépendant, fondé avec la vision de redéfinir le paysage de l'information sur le continent et au-delà.
        </p>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Notre Mission</h2>
          <p>
            Notre mission est d'informer avec rigueur, modernité et une indépendance totale. Nous croyons en un journalisme qui donne la parole à tous, analyse les faits avec profondeur et anticipe les tendances de demain.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Notre Direction</h2>
          <p>
            Le média est fondé et dirigé par <strong>Traore Joseph Kassiri Stephane</strong>, basé au Burkina Faso. Fort d'une passion pour les médias et l'innovation, il insuffle à Kassiri Pulse une dynamique de modernité et d'excellence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Pourquoi "Pulse" ?</h2>
          <p>
            Le "Pulse" représente le pouls de l'actualité, le rythme cardiaque d'un monde en constante mutation. Nous sommes là pour capter chaque vibration, chaque changement significatif et vous le transmettre en temps réel.
          </p>
        </section>

        <div className="bg-zinc-50 p-12 rounded-3xl border border-zinc-100 mt-12">
          <h3 className="text-xl font-bold mb-4">Indépendance et Rigueur</h3>
          <p className="text-sm">
            Kassiri Pulse ne dépend d'aucun groupe politique ou financier. Notre seule boussole est l'intérêt de nos lecteurs et la vérité des faits.
          </p>
        </div>
      </div>
    </div>
  );
}
