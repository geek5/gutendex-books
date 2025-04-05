"use client"; // Ajouter cette ligne pour indiquer l'exécution côté client

import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Liste des sujets principaux
  const majorTopics = [
    { name: "Histoire", slug: "history" },
    { name: "Science", slug: "science" },
    { name: "Philosophie", slug: "philosophy" },
    { name: "Littérature", slug: "literature" },
    { name: "Art", slug: "art" },
    { name: "Technologie", slug: "technology" },
    { name: "Religion", slug: "religion" },
    { name: "Politique", slug: "politics" },
  ];

  // Fonction de soumission du formulaire
  const handleSearch = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (searchQuery.trim()) {
      // Redirige vers la page de recherche avec la requête
      window.location.href = `/search?query=${searchQuery}`;
    } else {
      alert("Veuillez entrer un terme de recherche.");
    }
  };

  return (
    <nav className="bg-transparent border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
  <path d="M8 16h20v32H8z" />
  <path d="M36 16h20v32H36z" />
  <path d="M28 16v32" />
  <path d="M44 16v10l4-2 4 2V16" />
</svg>


          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Livrelib</span>
        </Link>

        {/* Barre de recherche et menu */}
        <div className="flex md:order-2">
          {/* Bouton de recherche mobile */}
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <Search className="w-5 h-5" />
            <span className="sr-only">Recherche</span>
          </button>

          {/* Champ de recherche (pour desktop) */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Recherche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Gère la saisie
              />
            </form>
          </div>

          {/* Bouton pour ouvrir le menu mobile */}
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Menu déroulant (Dropdown) */}
        <div className="hidden w-full md:flex md:w-auto md:order-1">
          {/* Menu déroulant des catégories */}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Catégories
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              {majorTopics.map((topic) => (
                <DropdownMenuItem key={topic.slug} className="p-0">
                  <Link
                    href={`/category/${topic.slug}`}
                    className="inline-block w-full p-2 text-black hover:bg-blue-100 transition-all duration-200 ease-in-out"
                  >
                    {topic.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
