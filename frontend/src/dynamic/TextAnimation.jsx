import React, { useEffect } from 'react';

const TextAnimation = () => {
  useEffect(() => {
    const contentElements = document.querySelectorAll(".header-title, .header-title2, .name, .name1, .text-smaller");

    function checkViewport() {
      contentElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        if (isInViewport) {
          element.classList.add("show");
        }
      });
    }

    window.addEventListener("scroll", checkViewport);
    window.addEventListener("resize", checkViewport);
    checkViewport();

    return () => {
      window.removeEventListener("scroll", checkViewport);
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  return null;
}

export default TextAnimation;
