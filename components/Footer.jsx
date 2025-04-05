import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Section de navigation */}
          <div className="w-full md:w-1/3 mb-4">
            <h3 className="text-lg font-semibold">À propos de LivresLib</h3>
            <p>
              Découvrez une collection de livres gratuits à télécharger en ligne.
              Explorez des ouvrages classiques, des romans et bien plus, tout
              en accédant à des livres gratuits et sans frais.
            </p>
          </div>

          {/* Section des liens */}
          <div className="w-full md:w-1/3 mb-4">
            <h3 className="text-lg font-semibold">Liens utiles</h3>
            <ul className="list-none">
              <li>
                <Link href="/" className="hover:text-gray-400">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Section des mots-clés SEO */}
          <div className="w-full md:w-1/3 mb-4">
            <h3 className="text-lg font-semibold">Télécharger des livres gratuits</h3>
            <ul className="list-none">
              <li>
                <Link href="/category/classics" className="hover:text-gray-400">
                  Livres classiques gratuits
                </Link>
              </li>
              <li>
                <Link href="/category/novels" className="hover:text-gray-400">
                  Romans gratuits en ligne
                </Link>
              </li>
              <li>
                <Link href="/category/history" className="hover:text-gray-400">
                  Livres d'histoire gratuits
                </Link>
              </li>
              <li>
                <Link href="/category/science" className="hover:text-gray-400">
                  Livres scientifiques gratuits
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Section de copyright et mentions */}
        <div className="text-center mt-6 text-sm">
          <p>
            &copy; {new Date().getFullYear()} LivresLib. Tous droits réservés.
          </p>
          <p>
            Site Web de livres gratuits - Téléchargez vos livres classiques et romans gratuitement.
          </p>
        </div>
      </div>
    </footer>
  );
}
