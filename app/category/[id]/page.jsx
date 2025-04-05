"use client"; // Marque ce fichier comme un composant client uniquement

import { useEffect, useState } from "react";
import { useRouter,useParams } from 'next/navigation';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Adsense from "../../../components/Adsense"; // Assurez-vous que le chemin est correct


export default function Category() {
  const router = useRouter();
  // const { category } = router.query; // Récupère la catégorie depuis l'URL

    const params = useParams();
    const category = Array.isArray(params.id) ? params.id[0] : params.id;

    // alert(category)
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false); // Vérification de montage

  useEffect(() => {
    setIsMounted(true); // Le composant est maintenant monté

    if (!category) return; // Ne fait rien si la catégorie n'est pas encore définie

    setLoading(true);
    fetch(`https://gutendex.com/books/?languages=fr&topic=${category}&page=${page}`)
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
      router.push(`/category/${category}`, undefined, { shallow: true });
    } else {
      // Ajouter la variable `page` dans l'URL
      router.push(`/category/${category}?page=${page}`, undefined, { shallow: true });
    }

  }, [category, page, router]);

  if (!isMounted) {
    return null; // Ne pas afficher le composant tant que ce n'est pas monté
  }

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
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Livres dans la catégorie: {category}</h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Affiche l'AdSense au début */}
        <Adsense />

        {books.map((book, index) => (
          <>
            <Card key={book.id} className="rounded-2xl shadow-md p-4">
              <CardContent>
                <div className="mb-2">
                  <Image
                    src={book.formats["image/jpeg"]}
                    alt={`Couverture de ${book.title}`}
                    width={200}
                    height={300}
                    className="rounded-xl mx-auto"
                  />
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
                    <Link href={`/book/${book.id}`}>Voir les détails</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Affiche un AdSense après chaque groupe de 3 éléments */}
            {(index + 1) % 3 === 0 && <Adsense />}
          </>
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
  );
}
