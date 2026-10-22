"use client";

import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : ["/images/hero/hero-1.jpg"];

  return (
    <div>
      <div className="overflow-hidden bg-cream/40">
        <div className="aspect-[4/5]">
          <img
            src={gallery[active]}
            alt={name}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {gallery.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`تصویر ${index + 1} از ${name}`}
              aria-pressed={index === active}
              className={`overflow-hidden bg-cream/40 transition-all duration-300 ${
                index === active ? "ring-1 ring-wine" : "opacity-70 hover:opacity-100"
              }`}
            >
              <span className="block aspect-[4/5]">
                <img src={image} alt="" className="h-full w-full object-cover" />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
