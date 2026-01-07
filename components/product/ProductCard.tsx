'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image?.[0] || '/assets/noproducts.webp';
  const { toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product._id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };
  
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300">
      <button
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          inWishlist 
            ? 'bg-red-500 text-white shadow-lg scale-110' 
            : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
        }`}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart 
          className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`}
        />
      </button>

      <Link href={`/products/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>

          {product.set > 1 ? (
            <p className="text-sm text-gray-600">
              {product.set} starting at {formatPrice(product.price)}
            </p>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xl text-primary-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.off_price)}
              </span>
              <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            </div>
          )}

          {product.stock && product.stock < 10 && (
            <p className="text-xs text-orange-600 mt-2">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
