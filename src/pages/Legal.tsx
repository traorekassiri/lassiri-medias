import React from 'react';

export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">Mentions Légales</h1>
      
      <div className="prose prose-lg prose-red max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">1. Édition du site</h2>
          <p>Le site <strong>Kassiri Pulse</strong> est édité par Traore Joseph Kassiri Stephane.</p>
          <ul className="list-none space-y-2 pl-0">
            <li><strong>Responsable de publication :</strong> Traore Joseph Kassiri Stephane</li>
            <li><strong>Contact :</strong> contact@kassiripulse.online</li>
            <li><strong>Téléphone :</strong> +226 62322432</li>
            <li><strong>Pays :</strong> Burkina Faso</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">2. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <ul className="list-none space-y-2 pl-0">
            <li><strong>GitHub Inc.</strong> (Code source)</li>
            <li><strong>Vercel Inc.</strong> (Déploiement et service)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">3. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus (textes, images, vidéos, logos) présents sur le site Kassiri Pulse est la propriété exclusive de son éditeur, sauf mention contraire. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">4. Responsabilité</h2>
          <p>
            Kassiri Pulse s'efforce de fournir des informations aussi précises que possible. Toutefois, l'éditeur ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
          </p>
        </section>
      </div>
    </div>
  );
}
