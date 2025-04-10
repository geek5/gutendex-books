import { Suspense } from "react";
import DownloadPage from "./DownloadPage";

// Fonction pour formater dynamiquement le titre SEO
export async function generateMetadata({ searchParams }) {
  const {name} = await searchParams;

  const bookName = decodeURIComponent(name || "Livre");
  const title = `Télécharger ${bookName} - livreslib`;
  const description = `Accédez au téléchargement gratuit du livre "${bookName}" en toute simplicité.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/default.png",
          width: 1200,
          height: 630,
          alt: `Téléchargement de ${bookName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/default.png"],
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DownloadPage />
    </Suspense>
  );
}
