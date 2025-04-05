import { useEffect } from "react";
import {Adsense} from '@ctrl/react-adsense';

export default function AdsenseCom() {


  return (
    <Adsense
      client="ca-pub-1803218881232491"
      slot="6880003388"
      style={{ display: 'block' }}
      layout="in-article"
      format="fluid"
    />
  );
}
