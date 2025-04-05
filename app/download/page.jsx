"use client";

import { useEffect, useState } from "react";
import { Suspense } from 'react';

import { useSearchParams } from "next/navigation";
import Adsense from "../../components/Adsense"; // Assurez-vous que le chemin est correct


 function DownloadPage() {
  const [countdown, setCountdown] = useState(30); // Compte à rebours de 30 secondes
  const [ready, setReady] = useState(false); // Si le téléchargement est prêt
  const searchParams = useSearchParams();

  // Récupérer les informations à partir des paramètres URL
  const link = searchParams.get("link");
  const bookName = searchParams.get("name"); // Nom du livre
  const imageUrl = searchParams.get("image"); // URL de l'image miniature

  // Lancer le compte à rebours uniquement si le lien existe
  useEffect(() => {
    if (!link) {
      return; // Si aucun lien n'est trouvé, on arrête l'exécution
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop le compte à rebours
          setReady(true); // Le téléchargement devient disponible
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle lorsque le composant est démonté
  }, [link]);

  // Si le lien est manquant, afficher un message d'erreur
  if (!link) {
    return (
      <div className="p-6 text-center text-xl text-red-600">
        Lien de téléchargement invalide ou manquant.
      </div>
    );
  }

  return (


    <div>

<div className="adsense-container mb-4 center">
    <Adsense/>
</div>
<div className="bg-white p-12 text-center min-h-screen flex items-center justify-center">
    <div className="adsense-container mb-4">
        <Adsense/>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto space-y-6">
    {/* Affichage du nom du livre et de l'image miniature */}
    <div className="flex justify-center mb-6">
        {imageUrl && (
        <img
            src={imageUrl}
            alt={`Image de ${bookName}`}
            className="w-32 h-48 object-cover rounded-lg shadow-md"
        />
        )}
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">{bookName || "Livre inconnu"}</h1>

    {/* Affichage du compte à rebours */}
    {!ready ? (
        <p className="text-lg text-gray-700">
        Veuillez patienter <span className="font-semibold text-blue-600">{countdown}</span> secondes...
        </p>
    ) : (
        <a
        href={link}
        className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition-all duration-300"
        download
        target="_blank"
        rel="noopener noreferrer"
        >
        Télécharger le livre
        </a>
    )}

    {/* Publicité AdSense */}
    <div className="my-6">
        <div className="adsense-container mb-4">
        <Adsense/>
        </div>

        <div className="seo-container">
        <p className="text-sm text-gray-500">
            Découvrez notre vaste collection de livres gratuits, dont des romans, des sciences, de la philosophie, de l'histoire et bien plus encore. Téléchargez maintenant un livre gratuitement !
        </p>
        </div>
    </div>
    </div>
    <div className="adsense-container mb-4">
        <Adsense/>
    </div>
</div>
</div>


  );
}


const SuspendedDownloadPage = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DownloadPage />
      </Suspense>
    );
  };
  
  export default SuspendedDownloadPage;