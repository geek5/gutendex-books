// app/category/[id]/page.tsx
import { Suspense } from "react";
import CategoryPage from "./CategoryPage";

export async function generateMetadata({ params }) {
  const { id } = await params
  const category = decodeURIComponent(id);

  const title = `Livres en catégorie "${category}" - livreslib`;
  const description = `Découvrez des livres gratuits en français dans la catégorie "${category}" sur livreslib.`;

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
          alt: `Image pour la catégorie ${category}`,
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
      <CategoryPage />
    </Suspense>
  );
}
