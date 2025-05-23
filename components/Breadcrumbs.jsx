"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { majorTopics } from "../lib/constants";

const Breadcrumbs = () => {
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
            let bookLabel = `Livre: ${bookId}`; // Default label

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
                  // The label will be updated on the next render cycle
                  // triggered by the state change in bookTitles.
                } else {
                  setBookTitles(prev => ({ ...prev, [bookId]: `Titre inconnu (${bookId})` }));
                  // The label will be updated on the next render cycle.
                }
              } catch (error) {
                console.error("Failed to fetch book title:", error);
                setBookTitles(prev => ({ ...prev, [bookId]: `Titre inconnu (${bookId})` }));
                bookLabel = `Titre inconnu (${bookId})`;
              } finally {
                setLoadingBookId(null);
              }
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
  }, [pathname, searchParams, bookTitles]); // Add bookTitles to dependency array

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="border-b border-gray-200 dark:border-gray-700">
      <ol className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center"> {/* Added flex items-center to li for better alignment if needed */}
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
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
