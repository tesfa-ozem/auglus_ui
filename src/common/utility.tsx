import React, { useEffect, useRef, useState } from 'react';

interface ElementOnScreenProps {
  children: React.ReactNode;
  onScreen: boolean;
}

function useElementOnScreen<T extends HTMLElement>(
  elementRef: React.RefObject<T>
): boolean {
  const [isElementOnScreen, setIsElementOnScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsElementOnScreen(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef]);

  return isElementOnScreen;
}

export default useElementOnScreen;
