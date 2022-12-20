import React from "react";
import Footer_Desktop from "./Footer_Desktop";
import Footer_Mobile from "./Footer_Mobile";
import { useWindowSize } from "../../CustomHooks/getWindowWidth";




function Footer() {

  const [height, width] = useWindowSize();
 

  return (
    <div>

    {width > 860 ? <Footer_Desktop/> : <Footer_Mobile /> }


      </div>
  );
}

export default Footer;
