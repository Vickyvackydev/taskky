"use client";
import { useState, useEffect } from "react";

type queryProps = string;
export const useMediaQuery = (query: queryProps) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== match) {
      setMatch(media.matches);
    }

    const listener = () => {
      setMatch(media.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [match, query]);

  return match;
};
