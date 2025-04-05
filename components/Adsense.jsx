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
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1803218881232491"
     data-ad-slot="6880003388"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
  );
}
