import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook untuk fade-in + slide-up saat elemen masuk viewport
 * @param {object} options - GSAP/ScrollTrigger options
 */
export const useFadeInUp = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          ease: options.ease || "power3.out",
          delay: options.delay || 0,
          scrollTrigger: {
            trigger: el,
            start: options.start || "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Hook untuk stagger animation pada children
 * @param {object} options
 */
export const useStaggerChildren = (
  selector = ".stagger-child",
  options = {},
) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(selector),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.7,
          ease: "power3.out",
          stagger: options.stagger || 0.12,
          scrollTrigger: {
            trigger: el,
            start: options.start || "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Hook untuk counter animation (angka naik)
 * @param {number} target - angka tujuan
 * @param {string} suffix - tambahan di belakang angka (+ / % / dll)
 */
export const useCountUp = (target, suffix = "") => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString("id-ID") + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [target]);

  return ref;
};

/**
 * Hook untuk slide-in dari kiri/kanan
 */
export const useSlideIn = (direction = "left", options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromX = direction === "left" ? -60 : 60;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
          duration: options.duration || 0.9,
          ease: "power3.out",
          delay: options.delay || 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [direction]);

  return ref;
};
