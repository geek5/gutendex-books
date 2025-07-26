"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Utilisation du routeur Next.js pour gérer l'URL
// import Adsense from "@/components/Adsense";
import Adsense from "../components/Adsense"; // Chemin relatif correct
import Head from 'next/head';



export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`https://gutendex.com/books/?languages=fr&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results);
        setHasNext(!!data.next);
        setHasPrevious(!!data.previous);
        setLoading(false);
      });

    // Rafraîchir les annonces Adsense après chaque changement de page
    // const refreshAds = () => {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // };
    // refreshAds();

    if (page === 1) {
      // Supprimer la variable `page` si l'on est sur la première page
      router.push("/", undefined, { shallow: true });
    } else {
      // Ajouter la variable `page` dans l'URL
      router.push(`/?page=${page}`, undefined, { shallow: true });
    }
  }, [page, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-xl font-semibold text-blue-800">Chargement en cours...</p>
          <p className="text-sm text-gray-500">Veuillez patienter pendant que nous préparons vos livres</p>
        </div>
      </div>
    );
  }
  
  return (
    
    <>
    
    <Head>
      <title>Ma page côté client</title>
      <meta name="description" content="Description dynamique de la page côté client" />
    </Head>

    <div className="p-6">
      <div className="max-w-screen-xl mx-auto">
      
      <div className="p-8 mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">Bienvenue sur LivresLib</h1>
        <p className="text-xl text-gray-800 mb-4">
          Découvrez une vaste collection de <strong>livres gratuits</strong> sur <strong>LivresLib.com</strong>. Téléchargez des livres en formats <strong>EPUB</strong> et <strong>PDF</strong> dans plusieurs genres, tels que l'<strong>histoire</strong>, la <strong>littérature</strong>, la <strong>philosophie</strong>, la <strong>science</strong> et bien plus encore.
        </p>
        <p className="text-xl text-gray-800 mb-4">
          LivresLib est votre destination idéale pour <strong>accéder à des livres du domaine public</strong> et enrichir votre bibliothèque personnelle sans frais. Notre site vous permet de télécharger des ouvrages légaux, qu'il s'agisse de classiques littéraires, de récits historiques ou d'ouvrages scientifiques.
        </p>
        <p className="text-xl text-gray-800 mb-6">
          Profitez de notre plateforme simple et rapide pour explorer des <strong>livres gratuits</strong> dans des catégories variées, adaptées à tous les goûts. Découvrez un <strong>catalogue riche et diversifié</strong> et commencez à lire immédiatement.
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="/category/literature"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Explorer la Littérature
          </a>
          <a
            href="/category/history"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Explorer l'Histoire
          </a>
        </div>

        <div className="mt-10 text-lg text-gray-600">
          <p>
            <strong>LivresLib.com</strong> vous permet de télécharger facilement des livres électroniques gratuits et légaux, sans abonnement nécessaire. Que vous soyez étudiant, chercheur, ou simplement un passionné de lecture, vous trouverez des milliers de titres disponibles gratuitement.
          </p>
          <p className="mt-4">
            Plongez dans le monde de la lecture et accédez à des <strong>ouvrages variés</strong> de qualité, tous disponibles en téléchargement direct. Une bibliothèque à portée de clic !
          </p>
        </div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Affiche l'AdSense au début */}
        <Adsense />

        {books.map((book, index) => (
          <Fragment key={book.id}>
            <div>
              <Card className="rounded-2xl shadow-md p-4">
                <CardContent>
                  <div className="mb-2">
                    <Image src={book.formats["image/jpeg"]} alt={`Couverture de ${book.title}`} width={200} height={300} className="rounded-xl mx-auto" />
                  </div>
                  <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                  <p className="text-sm text-gray-700 mb-2">
                    {book.authors.map((a) => a.name).join(", ")} ({book.authors[0]?.birth_year}–{book.authors[0]?.death_year})
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {book.summaries?.[0]?.slice(0, 200)}...
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/livre/${book.id}`}>Voir les détails</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {(index + 1) % 5 === 0 && <Adsense />}
          </Fragment>
        ))}

      </main>

      <div className="flex justify-center gap-4">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={!hasPrevious}>
          Précédent
        </Button>
        <span className="px-4 py-2 text-lg">Page {page}</span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={!hasNext}>
          Suivant
        </Button>
      </div>
      </div>
    </div>
    </>
  );
}
