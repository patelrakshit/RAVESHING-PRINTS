'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const slides = [
  { image: '/assets/slider/slider.jpg', link: '/products?category=gifts', alt: 'Gifts' },
  { image: '/assets/slider/slider7.gif', link: '/products?subcategory=invitation', alt: 'Invitations' },
  { image: '/assets/slider/banner1.jpg', link: '/products', alt: 'All Products' },
  { image: '/assets/slider/slider6.jpeg', link: '/products?subcategory=banner', alt: 'Banners' },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <Link
          key={index}
          href={slide.link}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-contain"
            priority={index === 0}
          />
        </Link>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
