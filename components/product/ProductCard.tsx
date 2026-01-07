import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image?.[0] || '/assets/noproducts.webp';
  
  return (
    <Link
      href={`/products/${product._id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
    >
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
  );
}
