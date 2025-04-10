"use client"; // (optionnel si tu es sur Next.js 13+ app router)

import Router from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Déclare le composant réel de la bannière publicitaire
const AdsBanner = (props) => {
  useEffect(() => {
    const adContainer = document.querySelector(".adsbygoogle");
  
    const tryPushAd = () => {
      if (adContainer && adContainer.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("Adsbygoogle push failed:", e);
        }
      } else {
        // Retry after a short delay if width is still 0
        setTimeout(tryPushAd, 200);
      }
    };
  
    tryPushAd();
  
    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  return (
    <div className="w-full max-w-[728px] mx-auto">
      <ins className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "90px" // optional: set a min height or height for fixed-size ads
        }}
        data-ad-client="ca-pub-1803218881232491"
        data-ad-slot="6880003388"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Fais un composant dynamique côté client seulement
const AdBanner = dynamic(() => Promise.resolve(AdsBanner), {
  ssr: false,
});

export default AdBanner;

{/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1803218881232491"
     crossorigin="anonymous"></script>
<!-- ebook detail -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1803218881232491"
     data-ad-slot="6880003388"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */}