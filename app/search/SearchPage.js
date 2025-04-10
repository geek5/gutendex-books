"use client";

import { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Adsense from "../../components/Adsense";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`https://gutendex.com/books/?languages=fr&search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.results);
          setLoading(false);
        });
    }
  }, [query]);

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
      <h1 className="text-3xl font-bold mb-4">Résultats de la recherche pour: "{query}"</h1>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Fragment key={book.id}>
              <Card className="rounded-2xl shadow-md p-4">
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
                    {book.authors.map((a) => a.name).join(", ")} (
                    {book.authors[0]?.birth_year}–{book.authors[0]?.death_year})
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

              {(index + 1) % 5 === 0 && <Adsense />}
            </Fragment>
          ))
        ) : (
          <p className="text-xl text-center text-gray-500">
            Aucun résultat trouvé pour "{query}".
          </p>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
