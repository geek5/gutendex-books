"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import Adsense from "../../../components/Adsense"; // Assurez-vous que le chemin est correct


export default function BookDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      });
  }, [id]);

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
  if (!book) return <p className="p-6 text-xl text-red-600">Livre non trouvé</p>;

  const epubLink = book.formats["application/epub+zip"];
  const pdfLink = book.formats["application/pdf"];
  const imageUrl = book.formats["image/jpeg"];

  return (
    <div>
      <Adsense />
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`Couverture de ${book.title}`}
              width={300}
              height={450}
              className="rounded-xl"
            />
          )}
          <h1 className="text-3xl font-bold text-center">{book.title}</h1>
          <p className="text-md text-gray-700">
            {book.authors.map((a) => a.name).join(", ")} ({book.authors[0]?.birth_year}–{book.authors[0]?.death_year})
          </p>
          <Adsense />
          <p className="text-gray-600 text-justify leading-relaxed max-w-xl">
            {book.summaries?.[0]}
          </p>
          <Adsense />
          <div className="flex gap-4 mt-6">
            {epubLink && (
              <Link href={`/download?link=${encodeURIComponent(epubLink)}&name=${encodeURIComponent(book.title)}&image=${encodeURIComponent(imageUrl)}`}>
                <Button className="bg-blue-600 text-white px-4 py-2 rounded">Télécharger EPUB</Button>
              </Link>
            )}
            {pdfLink && (
              <Button variant="outline" asChild>
                <a href={pdfLink} download target="_blank" rel="noopener noreferrer">
                  Télécharger PDF
                </a>
              </Button>
            )}
            {!epubLink && !pdfLink && <p className="text-gray-500">Aucun fichier téléchargeable disponible</p>}
          </div>
          <Adsense />
        </div>
      </div>
      <Adsense />
    </div>
  );
}
