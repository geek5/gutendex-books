"use client";

import { useEffect, useState, Suspense, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Adsense from "../components/Adsense"; // Chemin relatif correct

function NotFoundPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gutendex.com/books/?languages=fr")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results.slice(0, 6)); // On affiche 6 suggestions pour la page
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <Adsense/>
      <Card className="rounded-2xl shadow-lg p-8 max-w-md text-center mb-8">
        <CardContent>
          <h1 className="text-4xl font-bold text-blue-800 mb-4">404 - Page introuvable</h1>
          <p className="text-gray-600 mb-6">
            Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="outline" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Adsense/>
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Quelques suggestions de lecture :</h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="rounded-2xl shadow-md p-4">
                <CardContent>
                  <div className="mb-3">
                    <Image
                      src={book.formats["image/jpeg"]}
                      alt={`Couverture de ${book.title}`}
                      width={200}
                      height={300}
                      className="rounded-xl mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {book.authors.map((a) => a.name).join(", ")}{" "}
                    ({book.authors[0]?.birth_year}–{book.authors[0]?.death_year})
                  </p>
                  <Button variant="outline" asChild>
                    <Link href={`/livre/${book.id}`}>Voir le livre</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const Custom404 = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <NotFoundPage />
    </Suspense>
  );
};

export default Custom404;
