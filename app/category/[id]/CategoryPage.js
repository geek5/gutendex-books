"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";


import Adsense from "../../../components/Adsense";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const category = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    fetch(`https://gutendex.com/books/?languages=fr&topic=${category}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results || []);
        setHasNext(!!data.next);
        setHasPrevious(!!data.previous);
        setLoading(false);
      });

    const url = page === 1
      ? `/category/${category}`
      : `/category/${category}?page=${page}`;

    router.push(url, { shallow: true });
  }, [category, page]);

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

      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Livres dans la catégorie : {category}</h1>
        <Adsense />

        {books.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-12">
            Aucun livre trouvé dans cette catégorie.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {books.map((book, index) => (
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
                      {book.authors.map((a) => a.name).join(", ")}{" "}
                      ({book.authors[0]?.birth_year}–{book.authors[0]?.death_year})
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
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
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
  );
}
