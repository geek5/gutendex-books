import { useEffect } from "react";
import {Adsense} from '@ctrl/react-adsense';

export default function AdsenseCom() {


  return (
    <div className="w-full h-full flex items-center justify-center min-w-[250px] max-w-[1200px] min-h-[90px] max-h-[250px]">
      <Adsense
        client="ca-pub-1803218881232491"
        slot="6880003388"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
}
