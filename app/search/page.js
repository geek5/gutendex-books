import { Suspense } from "react";
import SearchPage from "./SearchPage";

export const metadata = {
  title: "Recherche de livres - livreslib",
  description: "Découvrez les résultats de recherche de livres en français.",
  openGraph: {
    title: "Recherche de livres - livreslib",
    description: "Découvrez les résultats de recherche de livres en français.",
    images: [
      {
        url: "/default.png",
        width: 1200,
        height: 630,
        alt: "Couverture par défaut des livres",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recherche de livres - livreslib",
    description: "Découvrez les résultats de recherche de livres en français.",
    images: ["/default.png"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SearchPage />
    </Suspense>
  );
}
