import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // smooth nahi (fast UX)
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;