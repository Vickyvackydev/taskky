import { useEffect, useState } from "react";

export const useScroll = () => {
  const [scrollToTop, setScrollToTop] = useState(false);

  useEffect(() => {
    // handles scroll when component mounts
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // renders when window scrool is greater than it initial state
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // removes event after components mounts
  }, []);
  return scrollToTop;
};
