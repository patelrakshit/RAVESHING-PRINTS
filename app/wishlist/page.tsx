'use client';

import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Wishlist
          </h1>
          <span className="text-lg text-gray-500">
            ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding products you love to your wishlist!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-gray-600">
                Save your favorite items here and easily add them to your cart when you're ready!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
