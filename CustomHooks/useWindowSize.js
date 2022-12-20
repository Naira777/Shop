import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    function onResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size > 1120;
};
