"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Added Suspense
import { majorTopics } from "../lib/constants";

// 2. Define a Fallback Component
const FallbackBreadcrumb = () => (
  <nav aria-label="breadcrumb" className="border-b border-gray-200 dark:border-gray-700">
    <ol className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <li className="flex items-center">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
          Accueil
        </Link>
      </li>
    </ol>
  </nav>
);

// 3. Create an Inner Component for Dynamic Breadcrumbs (renamed from original Breadcrumbs)
const DynamicBreadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [bookTitles, setBookTitles] = useState({});
  const [loadingBookId, setLoadingBookId] = useState(null);

  useEffect(() => {
    const generateBreadcrumbs = async () => {
      const generatedBreadcrumbs = [];
      generatedBreadcrumbs.push({ href: "/", label: "Accueil" });

      if (pathname) {
        const pathSegments = pathname.split("/").filter(Boolean);
        let currentPath = "";

        for (let i = 0; i < pathSegments.length; i++) {
          const segment = pathSegments[i];
          currentPath += `/${segment}`;

          if (segment === "category") {
            const slug = pathSegments[++i];
            currentPath += `/${slug}`;
            const category = majorTopics.find(topic => topic.slug === slug);
            generatedBreadcrumbs.push({ href: currentPath, label: category ? category.name : `Category: ${slug}` });
          } else if (segment === "livre") {
            const bookId = pathSegments[++i];
            currentPath += `/${bookId}`;
            let bookLabel = `Livre: ${bookId}`; 

            if (bookTitles[bookId]) {
              bookLabel = bookTitles[bookId];
            } else if (loadingBookId !== bookId) {
              bookLabel = "Chargement du titre...";
              setLoadingBookId(bookId);
              try {
                const response = await fetch(`https://gutendex.com/books/${bookId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data && data.title) {
                  setBookTitles(prev => ({ ...prev, [bookId]: data.title }));
                } else {
                  setBookTitles(prev => ({ ...prev, [bookId]: `Titre inconnu (${bookId})` }));
                }
              } catch (error) {
                console.error("Failed to fetch book title:", error);
                setBookTitles(prev => ({ ...prev, [bookId]: `Titre inconnu (${bookId})` }));
                // Keep bookLabel as "Chargement du titre..." or "Livre: {bookId}" if error, 
                // it will be updated to "Titre inconnu" on next render cycle
              } finally {
                setLoadingBookId(null);
              }
            } else if (loadingBookId === bookId) {
                bookLabel = "Chargement du titre..."; // Explicitly keep loading label
            }
            generatedBreadcrumbs.push({ href: currentPath, label: bookLabel });
          }
        }
      }

      if (pathname === "/search") {
        const query = searchParams.get("query");
        if (query) {
          generatedBreadcrumbs.push({ href: `/search?query=${query}`, label: `Recherche: ${query}` });
        }
      } else if (pathname === "/download") {
        const name = searchParams.get("name");
        if (name) {
          generatedBreadcrumbs.push({ href: `/download?name=${name}`, label: `Télécharger: ${name}` });
        }
      }
      
      setBreadcrumbs(generatedBreadcrumbs);
    };

    generateBreadcrumbs();
  }, [pathname, searchParams, bookTitles, loadingBookId]); // Added loadingBookId to dependency array

  if (breadcrumbs.length === 0 && !pathname) { // Avoid rendering empty if pathname not yet available
    return null; 
  }
  // If breadcrumbs has only "Accueil" and pathname is not just "/", it might be loading
  if (breadcrumbs.length <= 1 && pathname && pathname !== "/") {
     //This check helps ensure that if dynamic segments are expected, we don't flash an incomplete breadcrumb.
     //The FallbackBreadcrumb is shown by Suspense initially.
     //Once hooks are ready, this component renders. If it's still calculating,
     //it might render just "Accueil". We might want to show nothing or a minimal loading here too,
     //or rely on Suspense for all loading states.
     //For now, let's allow it to render what it has.
  }


  return (
    <nav aria-label="breadcrumb" className="border-b border-gray-200 dark:border-gray-700">
      <ol className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-700 dark:text-gray-200" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
        {(breadcrumbs.length === 0 && pathname) && ( // Show home if path available but breadcrumbs empty
            <li className="flex items-center">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                  Accueil
                </Link>
            </li>
        )}
      </ol>
    </nav>
  );
};

// 4. Modify the Main Breadcrumbs Exported Component
const Breadcrumbs = () => {
  return (
    <Suspense fallback={<FallbackBreadcrumb />}>
      <DynamicBreadcrumbs />
    </Suspense>
  );
};

export default Breadcrumbs;
