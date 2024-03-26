import type { RefObject } from "react";
import { useState, useEffect, useRef } from "react";

export function useInView(refs: RefObject<HTMLElement>[]) {
  const [elements, setElements] = useState<{
    [key: string]: { isInView: boolean };
  }>({});
  const detachedRef = useRef<RefObject<HTMLElement>[]>([]);

  detachedRef.current = [...refs];

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

    detachedRef.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return elements;
}
