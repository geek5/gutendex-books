import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import Adsense from "../../../components/Adsense";

// ✅ SEO Metadata for Next.js 15
export async function generateMetadata({ params }) {

  const { id } = await params

  const res = await fetch(`https://gutendex.com/books/${id}`);

  if (!res.ok) {
    return { title: "Livre non trouvé", description: "Ce livre n'a pas été trouvé sur notre plateforme." };
  }

  const book = await res.json();

  return {
    title: `${book.title} - Téléchargez le livre en EPUB et PDF gratuitement`,
    description: `Découvrez "${book.title}" de ${book.authors?.map(a => a.name).join(", ")}. Téléchargez le livre au format EPUB ou PDF gratuitement.`,
    openGraph: {
      title: `${book.title} - Téléchargez le livre en EPUB et PDF gratuitement`,
      description: `Découvrez "${book.title}" de ${book.authors?.map(a => a.name).join(", ")}. Téléchargez le livre au format EPUB ou PDF gratuitement.`,
      images: [
        {
          url: book.formats?.["image/jpeg"] || "/default.png",
          width: 800,
          height: 600,
          alt: `Couverture de ${book.title}`,
        },
      ],
    },
  };
}

// ✅ Server Component for rendering the page
export default async function BookDetailPage({ params }) {
  const id = params.id;
  const res = await fetch(`https://gutendex.com/books/${id}`);

  if (!res.ok) return notFound();

  const book = await res.json();
  const epubLink = book.formats?.["application/epub+zip"];
  const pdfLink = book.formats?.["application/pdf"];
  const imageUrl = book.formats?.["image/jpeg"];

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
            {book.authors?.map((a) => a.name).join(", ")} 
            ({book.authors?.[0]?.birth_year}–{book.authors?.[0]?.death_year})
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
