"use client";

import React, { useEffect, useRef } from "react";

export function ParallaxStars() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = starsRef.current;
    if (!stars) return;

    // Create stars
    const starCount = 150;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random opacity
      const opacity = Math.random() * 0.7 + 0.3;
      star.style.setProperty("--opacity", opacity.toString());
      
      // Random twinkle duration
      const duration = `${Math.random() * 3 + 2}s`;
      star.style.setProperty("--duration", duration);
      
      fragment.appendChild(star);
    }

    stars.appendChild(fragment);

    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      stars.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      while (stars.firstChild) {
        stars.removeChild(stars.firstChild);
      }
    };
  }, []);

  return <div ref={starsRef} className="parallax-stars" />;
}