"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";

interface LightboxState {
  src: string;
  alt: string;
}

export default function ImageLightbox() {
  const [activeImage, setActiveImage] = useState<LightboxState | null>(null);

  const close = useCallback(() => {
    setActiveImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    if (activeImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, close]);

  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Target images inside post-content, post-cover, or marked with data-lightbox
      if (
        target instanceof HTMLImageElement &&
        (target.closest(".post-content") ||
          target.closest(".post-cover") ||
          target.classList.contains("post-cover") ||
          target.hasAttribute("data-lightbox"))
      ) {
        e.preventDefault();
        setActiveImage({
          src: target.currentSrc || target.src,
          alt: target.alt || "Article Image",
        });
      }
    };

    document.addEventListener("click", handleImageClick);
    return () => {
      document.removeEventListener("click", handleImageClick);
    };
  }, []);

  if (!activeImage) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={close}
        aria-label="Close image preview"
      >
        <X size={24} />
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="lightbox-img"
        />
        {activeImage.alt && (
          <p className="lightbox-caption">{activeImage.alt}</p>
        )}
      </div>
    </div>
  );
}
