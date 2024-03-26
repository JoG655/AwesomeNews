import type { RefObject } from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export function useInView(refs: RefObject<HTMLElement>[]) {
  const [elements, setElements] = useState<{
    [key: string]: { isInView: boolean };
  }>({});
  /* const detachedRefs = useRef<RefObject<HTMLElement>[]>([]);

  detachedRefs.current = [...refs]; */

  const detachedRefs = useRef(refs);

  useLayoutEffect(() => {
    detachedRefs.current = refs;
  }, [refs]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const tag = entry.target.getAttribute("data-use-in-view-tag");

        if (!tag) return;

        if (entry.isIntersecting) {
          setElements((prev) => {
            return {
              ...prev,
              [tag]: {
                isInView: true,
              },
            };
          });
        } else {
          setElements((prev) => ({
            ...prev,
            [tag]: {
              isInView: false,
            },
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback);

    detachedRefs.current.forEach(({ current }) => {
      if (current) {
        observer.observe(current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return elements;
}
