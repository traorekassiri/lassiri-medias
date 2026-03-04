import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">Politique de Confidentialité</h1>
      
      <div className="prose prose-lg prose-red max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">1. Collecte des données</h2>
          <p>
            Nous collectons un minimum de données personnelles via notre formulaire de contact :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Contenu du message</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">2. Utilisation des données</h2>
          <p>
            Ces données sont uniquement utilisées pour répondre à vos demandes. Elles ne sont en aucun cas revendues ou cédées à des tiers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">3. Cookies et Publicité</h2>
          <p>
            Le site utilise des cookies techniques nécessaires à son bon fonctionnement. Nous utilisons également <strong>Google AdSense</strong> pour la monétisation, qui peut utiliser des cookies pour diffuser des annonces basées sur vos visites précédentes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase mb-4">4. Vos droits</h2>
          <p>
            Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour l'exercer, contactez-nous à : <strong>contact@kassiripulse.online</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
