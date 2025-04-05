import { useEffect } from "react";

export default function Adsense() {
  useEffect(() => {
    // Rafraîchir les annonces après chaque changement de page
    const refreshAds = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    // Rafraîchir dès que le composant est monté
    refreshAds();

    return () => {
      // Optionnel: Effacez les annonces lors du démontage du composant
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
      data-ad-format="auto"
    ></ins>
  );
}
