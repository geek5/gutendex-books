"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${searchQuery}`;
    } else {
      alert("Veuillez entrer un terme de recherche.");
    }
  };

  return (
    <nav className="bg-transparent border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="48"
            height="48"
          >
            <path d="M8 16h20v32H8z" />
            <path d="M36 16h20v32H36z" />
            <path d="M28 16v32" />
            <path d="M44 16v10l4-2 4 2V16" />
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Livrelib
          </span>
        </Link>

        {/* Desktop search + menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Recherche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </form>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">
              Catégories
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black rounded-md shadow-lg">
              {majorTopics.map((topic) => (
                <DropdownMenuItem key={topic.slug} className="p-0">
                  <Link
                    href={`/category/${topic.slug}`}
                    className="block w-full px-4 py-2 hover:bg-blue-100"
                  >
                    {topic.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {/* Search Mobile */}
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Recherche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </form>

          {/* Categories mobile */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 mb-2">Catégories</h3>
            <ul className="space-y-2">
              {majorTopics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/category/${topic.slug}`}
                    className="block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
